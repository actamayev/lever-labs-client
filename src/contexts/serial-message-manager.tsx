import { createContext, useContext } from "react"
import { action, makeObservable, observable, runInAction } from "mobx"
import { ESPMessage, PipIDPayload, PipUUID, SavedWiFiNetwork,
	ScanCompletePayload,
	ScannedWiFiNetworkItem,
	WiFiConnectionResultPayload, WiFiConnectionStatus } from "@bluedotrobots/common-ts"
import { serialConnectionManager } from "./serial-manager-context"
import { createCustomEvent } from "../utils/custom-event-dispatcher"

class SerialMessageManagerClass extends EventTarget {
	public messages: Message[] = []
	public onWiFiConnectionResult: ((status: WiFiConnectionStatus) => void) | null = null

	// Pip flow state
	public pipId: PipUUID | null = null
	public showWiFiSection: boolean = false
	public showNameSection: boolean = false
	public wiFiTestCompleted: boolean = false
	public hasBeenDisconnected: boolean = false
	public wiFiConnectionStatus: WiFiConnectionStatus | null = null
	public isTestingWiFiConnection: boolean = false
	public isReadyToDisconnect: boolean = false
	public savedNetworks: SavedWiFiNetwork[] = []
	public isLoadingSavedNetworks: boolean = false
	public scannedNetworks: ScannedWiFiNetworkItem[] = []
	public isScanning: boolean = false

	constructor() {
		super()
		makeObservable(this, {
			messages: observable,
			onWiFiConnectionResult: observable,
			pipId: observable,
			showWiFiSection: observable,
			showNameSection: observable,
			wiFiTestCompleted: observable,
			hasBeenDisconnected: observable,
			wiFiConnectionStatus: observable,
			isTestingWiFiConnection: observable,
			isReadyToDisconnect: observable,
			savedNetworks: observable,
			isLoadingSavedNetworks: observable,
			scannedNetworks: observable,
			isScanning: observable
		})
		this.setupEventListeners()
	}

	get knownNetworks(): ScannedWiFiNetworkItem[] {
		const savedSSIDs = this.savedNetworks.map(network => network.ssid)
		return this.scannedNetworks.filter(network => savedSSIDs.includes(network.ssid))
	}

	get otherNetworks(): ScannedWiFiNetworkItem[] {
		const savedSSIDs = this.savedNetworks.map(network => network.ssid)
		return this.scannedNetworks.filter(network => !savedSSIDs.includes(network.ssid))
	}

	get previouslyConnected(): SavedWiFiNetwork[] {
		const scannedSSIDs = this.scannedNetworks.map(network => network.ssid)
		return this.savedNetworks.filter(network => !scannedSSIDs.includes(network.ssid))
	}

	get scannedNetworksByRssiStrength(): ScannedWiFiNetworkItem[] {
		return this.scannedNetworks.slice().sort((a, b) => b.rssi - a.rssi)
	}

	private setupEventListeners(): void {
		// Listen to raw messages from connection manager
		serialConnectionManager.addEventListener("rawMessage", this.handleRawMessage)

		// Listen to connection events
		serialConnectionManager.addEventListener("connected", this.handleConnected)
		serialConnectionManager.addEventListener("disconnected", this.handleDisconnected)

		// Listen to sent messages
		serialConnectionManager.addEventListener("messageSent", this.handleMessageSent)
	}

	private handleRawMessage = (event: Event): void => {
		const customEvent = event as CustomEvent
		const line = customEvent.detail as string
		const cleanLine = line.replace(/^\[(CRIT|HIGH|LOW|NORMAL)\]\s*/, "")

		// Try to parse as JSON to see if it's structured data
		try {
			const jsonMessage = JSON.parse(cleanLine)
			if (jsonMessage.route && jsonMessage.payload) {
				// This is a structured message, handle it
				this.handleStructuredMessage(jsonMessage)
				// Still add to messages for debugging
				runInAction(() => {
					this.messages.push({
						content: line,
						direction: "received",
						timestamp: new Date(),
						isStructured: true
					})
				})
			} else {
				// Regular log message
				runInAction(() => {
					this.messages.push({
						content: line,
						direction: "received",
						timestamp: new Date()
					})
				})
			}
		} catch {
			// Not JSON, treat as regular log message
			runInAction(() => {
				this.messages.push({
					content: line,
					direction: "received",
					timestamp: new Date()
				})
			})
		}
	}

	private handleConnected = (): void => {
		runInAction(() => {
			// Reset flow state on new connection
			this.hasBeenDisconnected = false
		})
		this.dispatchEvent(createCustomEvent("connected"))
	}

	private handleDisconnected = (): void => {
		runInAction(() => {
			this.hasBeenDisconnected = true
			this.pipId = null
			this.showWiFiSection = false
			this.showNameSection = false
			this.wiFiTestCompleted = false
			this.wiFiConnectionStatus = null
			this.isTestingWiFiConnection = false
			this.savedNetworks = []
			this.isLoadingSavedNetworks = false
			this.scannedNetworks = []
			this.isScanning = false
		})
		this.dispatchEvent(createCustomEvent("disconnected"))
	}

	private handleMessageSent = (event: Event): void => {
		const customEvent = event as CustomEvent
		const messageData = customEvent.detail
		runInAction(() => {
			this.messages.push({
				content: messageData.content,
				direction: "sent",
				timestamp: messageData.timestamp,
				isBinary: messageData.isBinary
			})
		})
		this.dispatchEvent(createCustomEvent("messageSent", { ... messageData }))
	}

	private handleStructuredMessage(message: ESPMessage): void {
		switch (message.route) {
		case "/pip-id": {
			runInAction(() => {
				this.pipId = (message.payload as PipIDPayload).pipId
				this.showWiFiSection = true
			})
			break
		}
		case "/wifi-connection-result": {
			const status = (message.payload as WiFiConnectionResultPayload).status

			// Convert to enum
			let enumStatus: WiFiConnectionStatus
			switch (status) {
			case "success":
				enumStatus = WiFiConnectionStatus.WIFI_AND_WEBSOCKET_SUCCESS
				runInAction(() => {
					this.wiFiTestCompleted = true
					this.showNameSection = true
					this.isReadyToDisconnect = true
					this.showWiFiSection = false
				})
				break
			case "wifi_only":
				enumStatus = WiFiConnectionStatus.WIFI_ONLY
				break
			case "failed":
				enumStatus = WiFiConnectionStatus.FAILED
				break
			default:
				enumStatus = WiFiConnectionStatus.FAILED
			}

			this.onWiFiConnectionResult?.(enumStatus)
			break
		}
		case "/saved-networks": {
			// Handle saved networks response
			runInAction(() => {
				this.isLoadingSavedNetworks = false
				this.savedNetworks = message.payload as SavedWiFiNetwork[]
			})

			// Emit event for PipContext to listen to
			this.dispatchEvent(createCustomEvent("savedNetworksReceived", { ...this.savedNetworks}))
			break
		}

		case "/scan-started": {
			runInAction(() => {
				this.isScanning = true
				this.scannedNetworks = [] // Clear previous results
			})
			break
		}

		case "/scan-result-item": {
			// Handle individual scan result item
			const networkItem = message.payload as ScannedWiFiNetworkItem
			runInAction(() => {
				this.scannedNetworks.push(networkItem)
			})
			break
		}

		case "/scan-complete": {
			// Handle scan completion
			const scanComplete = message.payload as ScanCompletePayload
			runInAction(() => {
				this.isScanning = false
			})
			console.log(`Scan complete. Received ${this.scannedNetworks.length} networks (expected ${scanComplete.totalNetworks})`)
			break
		}
		default:
			console.info("Unknown message route:", message.route)
			break
		}
	}

	// Send binary message through connection manager
	public async sendBinaryMessage(buffer: ArrayBuffer): Promise<boolean> {
		return await serialConnectionManager.sendBinaryMessage(buffer)
	}

	public clearMessages = action(() => {
		this.messages = []
	})

	// Reset flow state
	public resetFlowState = action(() => {
		this.pipId = null
		this.showWiFiSection = false
		this.showNameSection = false
		this.wiFiTestCompleted = false
		this.hasBeenDisconnected = false
		this.isReadyToDisconnect = false
		this.savedNetworks = []
		this.isLoadingSavedNetworks = false
		this.scannedNetworks = []
		this.isScanning = false
	})

	public setWiFiConnectionStatus = action((status: WiFiConnectionStatus | null) => {
		this.wiFiConnectionStatus = status
	})

	public setIsTestingWiFiConnection = action((isTesting: boolean) => {
		this.isTestingWiFiConnection = isTesting
	})

	public setIsLoadingSavedNetworks = action((isLoading: boolean) => {
		this.isLoadingSavedNetworks = isLoading
	})

	public setIsScanning = action((isScanning: boolean) => {
		this.isScanning = isScanning
	})

	public clearScannedNetworks = action(() => {
		this.scannedNetworks = []
	})

	public async logout(): Promise<void> {
		await serialConnectionManager.logout()
		runInAction(() => {
			this.messages = []
			this.resetFlowState()
		})
		this.setWiFiConnectionStatus(null)
		this.setIsTestingWiFiConnection(false)
	}
}

export const serialMessageManager = new SerialMessageManagerClass()

const SerialMessageManagerContext = createContext(serialMessageManager)

export default function SerialMessageManagerProvider({ children }: { children: React.ReactNode }) {
	return (
		<SerialMessageManagerContext.Provider value={serialMessageManager}>
			{children}
		</SerialMessageManagerContext.Provider>
	)
}

export const useSerialMessageManagerContext = () => useContext(SerialMessageManagerContext)

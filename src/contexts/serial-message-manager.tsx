import { createContext, useContext } from "react"
import { action, makeObservable, observable, runInAction } from "mobx"
import { ESPMessage, PipIDPayload, PipUUID, WiFiConnectionResultPayload, WiFiConnectionStatus } from "@bluedotrobots/common-ts"
import { serialConnectionManager } from "./serial-manager-context"

class MessageManagerClass extends EventTarget {
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
		})
		this.setupEventListeners()
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

		// Emit event for UI components
		this.dispatchEvent(new CustomEvent("messageReceived", { detail: line }))
	}

	private handleConnected = (): void => {
		runInAction(() => {
			// Reset flow state on new connection
			this.hasBeenDisconnected = false
		})
		this.dispatchEvent(new CustomEvent("connected"))
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
		})
		this.dispatchEvent(new CustomEvent("disconnected"))
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
		this.dispatchEvent(new CustomEvent("messageSent", { detail: messageData }))
	}

	private handleStructuredMessage(message: ESPMessage): void {
		switch (message.route) {
		case "/pip-id": {
			runInAction(() => {
				this.pipId = (message.payload as PipIDPayload).pipId
				this.showWiFiSection = true
				console.log("Received PipID:", this.pipId)
			})
			this.dispatchEvent(new CustomEvent("pipIdReceived", { detail: this.pipId }))
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
			this.dispatchEvent(new CustomEvent("wifiConnectionResult", { detail: enumStatus }))
			break
		}
		default:
			console.log("Unknown message route:", message.route)
			break
		}
	}

	// Send binary message through connection manager
	public async sendBinaryMessage(buffer: ArrayBuffer): Promise<boolean> {
		return await serialConnectionManager.sendBinaryMessage(buffer)
	}

	public clearMessages = action(() => {
		this.messages = []
		this.dispatchEvent(new CustomEvent("messagesCleared"))
	})

	// Reset flow state
	public resetFlowState = action(() => {
		this.pipId = null
		this.showWiFiSection = false
		this.showNameSection = false
		this.wiFiTestCompleted = false
		this.hasBeenDisconnected = false
		this.isReadyToDisconnect = false
		this.dispatchEvent(new CustomEvent("flowStateReset"))
	})

	public setWiFiConnectionStatus = action((status: WiFiConnectionStatus | null) => {
		this.wiFiConnectionStatus = status
	})

	public setIsTestingWiFiConnection = action((isTesting: boolean) => {
		this.isTestingWiFiConnection = isTesting
	})

	public async logout(): Promise<void> {
		await serialConnectionManager.logout()
		runInAction(() => {
			this.messages = []
			this.resetFlowState()
		})
		this.dispatchEvent(new CustomEvent("loggedOut"))
		this.setWiFiConnectionStatus(null)
		this.setIsTestingWiFiConnection(false)
	}
}

export const serialMessageManager = new MessageManagerClass()

const SerialMessageManagerContext = createContext(serialMessageManager)

export default function SerialMessageManagerProvider({ children }: { children: React.ReactNode }) {
	return (
		<SerialMessageManagerContext.Provider value={serialMessageManager}>
			{children}
		</SerialMessageManagerContext.Provider>
	)
}

export const useSerialMessageManagerContext = () => useContext(SerialMessageManagerContext)

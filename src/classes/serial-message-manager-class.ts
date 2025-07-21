"use client"

import { action, makeAutoObservable, runInAction } from "mobx"
import { ESPMessage, PipIDPayload, StandardJsonStatusMessage, PipUUID, SavedWiFiNetwork,
	ScanCompletePayload, ScannedWiFiNetworkItem, WiFiConnectionResultPayload,
	WiFiConnectionStatus, BatteryMonitorDataItem } from "@bluedotrobots/common-ts"
import toastClass from "./toast-class"
import workbenchClass from "./workbench-class"
import serialConnectionManagerClass from "./serial-connection-manager-class"
import pipClass from "./pip-class"

interface MessageSentData {
	content: string
	timestamp: Date
	isBinary: boolean
}

class SerialMessageManagerClass {
	public messages: SerialMessage[] = []
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
		makeAutoObservable(this)
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

	public handleRawMessage (line: string): void {
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

	public handleConnected = action((): void => {
		this.hasBeenDisconnected = false
	})

	public handleDisconnected (): void {
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
	}

	public handleMessageSent (messageData: MessageSentData): void {
		runInAction(() => {
			this.messages.push({
				content: messageData.content,
				direction: "sent",
				timestamp: messageData.timestamp,
				isBinary: messageData.isBinary
			})
		})
	}

	// eslint-disable-next-line complexity, max-lines-per-function
	private handleStructuredMessage(message: ESPMessage): void {
		switch (message.route) {
		case "/pip-id": {
			runInAction(() => {
				this.pipId = (message.payload as PipIDPayload).pipId
				this.showWiFiSection = true
				// Add this line:
				serialConnectionManagerClass.pipTurnedOn = true
				pipClass.addNewPip({
					pipUUID: this.pipId,
					pipName: "Pip",
					userPipUUIDId: 0, // This means that the pip is connected over serial
					pipConnectionStatus: "connected to serial"
				})
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
			console.info(`Scan complete. Received ${this.scannedNetworks.length} networks (expected ${scanComplete.totalNetworks})`)
			break
		}

		case "/motors-disabled-usb": {
			toastClass.neutral({ title: (message.payload as StandardJsonStatusMessage).status })
			break
		}

		case "/program-paused-usb": {
			toastClass.neutral({ title: (message.payload as StandardJsonStatusMessage).status })
			break
		}
		case "/battery-monitor-data-item": {
			const batteryDataItem = message.payload as BatteryMonitorDataItem
			runInAction(() => {
				workbenchClass.setBatteryDataItem(batteryDataItem)
			})
			break
		}
		case "/battery-monitor-data-complete": {
			workbenchClass.setBatteryDataLastUpdated(new Date())
			break
		}
		default:
			console.info("Unknown message route:", message.route)
			break
		}
	}

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

	public addSavedNetwork = action((network: SavedWiFiNetwork) => {
		// Only add if not already present
		if (!this.savedNetworks.find(n => n.ssid === network.ssid)) {
			this.savedNetworks.push(network)
		}
	})

	public logout = action((): void => {
		this.messages = []
		this.resetFlowState()
		this.setWiFiConnectionStatus(null)
		this.setIsTestingWiFiConnection(false)
	})
}

const serialMessageManagerClass = new SerialMessageManagerClass()

export default serialMessageManagerClass

"use client"

import { action, makeAutoObservable, runInAction } from "mobx"
import { ESPMessage, PipUUID, SavedWiFiNetwork, ScannedWiFiNetworkItem, WiFiConnectionStatus } from "@bluedotrobots/common-ts"
import pipClass from "./pip-class"
import toastClass from "./toast-class"
import gamesClass from "./games-class"
import workbenchClass from "./workbench-class"
import sensorDataClass from "./sensor-data-class"
import serialConnectionManagerClass from "./serial-connection-manager-class"

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
		const savedSSIDs = this.savedNetworks.map((network): string => network.ssid)
		return this.scannedNetworks.filter((network): boolean => savedSSIDs.includes(network.ssid))
	}

	get otherNetworks(): ScannedWiFiNetworkItem[] {
		const savedSSIDs = this.savedNetworks.map((network): string => network.ssid)
		return this.scannedNetworks.filter((network): boolean => !savedSSIDs.includes(network.ssid))
	}

	get previouslyConnected(): SavedWiFiNetwork[] {
		const scannedSSIDs = this.scannedNetworks.map((network): string => network.ssid)
		return this.savedNetworks.filter((network): boolean => !scannedSSIDs.includes(network.ssid))
	}

	get scannedNetworksByRssiStrength(): ScannedWiFiNetworkItem[] {
		return this.scannedNetworks.slice().sort((a, b): number => b.rssi - a.rssi)
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
				runInAction((): void => {
					this.messages.push({
						content: line,
						direction: "received",
						timestamp: new Date(),
						isStructured: true
					})
				})
			} else {
				// Regular log message
				runInAction((): void => {
					this.messages.push({
						content: line,
						direction: "received",
						timestamp: new Date()
					})
				})
			}
		} catch {
			// Not JSON, treat as regular log message
			runInAction((): void => {
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
		runInAction((): void => {
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
		runInAction((): void => {
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
				runInAction((): void => {
					this.pipId = message.payload.pipId
					this.showWiFiSection = true
					serialConnectionManagerClass.pipTurnedOn = true
					workbenchClass.setBatteryDataItem({ key: "isCharging", value: true })
					pipClass.setPipPluggedInSerial(true)
				})
				break
			}
			case "/wifi-connection-result": {
				const status = message.payload.status

				// Convert to enum
				let enumStatus: WiFiConnectionStatus
				switch (status) {
					case "success":
						enumStatus = WiFiConnectionStatus.WIFI_AND_WEBSOCKET_SUCCESS
						runInAction((): void => {
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
				runInAction((): void => {
					this.isLoadingSavedNetworks = false
					this.savedNetworks = message.payload
				})
				break
			}

			case "/scan-started": {
				runInAction((): void => {
					this.isScanning = true
					this.scannedNetworks = [] // Clear previous results
				})
				break
			}

			case "/scan-result-item": {
			// Handle individual scan result item
				const networkItem = message.payload
				this.scannedNetworks.push(networkItem)
				break
			}

			case "/scan-complete": {
				// Handle scan completion
				// const scanComplete = message.payload
				this.isScanning = false
				// console.info(`Scan complete. Received ${this.scannedNetworks.length} networks (expected ${scanComplete.totalNetworks})`)
				break
			}

			case "/motors-disabled-usb": {
				toastClass.neutral({ title: message.payload.status })
				break
			}

			case "/program-paused-usb": {
				toastClass.neutral({ title: message.payload.status })
				break
			}
			case "/battery-monitor-data-item": {
				const batteryDataItem = message.payload
				workbenchClass.setBatteryDataItem(batteryDataItem)
				break
			}
			case "/battery-monitor-data-complete": {
				workbenchClass.setBatteryDataLastUpdated()
				break
			}
			case "/sensor-data": {
				const sensorData = message.payload
				sensorDataClass.addSensorData(sensorData)
				break
			}

			case "/sensor-data-mz": {
				const sensorData = message.payload
				sensorDataClass.addMultizoneTofData(sensorData)
				break
			}
			case "/dino-score": {
				const dinoScore = message.payload
				gamesClass.addDinoScore(dinoScore)
				break
			}
			default:
				console.info("Unknown message route:", message.route)
				break
		}
	}

	// Reset flow state
	public resetFlowState = action((): void => {
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

	public setWiFiConnectionStatus = action((status: WiFiConnectionStatus | null): void => {
		this.wiFiConnectionStatus = status
	})

	public setIsTestingWiFiConnection = action((isTesting: boolean): void => {
		this.isTestingWiFiConnection = isTesting
	})

	public setIsLoadingSavedNetworks = action((isLoading: boolean): void => {
		this.isLoadingSavedNetworks = isLoading
	})

	public setIsScanning = action((isScanning: boolean): void => {
		this.isScanning = isScanning
	})

	public clearScannedNetworks = action((): void => {
		this.scannedNetworks = []
	})

	public addSavedNetwork = action((network: SavedWiFiNetwork): void => {
		// Only add if not already present
		if (!this.savedNetworks.find((n): boolean => n.ssid === network.ssid)) {
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

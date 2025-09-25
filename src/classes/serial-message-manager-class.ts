"use client"

import { action, makeAutoObservable, runInAction } from "mobx"
import { ESPToSerialMessage, SavedWiFiNetwork, ScannedWiFiNetworkItem } from "@bluedotrobots/common-ts/types/pip"
import { WiFiConnectionStatus } from "@bluedotrobots/common-ts/protocol"
import { PipUUID } from "@bluedotrobots/common-ts/types/utils"
import pipClass from "./pip-class"
import toastClass from "./toast-class"
import gamesClass from "./games-class"
import workbenchClass from "./workbench-class"
import sensorDataClass from "./sensor-data-class"
import sendDinoScore from "../utils/student/send-dino-score"
import serialConnectionManagerClass from "./serial-connection-manager-class"
import setSerialConnectionStatus from "../utils/pip/set-serial-connection-status"
import pipTurningOffSerialDisconnection from "../utils/pip/pip-turning-off-serial-disconnection"

interface MessageSentData {
	content: string
	timestamp: Date
	isBinary: boolean
}

class SerialMessageManagerClass {
	public messages: SerialMessage[] = []
	public onWiFiConnectionResult: ((status: WiFiConnectionStatus) => void) | null = null
	public onWiFiDeletionResult: ((success: boolean) => void) | null = null

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

	public handleDisconnected(): void {
		if (this.pipId) {
			void setSerialConnectionStatus(this.pipId, false)
		}

		// Continue with the rest of the cleanup (state reset, UI updates, etc.)
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
	private handleStructuredMessage(message: ESPToSerialMessage): void {
		switch (message.route) {
			case "/pip-id": {
				runInAction((): void => {
					this.pipId = message.payload.pipId
					this.showWiFiSection = true
					serialConnectionManagerClass.pipTurnedOn = true
					workbenchClass.setBatteryDataItem({ key: "isCharging", value: true })
					pipClass.setPipPluggedInSerial(this.pipId)
				})

				// Notify backend that pip is connected to serial
				if (this.pipId) {
					void setSerialConnectionStatus(this.pipId, true)
				}
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
				this.scannedNetworks.push(message.payload)
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
				workbenchClass.setBatteryDataItem(message.payload)
				break
			}
			case "/battery-monitor-data-complete": {
				workbenchClass.setBatteryDataLastUpdated()
				break
			}
			case "/sensor-data": {
				sensorDataClass.addSensorData(message.payload)
				break
			}

			case "/sensor-data-mz": {
				sensorDataClass.addMultizoneTofData(message.payload)
				break
			}
			case "/dino-score": {
				gamesClass.addDinoScore(message.payload.score)
				void sendDinoScore(message.payload.score)
				break
			}
			case "/wifi-deleted-network": {
				this.onWiFiDeletionResult?.(message.payload.status)
				break
			}
			case "/pip-turning-off": {
				void pipTurningOffSerialDisconnection()
				this.resetFlowState(false)
				break
			}
			default:
				console.info("Unknown message route:", message.route)
				break
		}
	}

	// Reset flow state
	private resetFlowState = action((shouldCallApi: boolean): void => {
		// Notify backend that pip is disconnected from serial before clearing pipId
		if (this.pipId && shouldCallApi) {
			void setSerialConnectionStatus(this.pipId, false)
		}

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

	public removeSavedNetwork = action((ssid: string): void => {
		this.savedNetworks = this.savedNetworks.filter((network): boolean => network.ssid !== ssid)
	})

	public logout = action((): void => {
		this.messages = []
		this.resetFlowState(true)
		this.setWiFiConnectionStatus(null)
		this.setIsTestingWiFiConnection(false)
	})
}

const serialMessageManagerClass = new SerialMessageManagerClass()

export default serialMessageManagerClass

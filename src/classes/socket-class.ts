"use client"

import isNull from "lodash-es/isNull"
import { io, Socket } from "socket.io-client"
import { action, makeAutoObservable } from "mobx"
import {
	HeadlightData,
	HornData,
	LedControlData,
	MotorControlData,
	PlayFunSoundPayload,
	BatteryMonitorDataFull,
} from "@bluedotrobots/common-ts"
import sandboxClass from "./sandbox-class"
import careerQuestClass from "./career-quest-class"
import garageClass from "./garage-class"
import workbenchClass from "./workbench-class"
import handlePipStatusUpdate from "../utils/socket/handle-pip-status-update"

class SocketClass {
	private _socket: Socket | null = null
	public isConnected: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	public connect = action((accessToken: string): void => {
		if (!isNull(this._socket)) return

		this._socket = io(process.env.NEXT_PUBLIC_BASE_URL as string, {
			path: "/socketio",
			auth: { token: accessToken },
			transports: ["websocket"]
		})

		this.setupConnectionEvents()
		this.setupPipEvents()
		this.setupChatbotEvents()
	})

	private setupConnectionEvents = action((): void => {
		if (!this._socket) return

		this._socket.on("connect", () => {
			this.isConnected = true
		})

		this._socket.on("disconnect", (_reason: Socket.DisconnectReason) => {
			this.isConnected = false
		})

		// Handle reconnection attempts
		this._socket.on("reconnect_attempt", (_attempt) => {
		})
	})

	private setupPipEvents = action((): void => {
		// This is for receiving socket events from the backend.
		if (!this._socket) return
		this._socket.on("pip-connection-status-update", handlePipStatusUpdate)
		this._socket.on("sensor-data", garageClass.setSensorData)
		this._socket.on("battery-monitor-data", (data: BatteryMonitorDataFull) => workbenchClass.setBatteryData(data))
	})

	private setupChatbotEvents = action((): void => {
		if (!this._socket) return

		// Career Quest chatbot events
		this._socket.on("cq-chatbot-stream-start", careerQuestClass.startChallengeStreaming)
		this._socket.on("cq-chatbot-stream-chunk", careerQuestClass.addChallengeStreamingChunk)
		this._socket.on("cq-chatbot-stream-complete", careerQuestClass.completeChallengeStreaming)

		// Sandbox chatbot events
		this._socket.on("sandbox-chatbot-stream-start", sandboxClass.startStreaming)
		this._socket.on("sandbox-chatbot-stream-chunk", sandboxClass.addStreamingChunk)
		this._socket.on("sandbox-chatbot-stream-complete", sandboxClass.completeStreaming)
	})

	// 7/12/25 TODO: Setup student and teacher specific events
	public emitMotorControl = action((motorControlData: MotorControlData): void => {
		// This is for sending socket messages to the backend
		if (!this._socket || !this.isConnected) {
			return console.error("Socket not connected")
		}
		this._socket.emit("motor-control", motorControlData)
	})

	public emitLedColorControl = action((ledControlDataToSend: LedControlData): void => {
		// This is for sending socket messages to the backend
		if (!this._socket || !this.isConnected) {
			return console.error("Socket not connected")
		}
		this._socket.emit("new-led-colors", ledControlDataToSend)
	})

	public emitHornSound = action((hornControlDataToSend: HornData): void => {
		// This is for sending socket messages to the backend
		if (!this._socket || !this.isConnected) {
			return console.error("Socket not connected")
		}
		this._socket.emit("horn-sound-update", hornControlDataToSend)
	})

	public emitHeadLightStatus = action((headlightDataToSend: HeadlightData): void => {
		// This is for sending socket messages to the backend
		if (!this._socket || !this.isConnected) {
			return console.error("Socket not connected")
		}
		this._socket.emit("headlight-update", headlightDataToSend)
	})

	public emitFunSound = action((funSoundDataToSend: PlayFunSoundPayload): void => {
		// This is for sending socket messages to the backend
		if (!this._socket || !this.isConnected) {
			return console.error("Socket not connected")
		}
		this._socket.emit("play-fun-sound", funSoundDataToSend)
	})

	public logout = action((): void => {
		if (this._socket) {
			this._socket.disconnect()
			this._socket = null
		}
		this.isConnected = false
	})
}

const socketClass = new SocketClass()

export default socketClass

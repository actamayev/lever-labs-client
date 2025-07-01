"use client"

import isNull from "lodash-es/isNull"
import { io, Socket } from "socket.io-client"
import { action, makeAutoObservable } from "mobx"
import { HeadlightData, HornData, LedControlData, MotorControlData, SoundData } from "@bluedotrobots/common-ts"
import chatsClass from "./chat-class"
import handlePipStatusUpdate from "../utils/socket/handle-pip-status-update"
import handleIncomingSensorData from "../utils/socket/handle-incoming-sensor-data"

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
		this._socket.on("sensor-data", handleIncomingSensorData)
	})

	private setupChatbotEvents = action((): void => {
		if (!this._socket) return

		this._socket.on("cq-chatbot-stream-start", chatsClass.startStreaming)
		this._socket.on("cq-chatbot-stream-chunk", chatsClass.addStreamingChunk)
		this._socket.on("cq-chatbot-stream-complete", chatsClass.completeStreaming)
	})

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

	public emitSound = action((soundDataToSend: SoundData): void => {
		// This is for sending socket messages to the backend
		if (!this._socket || !this.isConnected) {
			return console.error("Socket not connected")
		}
		this._socket.emit("play-sound", soundDataToSend)
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

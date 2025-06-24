"use client"

import isNull from "lodash-es/isNull"
import { io, Socket } from "socket.io-client"
import { action, makeAutoObservable } from "mobx"
import { HeadlightData, HornData, LedControlData, MotorControlData,
	SoundData, ChatbotStreamEvent } from "@bluedotrobots/common-ts"
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

		this._socket.on("chatbot-stream", (event: ChatbotStreamEvent) => {
			// Now we get challengeId directly from the event
			if (!event.challengeId) {
				console.warn("Received chatbot event without challengeId")
				return
			}

			switch (event.type) {
			case "chatbotStart":
				this.handleChatbotStart(event)
				break
			case "chatbotChunk":
				this.handleChatbotChunk(event)
				break
			case "chatbotComplete":
				this.handleChatbotComplete(event)
				break
			}
		})
	})

	private handleChatbotStart = action((event: ChatbotStreamEvent): void => {
		chatsClass.startStreaming(event.challengeId, event.interactionType)
		console.info("Chatbot started for challenge:", event.challengeId, "interaction:", event.interactionType)
	})

	private handleChatbotChunk = action((event: ChatbotStreamEvent): void => {
		console.log("Chunk received for challenge:", event.challengeId, "content:", event.content)

		if (event.content) {
			chatsClass.addStreamingChunk(event.challengeId, event.content)
		}
	})

	private handleChatbotComplete = action((event: ChatbotStreamEvent): void => {
		chatsClass.completeStreaming(event.challengeId, event.fullResponse)
		console.log("Chatbot completed for challenge:", event.challengeId)
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

	// Disconnect socket (e.g., on logout)
	public disconnect = action((): void => {
		if (this._socket) {
			this._socket.disconnect()
			this._socket = null
		}
		this.isConnected = false
	})

	public logout = action((): void => {
		this.disconnect()
	})
}

const socketClass = new SocketClass()

export default socketClass

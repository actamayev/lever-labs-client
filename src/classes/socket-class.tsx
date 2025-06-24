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

	// Track current challenge context for chat
	public currentChallengeId: string | null = null

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
			// Use current challenge context
			if (!this.currentChallengeId) {
				console.warn("Received chatbot event but no current challenge ID set")
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
		if (!this.currentChallengeId) return

		chatsClass.startStreaming(this.currentChallengeId, event.interactionType)
		console.info("Chatbot started for challenge:", this.currentChallengeId, "interaction:", event.interactionType)
	})

	private handleChatbotChunk = action((event: ChatbotStreamEvent): void => {
		if (!this.currentChallengeId) return

		console.log("Chunk received for challenge:", this.currentChallengeId, "content:", event.content)

		if (event.content) {
			chatsClass.addStreamingChunk(this.currentChallengeId, event.content)
		}
	})

	private handleChatbotComplete = action((event: ChatbotStreamEvent): void => {
		if (!this.currentChallengeId) return

		chatsClass.completeStreaming(this.currentChallengeId, event.fullResponse)
		console.log("Chatbot completed for challenge:", this.currentChallengeId)
	})

	// Set current challenge context for chat
	public setChallengeContext = action((challengeId: string): void => {
		this.currentChallengeId = challengeId
	})

	// Clear challenge context
	public clearChallengeContext = action((): void => {
		this.currentChallengeId = null
	})

	// Method to reset chatbot state for current challenge
	public resetChatbotState = action((): void => {
		if (this.currentChallengeId) {
			chatsClass.resetChatState(this.currentChallengeId)
		}
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
		this.currentChallengeId = null
	})

	public logout = action((): void => {
		this.disconnect()
	})
}

const socketClass = new SocketClass()

export default socketClass

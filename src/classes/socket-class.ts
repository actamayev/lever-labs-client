"use client"

import { io, Socket } from "socket.io-client"
import { action, makeAutoObservable } from "mobx"
import {
	HeadlightData,
	HornData,
	LedControlData,
	MotorControlData,
	PlayFunSoundPayload,
	SocketEventPayloadMap,
	SocketEvents,
	ClientSocketEvents,
	ClientSocketEventPayloadMap,
} from "@bluedotrobots/common-ts"
import sandboxClass from "./sandbox-class"
import careerQuestClass from "./career-quest-class"
import workbenchClass from "./workbench-class"
import handlePipStatusUpdate from "../utils/socket/handle-pip-status-update"
import sensorDataClass from "./sensor-data-class"

class SocketClass {
	private _socket: Socket | null = null
	public isConnected: boolean = false

	constructor() {
		makeAutoObservable(this)
	}

	// Updated to use cookies automatically - no need to pass token
	public connect = action((): void => {
		if (this._socket !== null) return

		this._socket = io(process.env.NEXT_PUBLIC_BASE_URL as string, {
			path: "/socketio",
			withCredentials: true,
			transports: ["websocket"]
		})

		this.setupConnectionEvents()
		this.setupPipEvents()
		this.setupChatbotEvents()
		this.setupSensorDataEvents()
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

	private setupTypedListener<E extends SocketEvents>(
		event: E,
		handler: (payload: SocketEventPayloadMap[E]) => void
	): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this._socket?.on(event, handler as any)
	}

	private setupPipEvents = action((): void => {
		// This is for receiving socket events from the backend.
		if (!this._socket) return
		this.setupTypedListener("pip-connection-status-update", handlePipStatusUpdate)
		this.setupTypedListener("battery-monitor-data", workbenchClass.setBatteryData)
	})

	private setupSensorDataEvents = action((): void => {
		if (!this._socket) return
		this.setupTypedListener("general-sensor-data", (payload) => {
			// Handle the full sensor payload by processing each field
			Object.entries(payload).forEach(([key, value]) => {
				if (key !== "irSensorData" && typeof value === "number") {
					sensorDataClass.addGeneralSensorData(key as keyof Omit<typeof payload, "irSensorData">, value)
				}
			})
			// Handle IR sensor data separately if it exists
			if (payload.irSensorData) {
				sensorDataClass.addIrSensorData(payload.irSensorData)
			}
		})
	})

	private setupChatbotEvents = action((): void => {
		if (!this._socket) return

		// Career Quest chatbot events
		this.setupTypedListener("challenge-chatbot-stream-start", careerQuestClass.startChallengeStreaming)
		this.setupTypedListener("challenge-chatbot-stream-chunk", careerQuestClass.addChallengeStreamingChunk)
		this.setupTypedListener("challenge-chatbot-stream-complete", careerQuestClass.completeChallengeStreaming)

		// Career chatbot events
		this.setupTypedListener("career-chatbot-stream-start", careerQuestClass.startCareerStreaming)
		this.setupTypedListener("career-chatbot-stream-chunk", careerQuestClass.addCareerStreamingChunk)
		this.setupTypedListener("career-chatbot-stream-complete", careerQuestClass.completeCareerStreaming)

		// Sandbox chatbot events
		this.setupTypedListener("sandbox-chatbot-stream-start", sandboxClass.startStreaming)
		this.setupTypedListener("sandbox-chatbot-stream-chunk", sandboxClass.addStreamingChunk)
		this.setupTypedListener("sandbox-chatbot-stream-complete", sandboxClass.completeStreaming)
	})

	private emitToServer<E extends ClientSocketEvents>(
		event: E,
		payload: ClientSocketEventPayloadMap[E]
	): void {
		// This is for sending socket messages to the backend
		if (!this._socket || !this.isConnected) {
			return console.error("Socket not connected")
		}
		this._socket.emit(event, payload)
	}

	// TODO 7/12/25: Setup student and teacher specific events
	public emitMotorControl = action((motorControlData: MotorControlData): void => {
		this.emitToServer("motor-control", motorControlData)
	})

	public emitLedColorControl = action((ledControlDataToSend: LedControlData): void => {
		this.emitToServer("new-led-colors", ledControlDataToSend)
	})

	public emitHornSound = action((hornControlDataToSend: HornData): void => {
		this.emitToServer("horn-sound-update", hornControlDataToSend)
	})

	public emitHeadLightStatus = action((headlightDataToSend: HeadlightData): void => {
		this.emitToServer("headlight-update", headlightDataToSend)
	})

	public emitFunSound = action((funSoundDataToSend: PlayFunSoundPayload): void => {
		this.emitToServer("play-fun-sound", funSoundDataToSend)
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

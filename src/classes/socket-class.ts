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
import { listenersMap } from "../utils/constants/listeners-map"

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
		this.setupAllListeners()
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

	private setupAllListeners = action((): void => {
		if (!this._socket) return
		Object.entries(listenersMap).forEach(([event, handler]) => {
			try {
				this.setupTypedListener(event as SocketEvents, handler)
			} catch (error) {
				console.error(`Error in ${event} listener:`, error)
			}
		})
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

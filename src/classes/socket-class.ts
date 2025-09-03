"use client"

import { io, Socket } from "socket.io-client"
import { action, makeAutoObservable } from "mobx"
import {
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
		if (this._socket !== null && this._socket.connected) return

		// Clean up any existing disconnected socket
		if (this._socket !== null) {
			this._socket.disconnect()
			this._socket = null
		}

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

		this._socket.on("connect", (): void => {
			this.isConnected = true
		})

		this._socket.on("disconnect", (_reason: Socket.DisconnectReason): void => {
			this.isConnected = false
		})

		// Handle reconnection attempts
		this._socket.on("reconnect_attempt", (_attempt): void => {
		})
	})

	private setupTypedListener<E extends SocketEvents>(
		event: E,
		handler: (payload: SocketEventPayloadMap[E]) => void
	): void {
		if (!this._socket) return
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this._socket.on(event, handler as any)
	}

	private setupAllListeners = action((): void => {
		if (!this._socket) return
		Object.entries(listenersMap).forEach(([event, handler]): void => {
			try {
				this.setupTypedListener(event as SocketEvents, handler as (payload: SocketEventPayloadMap[SocketEvents]) => void)
			} catch (error) {
				console.error(`Error in ${event} listener:`, error)
			}
		})
	})

	public emitToServer<E extends ClientSocketEvents>(
		event: E,
		payload: ClientSocketEventPayloadMap[E]
	): void {
		if (!this._socket || !this.isConnected) {
			return console.error("Socket not connected, unable to emit event", event)
		}
		this._socket.emit(event, payload)
	}

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

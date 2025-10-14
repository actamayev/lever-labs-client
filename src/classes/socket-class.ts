"use client"

import { io, Socket } from "socket.io-client"
import { action, makeAutoObservable } from "mobx"
import {
	SocketEventPayloadMap,
	SocketEvents,
	ClientSocketEvents,
	ClientSocketEventPayloadMap,
} from "@lever-labs/common-ts/types/socket"
import { listenersMap } from "../utils/constants/listeners-map"
import pipClass from "./pip-class"
import garageClass from "./garage-class"
import { isNull } from "lodash-es"

class SocketClass {
	private _socket: Socket | null = null
	public isConnected: boolean = false
	private heartbeatIntervalId: number | null = null
	private _hasPagehideListener: boolean = false

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
		this.startHeartbeat()
		this.setupAllListeners()
		this.pageHideHandler()
	})

	private pageHideHandler = action((): void => {
		if (this._hasPagehideListener || typeof window === "undefined") return
		this._hasPagehideListener = true
		window.addEventListener("pagehide", (): void => {
			try {
				if (this._socket?.connected) {
					this._socket.emit("tab-closing")
				}
			} catch { /* ignore */ }
		})
	})

	private setupConnectionEvents = action((): void => {
		if (!this._socket) return

		this._socket.on("connect", (): void => {
			this.isConnected = true
			this.startHeartbeat()
		})

		this._socket.on("disconnect", (_reason: Socket.DisconnectReason): void => {
			this.stopHeartbeat()
			pipClass.deletePip()
			this.isConnected = false
			// Release all pressed buttons when socket disconnects
			garageClass.releaseAllPressedButtons()
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

	private startHeartbeat(): void {
		if (!this._socket || typeof window === "undefined") return
		// heartbeat every 20s
		this.stopHeartbeat()
		this.heartbeatIntervalId = window.setInterval((): void => {
			try { this._socket?.emit("heartbeat") } catch {}
		}, 20_000)
	}

	private stopHeartbeat(): void {
		if (isNull(this.heartbeatIntervalId)) return
		clearInterval(this.heartbeatIntervalId)
		this.heartbeatIntervalId = null
	}

	public logout = action((): void => {
		if (this._socket) {
			this._socket.disconnect()
			this._socket = null
		}
		this.isConnected = false
		// Also release buttons on logout
		garageClass.releaseAllPressedButtons()
	})
}

const socketClass = new SocketClass()

export default socketClass

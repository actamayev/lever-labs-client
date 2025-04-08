"use client"

import EventEmitter from "events"
import isNull from "lodash-es/isNull"
import { io, Socket } from "socket.io-client"
import { createContext, useContext } from "react"
import { action, makeObservable, observable } from "mobx"

class SocketClass extends EventEmitter {
	private _socket: Socket | null = null
	public isConnected: boolean = false
	public accessToken: string | null = null

	constructor() {
		super()
		makeObservable(this, {
			isConnected: observable,
			accessToken: observable
		})
	}

	public setAccessToken = action((accessToken: string | null) => {
		this.accessToken = accessToken
		if (isNull(accessToken)) return
		this.connect()
	})

	private connect = action((): void => {
		if (
			isNull(this.accessToken) ||
			!isNull(this._socket)
		) return

		this._socket = io(process.env.NEXT_PUBLIC_BASE_URL as string, {
			path: "/socketio",
			auth: { token: this.accessToken },
			transports: ["websocket"]
		})

		this.setupConnectionEvents()
		this.setupPipEvents()
	})

	private setupConnectionEvents = action((): void => {
		if (!this._socket) return

		this._socket.on("connect", () => {
			this.isConnected = true
		})

		this._socket.on("disconnect", (reason: Socket.DisconnectReason) => {
			this.isConnected = false
			console.info("Disconnected from backend:", reason)
		})

		// Handle reconnection attempts
		this._socket.on("reconnect_attempt", (attempt) => {
			console.info(`Attempting to reconnect... (${attempt})`)
		})
	})

	private setupPipEvents = action((): void => {
		// This is for receiving socket events from the backend.
		if (!this._socket) return
		this._socket.on("pip-connection-status-update", (data: PipStatusUpdate) => {
			this.emit("pipStatusUpdate", data) // Emit event with processed data
		})
		this._socket.on("motor-control-ack", (response: { success: boolean, error?: string }) => {
			this.emit("motorControlAck", response)
		})
		this._socket.on("sensor-data", (data: IncomingSensorData) => {
			this.emit("incomingSensorData", data) // Emit event with processed data
		})
	})

	public emitMotorControl = action((motorControlData: MotorControlDataToSend): void => {
		// This is for sending socket messages to the backend
		if (!this._socket || !this.isConnected) {
			return console.error("Socket not connected")
		}
		this._socket.emit("motor-control", motorControlData)
	})

	public emitLedColorControl = action((ledControlDataToSend: LedControlDataToSend): void => {
		// This is for sending socket messages to the backend
		if (!this._socket || !this.isConnected) {
			return console.error("Socket not connected")
		}
		this._socket.emit("new-led-colors", ledControlDataToSend)
	})

	public emitNewMaxMotorSpeed = action((newMaxMotorSpeedData: MaxMotorSpeedDataToSend): void => {
		// This is for sending socket messages to the backend
		if (!this._socket || !this.isConnected) {
			return console.error("Socket not connected")
		}
		this._socket.emit("new-max-motor-speed", newMaxMotorSpeedData)
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
		this.accessToken = null
	})
}

const socketInstance = new SocketClass()

const SocketContext = createContext(socketInstance)

export default function SocketProvider ({ children }: { children: React.ReactNode }) {
	return (
		<SocketContext.Provider value={socketInstance}>
			{children}
		</SocketContext.Provider>
	)
}

export const useSocketContext = () => useContext(SocketContext)

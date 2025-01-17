import EventEmitter from "events"
import isNull from "lodash/isNull"
import { io, Socket } from "socket.io-client"
import { action, makeObservable, observable } from "mobx"
import { createContext, useContext, useMemo } from "react"

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

		this._socket = io(process.env.REACT_APP_BASE_URL as string, {
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
			console.info("Connected to the backend")
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
		this._socket?.on("pip-connection-status-update", (data: PipStatusUpdate) => {
			console.info("Received pip-connection-status-update:", data)
			this.emit("pipStatusUpdate", data) // Emit event with processed data
		})
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

const SocketContext = createContext(new SocketClass())

export default function SocketProvider ({ children }: { children: React.ReactNode }) {
	const socketClass = useMemo(() => new SocketClass(), [])

	return (
		<SocketContext.Provider value={socketClass}>
			{children}
		</SocketContext.Provider>
	)
}

export const useSocketContext = () => useContext(SocketContext)

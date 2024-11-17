import { useCallback } from "react"

export default function useGetStatusColor(): (status: PipConnectionStatus) => string {
	return useCallback((status: PipConnectionStatus) => {
		switch (status) {
		case "inactive":
			return "bg-red-500"
		case "online":
			return "bg-blue-500"
		case "connected to other user":
			return "bg-purple-500"
		case "connected":
			return "bg-green-500"
		default:
			return "bg-slate-500"
		}
	}, [])
}

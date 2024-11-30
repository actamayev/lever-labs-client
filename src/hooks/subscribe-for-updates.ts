import { useCallback } from "react"

export default function useSubscribeForUpdates(): (email: string) => Promise<void> {
	return useCallback(async (email: string): Promise<void> => {
		console.log(email)
		await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
	}, [])
}

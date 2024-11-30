import { useCallback } from "react"

export default function useSubscribeForUpdates(
	isLoading: boolean,
	setIsLoading: (value: React.SetStateAction<boolean>) => void,
	setIsSubscribed: (value: React.SetStateAction<boolean>) => void
): (
	values: EmailUpdatesFormValues
) => Promise<void> {
	return useCallback(async (
		values: EmailUpdatesFormValues
	): Promise<void> => {
		try {
			if (!values.email || isLoading) return
			console.log(values.email)
			await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
			setIsSubscribed(true)
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [isLoading, setIsLoading, setIsSubscribed])
}

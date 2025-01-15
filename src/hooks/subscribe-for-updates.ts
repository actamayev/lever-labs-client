import _ from "lodash"
import { AxiosError } from "axios"
import { useCallback } from "react"
import useToastOptions from "../components/toast-options"
import { useApiClientContext } from "../contexts/blue-dot-api-client-context"
import { isMessageResponse, isNonSuccessResponse } from "../utils/type-checks"

export default function useSubscribeForUpdates(
	isLoading: boolean,
	setIsLoading: (value: React.SetStateAction<boolean>) => void,
	setIsSubscribed: (value: React.SetStateAction<boolean>) => void
): (
	values: EmailUpdatesFormValues
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const toast = useToastOptions()

	return useCallback(async (values: EmailUpdatesFormValues): Promise<void> => {
		try {
			if (!values.email || isLoading) return
			setIsLoading(true)
			const subscribeForUpdatesResponse = await blueDotApiClient.miscDataService.subscribeForUpdates(values.email)
			if (!_.isEqual(subscribeForUpdatesResponse.status, 200) || isNonSuccessResponse(subscribeForUpdatesResponse.data)) {
				throw new Error("Email subscription failed")
			}
			setIsSubscribed(true)
			toast.superPositive({
				title: "You're subscribed!",
				description: "We'll notify you as soon as we have updates. Stay tuned!"
			})
		} catch (error) {
			console.error(error)
			if (error instanceof AxiosError && isMessageResponse(error.response?.data)) {
				toast.positive({
					title: "You're already subscribed",
					description: "We'll notify you as soon as we have updates. Stay tuned!"
				})
				setIsSubscribed(true)
			} else {
				toast.negative({
					title: "Unable to subscribe for updates.",
					description: "Please reload and try again."
				})
			}
		} finally {
			setIsLoading(false)
		}
	}, [blueDotApiClient.miscDataService, isLoading, setIsLoading, setIsSubscribed, toast])
}

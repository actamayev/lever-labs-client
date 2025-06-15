"use client"

import { AxiosError } from "axios"
import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import useToastOptions from "../components/toast-options"
import { useApiClientContext } from "../classes/blue-dot-api-client-context"
import { isMessageResponse, isNonSuccessResponse } from "../utils/type-checks"
import { EmailUpdatesRequest } from "@bluedotrobots/common-ts"

export default function useSubscribeForUpdates(
	isLoading: boolean,
	setIsLoading: (value: React.SetStateAction<boolean>) => void,
): (
	values: EmailUpdatesRequest
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const toast = useToastOptions()

	return useCallback(async (values: EmailUpdatesRequest): Promise<void> => {
		try {
			if (!values.email || isLoading) return
			setIsLoading(true)
			const subscribeForUpdatesResponse = await blueDotApiClient.miscDataService.subscribeForUpdates(values.email)
			if (!isEqual(subscribeForUpdatesResponse.status, 200) || isNonSuccessResponse(subscribeForUpdatesResponse.data)) {
				throw new Error("Email subscription failed")
			}
			return toast.superPositive({
				title: "You're subscribed!",
				description: "We'll notify you as soon as we have updates. Stay tuned!"
			})
		} catch (error) {
			console.error(error)
			if (error instanceof AxiosError && isMessageResponse(error.response?.data)) {
				return toast.positive({
					title: "You're already subscribed",
					description: "We'll notify you as soon as we have updates. Stay tuned!"
				})
			}
			return toast.negative({
				title: "Unable to subscribe for updates",
				description: "Please reload the page and try again"
			})
		} finally {
			setIsLoading(false)
		}
	}, [blueDotApiClient.miscDataService, isLoading, setIsLoading, toast])
}

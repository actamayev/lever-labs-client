"use client"

import { AxiosError } from "axios"
import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import { EmailUpdatesRequest } from "@bluedotrobots/common-ts"
import toastClass from "../classes/toast-class"
import blueDotApiClientClass from "../classes/blue-dot-api-client-class"
import { isMessageResponse, isNonSuccessResponse } from "../utils/type-checks"

export default function useSubscribeForUpdates(
	isLoading: boolean,
	setIsLoading: (value: React.SetStateAction<boolean>) => void,
): (
	values: EmailUpdatesRequest
) => Promise<void> {
	return useCallback(async (values: EmailUpdatesRequest): Promise<void> => {
		try {
			if (!values.email || isLoading) return
			setIsLoading(true)
			const subscribeForUpdatesResponse = await blueDotApiClientClass.miscDataService.subscribeForUpdates(values.email)
			if (!isEqual(subscribeForUpdatesResponse.status, 200) || isNonSuccessResponse(subscribeForUpdatesResponse.data)) {
				throw new Error("Email subscription failed")
			}
			return toastClass.superPositive({
				title: "You're subscribed!",
				description: "We'll notify you as soon as we have updates. Stay tuned!"
			})
		} catch (error) {
			console.error(error)
			if (error instanceof AxiosError && isMessageResponse(error.response?.data)) {
				return toastClass.positive({
					title: "You're already subscribed",
					description: "We'll notify you as soon as we have updates. Stay tuned!"
				})
			}
			return toastClass.negative({
				title: "Unable to subscribe for updates",
				description: "Please reload the page and try again"
			})
		} finally {
			setIsLoading(false)
		}
	}, [isLoading, setIsLoading])
}

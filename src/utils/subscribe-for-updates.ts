"use client"

import { AxiosError } from "axios"
import isEqual from "lodash-es/isEqual"
import { EmailUpdatesRequest } from "@lever-labs/common-ts/types/api"
import toastClass from "../classes/toast-class"
import blueDotApiClient from "../classes/blue-dot-api-client-class"
import { isMessageResponse, isNonSuccessResponse } from "./type-checks"

export default async function subscribeForUpdates(
	values: EmailUpdatesRequest,
	setIsLoading: (value: React.SetStateAction<boolean>) => void
): Promise <void> {
	try {
		if (!values.email) return
		setIsLoading(true)
		const subscribeForUpdatesResponse = await blueDotApiClient.miscDataService.subscribeForUpdates(values.email)
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
}

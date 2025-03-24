"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { useCallback } from "react"
import { usePipContext } from "../../contexts/pip-context"
import useToastOptions from "../../components/toast-options"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useSendCppToPip(): (cppCode: string) => Promise<void> {
	const pipClass = usePipContext()
	const blueDotApiClient = useApiClientContext()
	const toast = useToastOptions()

	return useCallback(async (cppCode: string) => {
		try {
			if (isNull(pipClass.selectedPip)) {
				return toast.neutral({
					title: "You have not connected to a Pip",
					description: "Please connect to a Pip to upload code"
				})
			}
			if (pipClass.isSendingCppToPip === true) {
				return toast.neutral({
					title: "Currently sending code to Pip",
					description: `We're beaming your code over to ${pipClass.selectedPip.pipName} as fast as we can!`
				})
			}

			if (pipClass.selectedPip.pipConnectionStatus === "offline") {
				return toast.negative({
					title: `${pipClass.selectedPip.pipName} is not online`,
					description: `Please connect ${pipClass.selectedPip.pipName} to the internet to upload code`
				})
			} else if (pipClass.selectedPip.pipConnectionStatus === "connected to other user") {
				return toast.negative({
					title: `Unable to upload code to ${pipClass.selectedPip.pipName} at this time`,
					description: `${pipClass.selectedPip.pipName} is connected to another user`
				})
			}
			pipClass.setIsSendingCppToPip(true)

			const connectToPipResponse = await blueDotApiClient.pipDataService.sendCppToPip(pipClass.selectedPip.pipUUID, cppCode)

			if (!isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
				throw new Error("Connect to Pip failed")
			}
			return toast.positive({ title: `Code sent to ${pipClass.selectedPip.pipName || "Pip"}` })
		} catch (error) {
			console.error(error)
			return toast.negative({
				title: "Unable to upload code to Pip at this time",
				description: "Please reload the page and try again"
			})
		} finally {
			pipClass.setIsSendingCppToPip(false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [blueDotApiClient.pipDataService, pipClass.isSendingCppToPip, pipClass.selectedPip?.pipConnectionStatus, toast])
}

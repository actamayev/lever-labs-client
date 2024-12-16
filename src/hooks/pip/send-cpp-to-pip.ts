import _ from "lodash"
import { useCallback } from "react"
import { usePipContext } from "../../contexts/pip-context"
import useStyledToast from "../../components/toast-options"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useSendCppToPip(): (
	cppCode: string
) => Promise<void> {
	const pipClass = usePipContext()
	const blueDotApiClient = useApiClientContext()
	const toast = useStyledToast()

	return useCallback(async (
		cppCode: string
	) => {
		try {
			if (
				pipClass.isSendingCppToPip === true ||
				_.isNull(pipClass.selectedPip)
			) return

			if (pipClass.selectedPip.pipConnectionStatus === "inactive") {
				toast.negative({
					title: `${pipClass.selectedPip.pipName} is not online`,
					description: `Please connect ${pipClass.selectedPip.pipName} to the internet to upload code.`
				})
				return
			} else if (pipClass.selectedPip.pipConnectionStatus === "connected to other user") {
				toast.negative({
					title: `Unable to upload code to ${pipClass.selectedPip.pipName} at this time`,
					description: `${pipClass.selectedPip.pipName} is connected to another user.`
				})
				return
			}
			pipClass.setIsSendingCppToPip(true)

			const connectToPipResponse = await blueDotApiClient.pipDataService.sendCppToPip(pipClass.selectedPip.pipUUID, cppCode)

			if (!_.isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
				throw new Error("Connect to Pip failed")
			}
			toast.positive({ description: `Code sent to ${pipClass.selectedPip.pipName || "Pip"}` })
		} catch (error) {
			console.error(error)
			toast.negative({
				title: "Unable to upload code to Pip at this time",
				description: "Please reload page and try again"
			})
		} finally {
			pipClass.setIsSendingCppToPip(false)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [blueDotApiClient.pipDataService, pipClass.isSendingCppToPip, pipClass.selectedPip?.pipConnectionStatus, toast])
}

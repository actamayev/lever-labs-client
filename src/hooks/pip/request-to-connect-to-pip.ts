import { AxiosError } from "axios"
import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import { usePipContext } from "../../contexts/pip-context"
import useToastOptions from "../../components/toast-options"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"
import { isMessageResponse, isNonSuccessResponse } from "../../utils/type-checks"

export default function useRequestToConnectToPip(): (
	pipUUID: PipUUID
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const pipClass = usePipContext()
	const toast = useToastOptions()

	// eslint-disable-next-line complexity
	return useCallback(async (pipUUID: PipUUID) => {
		const foundPip = pipClass.findPipFromUUID(pipUUID)
		try {
			if (!foundPip) return
			switch (foundPip.pipConnectionStatus) {
			case "connected": return
			case "connected to other user": {
				return toast.negative({
					title: "Unable to connect",
					description: "Someone is already connected to this Pip"
				})
			}
			case "inactive": {
				return toast.negative({
					title: "Unable to connect",
					description: `Please turn ${foundPip.pipName} on and connect it to the internet`
				})
			}
			}
			const connectToPipResponse = await blueDotApiClient.pipDataService.requestToConnectToPip(foundPip.pipUUID)

			if (!isEqual(connectToPipResponse.status, 200) || isNonSuccessResponse(connectToPipResponse.data)) {
				throw new Error("Connect to Pip failed")
			}
			pipClass.updatePipConnectionStatus({ pipUUID: foundPip.pipUUID, newConnectionStatus: "connected" })
			pipClass.setSelectedPip(foundPip)
		} catch (error) {
			console.error(error)
			if (error instanceof AxiosError) {
				if (isMessageResponse(error.response?.data)) {
					// eslint-disable-next-line max-depth
					if (error.response.data.message === "Someone is already connected to this Pip") {
						return toast.negative({
							title: "Unable to connect",
							description: `Someone is already connected to ${foundPip?.pipName}`
						})
					} else if (error.response.data.message === "This Pip is not active/connected to the internet") {
						return toast.negative({
							title: "Unable to connect",
							description: `${foundPip?.pipName} is not connected to the internet`
						})
					}  else if (error.response.data.message === "User hasn't registered this UUID") {
						return toast.negative({
							title: "Unable to connect",
							description: "Please register this Pip ID"
						})
					}
				}
			}
			return toast.negative({
				title: `Unable to connect to ${foundPip?.pipName} at this time`,
				description: "Please reload the page and try again"
			})
		}
	}, [blueDotApiClient.pipDataService, pipClass, toast])
}

"use client"

import { AxiosError } from "axios"
import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { AddPipData, PipData } from "@bluedotrobots/common-ts"
import useExitAfterAddPip from "./exit-after-add-pip"
import { usePipContext } from "../../contexts/pip-context"
import useToastOptions from "../../components/toast-options"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"
import { isMessageResponse, isNonSuccessResponse } from "../../utils/type-checks"

export default function useAddPip(
	resetAddPipVars: () => void,
	incompletePipData: IncompletePipData
): () => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const toast = useToastOptions()
	const pipClass = usePipContext()
	const exitAfterAddPip = useExitAfterAddPip()

	// eslint-disable-next-line complexity
	return useCallback(async () => {
		try {
			if (isNull(incompletePipData.pipUUID)) {
				return toast.negative({
					title: "Please connect your Pip to USB",
					description: "Please reload the page if you've connected it"
				})
			}
			if (pipClass.checkIfUUIDAlreadyExists(incompletePipData.pipUUID) === true) {
				return toast.negative({
					title: "Unable to add Pip ID",
					description: "You've already added a Pip with this ID"
				})
			}

			if (!incompletePipData.wiFiNetworkName || !incompletePipData.pipUUID) {
				return toast.negative({
					title: "Unable to validate Pip data",
					description: "Please enter data and try submitting again"
				})
			}

			const dataToSend: AddPipData = {
				pipUUID: incompletePipData.pipUUID,
				pipName: incompletePipData.pipName,
			}

			const addPipDataResponse = await blueDotApiClient.pipDataService.addPip(dataToSend)

			if (!isEqual(addPipDataResponse.status, 200) || isNonSuccessResponse(addPipDataResponse.data)) {
				throw new Error("Add Pip failed")
			}
			const pipDataToAdd: PipData = {
				pipName: addPipDataResponse.data.pipName,
				pipUUID: incompletePipData.pipUUID,
				userPipUUIDId: addPipDataResponse.data.userPipUUIDId,
				pipConnectionStatus: "connected"
			}
			pipClass.addNewPip(pipDataToAdd)
			exitAfterAddPip(resetAddPipVars)
		} catch (error) {
			console.error(error)
			if (error instanceof AxiosError) {
				if (isMessageResponse(error.response?.data)) {
					// eslint-disable-next-line max-depth
					if (error.response.data.message === "User already registered this Pip UUID") {
						return toast.negative({
							title: "Unable to add Pip ID",
							description: "You have a Pip with this ID"
						})
					} else if (error.response.data.message === "Pip UUID doesn't exist") {
						return toast.negative({
							title: "Unable to add Pip ID",
							description: "The Pip ID you entered does not exist"
						})
					}
				}
			}
			return toast.negative({
				title: `Unable to add ${incompletePipData.pipName || "Pip"} at this time`,
				description: "Please reload the page and try again"
			})
		}
	}, [incompletePipData.pipUUID, incompletePipData.wiFiNetworkName, incompletePipData.pipName, pipClass,
		blueDotApiClient.pipDataService, exitAfterAddPip, resetAddPipVars, toast])
}

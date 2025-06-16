"use client"

import { AxiosError } from "axios"
import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { AddPipData, PipData } from "@bluedotrobots/common-ts"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import useExitAfterAddPip from "./exit-after-add-pip"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import { isMessageResponse, isNonSuccessResponse } from "../../utils/type-checks"

export default function useAddPip(
	resetAddPipVars: () => void,
	getFormValues: () => IncompletePipData
): () => Promise<void> {
	const exitAfterAddPip = useExitAfterAddPip()

	// eslint-disable-next-line complexity
	return useCallback(async () => {
		try {
			const pipUUID = getFormValues().pipUUID
			if (isNull(pipUUID)) {
				return toastClass.negative({
					title: "Please connect your Pip to USB",
					description: "Please reload the page if you've connected it"
				})
			}
			if (pipClass.checkIfUUIDAlreadyExists(pipUUID) === true) {
				exitAfterAddPip(resetAddPipVars)
				return toastClass.negative({
					title: "Unable to add Pip ID",
					description: "You've already added a Pip with this ID"
				})
			}

			const formValues = getFormValues()
			const hasSelectedWiFi = formValues.selectedWiFiNetworkName && formValues.selectedWiFiNetworkName.trim() !== ""
			const hasManualWiFi = formValues.manualWiFiNetworkName && formValues.manualWiFiNetworkName.trim() !== ""

			if ((!hasSelectedWiFi && !hasManualWiFi) || !pipUUID) {
				return toastClass.negative({
					title: "Unable to validate Pip data",
					description: "Please connect to a WiFi network and try again"
				})
			}

			const dataToSend: AddPipData = {
				pipUUID: pipUUID,
				pipName: getFormValues().pipName,
			}

			const addPipDataResponse = await blueDotApiClientClass.pipDataService.addPip(dataToSend)

			if (!isEqual(addPipDataResponse.status, 200) || isNonSuccessResponse(addPipDataResponse.data)) {
				throw new Error("Add Pip failed")
			}
			const pipDataToAdd: PipData = {
				pipName: addPipDataResponse.data.pipName,
				pipUUID: pipUUID,
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
						return toastClass.negative({
							title: "Unable to add Pip ID",
							description: "You have a Pip with this ID"
						})
					} else if (error.response.data.message === "Pip UUID doesn't exist") {
						return toastClass.negative({
							title: "Unable to add Pip ID",
							description: "The Pip ID you entered does not exist"
						})
					}
				}
			}
			return toastClass.negative({
				title: `Unable to add ${getFormValues().pipName || "Pip"} at this time`,
				description: "Please reload the page and try again"
			})
		}
	}, [getFormValues, exitAfterAddPip, resetAddPipVars])
}

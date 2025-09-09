"use client"

import { AxiosError } from "axios"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { PipData } from "@bluedotrobots/common-ts/types/pip"
import { AddPipData } from "@bluedotrobots/common-ts/types/api"
import pipClass from "../../classes/pip-class"
import toastClass from "../../classes/toast-class"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"
import { isMessageResponse, isNonSuccessResponse } from "../type-checks"

// eslint-disable-next-line complexity
export default async function useAddPip(getFormValues: () => IncompletePipData): Promise<boolean> {
	try {
		const pipUUID = getFormValues().pipUUID
		if (isNull(pipUUID)) {
			toastClass.negative({
				title: "Please connect your Pip to USB",
				description: "Please reload the page if you've connected it"
			})
			return false
		}
		if (pipClass.checkIfUUIDAlreadyExists(pipUUID) === true) {
			toastClass.neutral({
				title: "Unable to add Pip ID",
				description: "You've already added a Pip with this ID"
			})
			return true
		}

		const formValues = getFormValues()
		const hasSelectedWiFi = formValues.selectedWiFiNetworkName && formValues.selectedWiFiNetworkName.trim() !== ""
		const hasManualWiFi = formValues.manualWiFiNetworkName && formValues.manualWiFiNetworkName.trim() !== ""

		if ((!hasSelectedWiFi && !hasManualWiFi) || !pipUUID) {
			toastClass.negative({
				title: "Unable to validate Pip data",
				description: "Please connect to a WiFi network and try again"
			})
			return false
		}

		const dataToSend: AddPipData = {
			pipUUID: pipUUID,
			pipName: getFormValues().pipName,
		}

		const addPipDataResponse = await blueDotApiClient.pipDataService.addPip(dataToSend)

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
		return true
	} catch (error) {
		console.error(error)
		if (error instanceof AxiosError) {
			if (isMessageResponse(error.response?.data)) {
				// eslint-disable-next-line max-depth
				if (error.response?.data.message === "User already registered this Pip UUID") {
					toastClass.negative({
						title: "Unable to add Pip ID",
						description: "You have a Pip with this ID"
					})
					return false
				} else if (error.response?.data.message === "Pip UUID doesn't exist") {
					toastClass.negative({
						title: "Unable to add Pip ID",
						description: "The Pip ID you entered does not exist"
					})
					return false
				}
			}
		}
		toastClass.negative({
			title: `Unable to add ${getFormValues().pipName || "Pip"} at this time`,
			description: "Please reload the page and try again"
		})
		return false
	}
}

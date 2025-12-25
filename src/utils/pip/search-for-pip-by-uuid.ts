"use client"

import isEqual from "lodash-es/isEqual"
import { PipUUID } from "@actamayev/lever-labs-common-ts/types/utils"
import { isMessageResponse, isNonSuccessResponse } from "../type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import { RetrieveIsPipUUIDValidResponse } from "@actamayev/lever-labs-common-ts/types/api"
import { AxiosError } from "axios"

export default async function searchForPipByUUID(pipUUID: PipUUID): Promise<RetrieveIsPipUUIDValidResponse | string> {
	try {
		const response = await leverLabsApiClient.pipDataService.retrievePipUUIDStatus(pipUUID)
		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			throw new Error("Search for Pip by UUID failed")
		}
		return response.data
	} catch (error) {
		console.error(error)
		if (error instanceof AxiosError && isMessageResponse(error.response?.data)) {
			return error.response?.data.message || "Please try again"
		}
		console.error(error)
		return "Please try again"
	}
}

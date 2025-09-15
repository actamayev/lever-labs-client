import isEqual from "lodash-es/isEqual"
import { PipUUID } from "@bluedotrobots/common-ts/types/utils"
import { isErrorResponses, isMessageResponse } from "../type-checks"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"
import { RetrieveIsPipUUIDValidResponse } from "@bluedotrobots/common-ts/types/api"

export default async function searchForPipByUUID(pipUUID: PipUUID): Promise<RetrieveIsPipUUIDValidResponse | string> {
	try {
		const response = await blueDotApiClient.pipDataService.retrievePipUUIDStatus(pipUUID)
		if (!isEqual(response.status, 200) || isErrorResponses(response.data)) {
			throw new Error("Search for Pip by UUID failed")
		}
		if (isMessageResponse(response.data)) {
			return response.data.message
		}
		return response.data
	} catch (error) {
		console.error(error)
		return "Please try again"
	}
}

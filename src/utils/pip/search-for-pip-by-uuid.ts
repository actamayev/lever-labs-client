import isEqual from "lodash-es/isEqual"
import { PipUUID } from "@bluedotrobots/common-ts/types/utils"
import { isNonSuccessResponse } from "../type-checks"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"
import { RetrieveIsPipUUIDValidResponse } from "@bluedotrobots/common-ts/types/api"

export default async function searchForPipByUUID(pipUUID: PipUUID): Promise<RetrieveIsPipUUIDValidResponse | undefined> {
	try {
		const response = await blueDotApiClient.pipDataService.retrievePipUUIDStatus(pipUUID)
		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			throw new Error("Search for Pip by UUID failed")
		}
		return response.data
	} catch (error) {
		console.error(error)
		return undefined
	}
}

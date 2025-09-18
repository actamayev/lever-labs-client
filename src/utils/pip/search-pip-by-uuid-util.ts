"use client"

import { PipUUID } from "@bluedotrobots/common-ts/types/utils"
import { isString } from "lodash-es"
import pipClass from "../../classes/pip-class"
import searchForPipByUUID from "./search-for-pip-by-uuid"

/**
 * Utility function to search for a pip by UUID and update the pip-class state
 * @param pipUUID - The 5-character pip UUID to search for
 * @param onSuccess - Optional callback to execute when search is successful
 */
export default async function searchPipByUUIDUtil(
	pipUUID: string,
	onSuccess?: () => void
): Promise<void> {
	if (pipUUID.length !== 5) return

	pipClass.setIsSearching(true)
	pipClass.setErrorMessage("")
	pipClass.setSearchResult(null)

	try {
		const result = await searchForPipByUUID(pipUUID as PipUUID)
		if (isString(result)) {
			pipClass.setErrorMessage(result)
		} else {
			pipClass.setSearchResult({
				pipName: result.pipName || pipUUID,
				pipConnectionStatus: result.pipConnectionStatus,
				pipUUID: pipUUID,
			})
			onSuccess?.()
		}
	} catch (error) {
		console.error("Error searching for pip:", error)
		pipClass.setErrorMessage("We couldn't find a Pip with that ID. Could you double check your ID?")
	}
	pipClass.setIsSearching(false)
}

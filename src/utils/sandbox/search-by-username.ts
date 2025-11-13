"use client"

import isEqual from "lodash-es/isEqual"
import authClass from "../../classes/auth-class"
import sandboxClass from "../../classes/sandbox-class"
import { isErrorResponses } from "../type-checks"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"

export default async function searchByUsername(username: string): Promise<void> {
	try {
		if (authClass.isFinishedWithSignup === false) return
		if (!username.trim()) {
			sandboxClass.setUsernameSearchResults([])
			return
		}

		const searchResponse = await leverLabsApiClient.sandboxDataService.searchByUsername(username.trim())
		if (!isEqual(searchResponse.status, 200) || isErrorResponses(searchResponse.data)) {
			sandboxClass.setUsernameSearchResults([])
			return
		}

		const users = searchResponse.data.users || []
		sandboxClass.setUsernameSearchResults(users)
	} catch (error) {
		console.error(error)
		sandboxClass.setUsernameSearchResults([])
	}
}


"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import toastClass from "../../classes/toast-class"
import { isErrorResponses } from "../type-checks"
import personalInfoClass from "../../classes/personal-info-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function editName(newName: string) : Promise<void> {
	try {
		if (
			isNull(blueDotApiClientClass.httpClient.accessToken) ||
			newName === personalInfoClass.name
		) return

		const updateNameResponse = await blueDotApiClientClass.personalInfoDataService.updateName(newName)
		if (!isEqual(updateNameResponse.status, 200) || isErrorResponses(updateNameResponse.data)) {
			throw Error ("Unable to edit name")
		}

		personalInfoClass.setName(newName)
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to edit name",
			description: "Please reload the page and try again"
		})
	}
}

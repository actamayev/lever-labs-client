"use client"

import isEqual from "lodash-es/isEqual"
import getAuthClass from "../../classes/auth-class"
import getToastClass from "../../classes/toast-class"
import { isErrorResponses } from "../type-checks"
import getPersonalInfoClass from "../../classes/personal-info-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function editName(newName: string) : Promise<void> {
	try {
		if (
			getAuthClass().isFinishedWithSignup === false ||
			newName === getPersonalInfoClass().name
		) return

		const updateNameResponse = await getBlueDotApiClientClass().personalInfoDataService.updateName(newName)
		if (!isEqual(updateNameResponse.status, 200) || isErrorResponses(updateNameResponse.data)) {
			throw Error ("Unable to edit name")
		}

		getPersonalInfoClass().setName(newName)
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to edit name",
			description: "Please reload the page and try again"
		})
	}
}

"use client"

import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../type-checks"
import toastClass from "../../classes/toast-class"
import personalInfoClass from "../../classes/personal-info-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function setSandboxNotesOpenStatus():  Promise<void> {
	try {
		const newStatus = !personalInfoClass.sandboxNotesOpen
		if (isNull(blueDotApiClientClass.httpClient.accessToken)) return
		const siteThemeResponse = await blueDotApiClientClass.personalInfoDataService.setSandboxNotesOpenStatus(newStatus)
		if (!isEqual(siteThemeResponse.status, 200) || isErrorResponse(siteThemeResponse.data)) {
			throw Error("Unable to save sandbox notes open status")
		}
		personalInfoClass.setSandboxNotesOpen(newStatus)
	} catch (error) {
		console.error(error)
		return toastClass.negative({
			title: "Unable to save notebook open status",
			description: "Please reload the page and try again"
		})
	}
}

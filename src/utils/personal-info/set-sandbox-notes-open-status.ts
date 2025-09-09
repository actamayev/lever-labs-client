"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../type-checks"
import getAuthClass from "../../classes/auth-class"
import getToastClass from "../../classes/toast-class"
import getPersonalInfoClass from "../../classes/personal-info-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function setSandboxNotesOpenStatus():  Promise<void> {
	try {
		const newStatus = !getPersonalInfoClass().sandboxNotesOpen
		if (getAuthClass().isFinishedWithSignup === false) return
		const siteThemeResponse = await getBlueDotApiClientClass().personalInfoDataService.setSandboxNotesOpenStatus(newStatus)
		if (!isEqual(siteThemeResponse.status, 200) || isErrorResponse(siteThemeResponse.data)) {
			throw Error("Unable to save sandbox notes open status")
		}
		getPersonalInfoClass().setSandboxNotesOpen(newStatus)
	} catch (error) {
		console.error(error)
		return getToastClass().negative({
			title: "Unable to save notebook open status",
			description: "Please reload the page and try again"
		})
	}
}

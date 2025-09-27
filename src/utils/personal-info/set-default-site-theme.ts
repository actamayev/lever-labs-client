"use client"

import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../type-checks"
import authClass from "../../classes/auth-class"
import toastClass from "../../classes/toast-class"
import personalInfoClass from "../../classes/personal-info-class"
import blueDotApiClient from "../../classes/lever-labs-api-client-class"

export default function useSetDefaultSiteTheme(): () => Promise<void> {
	return useCallback(async (): Promise<void> => {
		try {
			const newSiteTheme = personalInfoClass.defaultSiteTheme === "light" ? "dark" : "light"
			personalInfoClass.setDefaultSiteTheme(newSiteTheme)
			if (authClass.isFinishedWithSignup === false) {
				return // No toast because we don't want a negative toast if someone isn't logged in
			}
			const siteThemeResponse = await blueDotApiClient.personalInfoDataService.setDefaultSiteTheme(newSiteTheme)
			if (!isEqual(siteThemeResponse.status, 200) || isErrorResponse(siteThemeResponse.data)) {
				throw Error("Unable to save new default site theme")
			}
		} catch (error) {
			console.error(error)
			return toastClass.negative({
				title: "Unable to change site theme at this time",
				description: "Please reload the page and try again"
			})
		}
	}, [])
}

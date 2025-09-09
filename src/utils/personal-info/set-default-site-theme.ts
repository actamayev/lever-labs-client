"use client"

import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../type-checks"
import getAuthClass from "../../classes/auth-class"
import getToastClass from "../../classes/toast-class"
import getPersonalInfoClass from "../../classes/personal-info-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default function useSetDefaultSiteTheme(): () => Promise<void> {
	return useCallback(async (): Promise<void> => {
		try {
			const newSiteTheme = getPersonalInfoClass().defaultSiteTheme === "light" ? "dark" : "light"
			getPersonalInfoClass().setDefaultSiteTheme(newSiteTheme)
			if (getAuthClass().isFinishedWithSignup === false) {
				return // No toast because we don't want a negative toast if someone isn't logged in
			}
			const siteThemeResponse = await getBlueDotApiClientClass().personalInfoDataService.setDefaultSiteTheme(newSiteTheme)
			if (!isEqual(siteThemeResponse.status, 200) || isErrorResponse(siteThemeResponse.data)) {
				throw Error("Unable to save new default site theme")
			}
		} catch (error) {
			console.error(error)
			return getToastClass().negative({
				title: "Unable to change site theme at this time",
				description: "Please reload the page and try again"
			})
		}
	}, [])
}

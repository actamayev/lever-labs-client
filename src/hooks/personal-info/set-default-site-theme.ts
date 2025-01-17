import isNull from "lodash/isNull"
import isEqual from "lodash/isEqual"
import { useCallback } from "react"
import { isErrorResponse } from "../../utils/type-checks"
import useToastOptions from "../../components/toast-options"
import useDefaultSiteTheme from "../memos/default-site-theme"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useSetDefaultSiteTheme(): () => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()
	const toast = useToastOptions()
	const defaultSiteTheme = useDefaultSiteTheme()

	return useCallback(async () => {
		try {
			const newSiteTheme = defaultSiteTheme === "light" ? "dark" : "light"
			personalInfoClass.setDefaultSiteTheme(newSiteTheme)
			if (isNull(blueDotApiClient.httpClient.accessToken)) {
				return // No toast because we don't want a negative toast if someone isn't logged in
			}
			const siteThemeResponse = await blueDotApiClient.personalInfoDataService.setDefaultSiteTheme(newSiteTheme)
			if (!isEqual(siteThemeResponse.status, 200) || isErrorResponse(siteThemeResponse.data)) {
				throw Error("Unable to save new default site theme")
			}
		} catch (error) {
			console.error(error)
			return toast.negative({
				title: "Unable to change site theme at this time",
				description: "Please reload the page and try again"
			})
		}
	}, [defaultSiteTheme, personalInfoClass, blueDotApiClient.httpClient.accessToken, blueDotApiClient.personalInfoDataService, toast])
}

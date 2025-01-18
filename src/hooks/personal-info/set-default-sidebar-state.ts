import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../../utils/type-checks"
import useToastOptions from "../../components/toast-options"
import useDefaultSidebarState from "../memos/default-sidebar-state"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useSetDefaultSidebarState(): () => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()
	const toast = useToastOptions()
	const defaultSidebarState = useDefaultSidebarState()

	return useCallback(async () => {
		try {
			const newSidebarState = defaultSidebarState === "expanded" ? "collapsed" : "expanded"
			personalInfoClass.setDefaultSidebarState(newSidebarState)
			if (isNull(blueDotApiClient.httpClient.accessToken)) {
				return toast.negative({
					title: "Please log in to save the new sidebar state"
				})
			}
			const sidebarStateResponse = await blueDotApiClient.personalInfoDataService.setDefaultSidebarState(newSidebarState)
			if (!isEqual(sidebarStateResponse.status, 200) || isErrorResponse(sidebarStateResponse.data)) {
				throw Error("Unable to save new sidebar state")
			}
		} catch (error) {
			console.error(error)
			return toast.negative({
				title: "Unable to change sidebar state at this time",
				description: "Please reload the page and try again"
			})
		}
	}, [defaultSidebarState, personalInfoClass, blueDotApiClient.httpClient.accessToken, blueDotApiClient.personalInfoDataService, toast])
}

import { useCallback } from "react"
import { AxiosResponse } from "axios"
import isEqual from "lodash-es/isEqual"
import { isNonSuccessResponse } from "../../utils/type-checks"

export default function useDemoButtonOnClick(): (
	apiCall: () => Promise<AxiosResponse<DemoResponse | NonSuccessResponse>>
) => Promise<void> {

	return useCallback(async (
		apiCall: () => Promise<AxiosResponse<DemoResponse | NonSuccessResponse>>
	): Promise<void> => {
		try {
			const response = await apiCall()
			if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
				return
			}
		} catch (error) {
			console.error(error)
		}
	}, [])
}

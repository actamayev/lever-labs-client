"use client"

import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../../utils/type-checks"
import useToastOptions from "../../components/toast-options"
import personalInfoClass from "../../classes/personal-info-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default function useRemoveCurrentProfilePicture(): (
	setIsDeletingCurrentPicture: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const toast = useToastOptions()

	return useCallback(async (
		setIsDeletingCurrentPicture: React.Dispatch<React.SetStateAction<boolean>>
	): Promise<void> => {
		try {
			personalInfoClass.setProfilePictureUrl(null)
			setIsDeletingCurrentPicture(false)
			const response = await blueDotApiClientClass.personalInfoDataService.removeCurrentProfilePicture()

			if (!isEqual(response.status, 200) || isErrorResponse(response.data)) {
				return
			}
			toast.positive({
				title: "Profile picture removed"
			})
		} catch (error) {
			console.error(error)
			personalInfoClass.setProfilePictureUrl(
				personalInfoClass.profilePictureUrl
			)  // if fails, reset the url to what it previously was
			toast.negative({
				title: "Unable to remove profile picture at this time. Please reload page and try again"
			})
		}
	}, [blueDotApiClientClass.personalInfoDataService, personalInfoClass, toast])
}

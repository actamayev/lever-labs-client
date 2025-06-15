"use client"

import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import useToastOptions from "../../components/toast-options"
import { isNonSuccessResponse } from "../../utils/type-checks"
import personalInfoClass from "../../classes/personal-info-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default function useUploadProfilePicture(): (
	selectedImage: File,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const toast = useToastOptions()

	return useCallback(async (
		selectedImage: File ,
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		try {
			setIsLoading(true)
			const uploadProfilePictureResponse = await blueDotApiClientClass.personalInfoDataService.uploadProfilePicture(selectedImage)
			if (!isEqual(uploadProfilePictureResponse.status, 200) || isNonSuccessResponse(uploadProfilePictureResponse.data)) {
				return
			}
			personalInfoClass.setProfilePictureUrl(uploadProfilePictureResponse.data.profilePictureUrl)
			toast.positive({
				title: "New profile picture uploaded"
			})
		} catch (error) {
			console.error(error)
			toast.negative({
				title: "Unable to upload profile picture at this time. Please reload page and try again"
			})
		} finally {
			setIsLoading(false)
		}
	}, [toast])
}

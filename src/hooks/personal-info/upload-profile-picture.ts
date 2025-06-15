"use client"

import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import isEqual from "lodash-es/isEqual"
import useToastOptions from "../../components/toast-options"
import { isNonSuccessResponse } from "../../utils/type-checks"
import { usePersonalInfoContext } from "../../classes/personal-info-context"
import { useApiClientContext } from "../../classes/blue-dot-api-client-context"

export default function useUploadProfilePicture(): (
	selectedImage: File | null,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void> {
	const blueDotApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()
	const toast = useToastOptions()

	return useCallback(async (
		selectedImage: File | null,
		setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		try {
			if (isNull(selectedImage)) return
			setIsLoading(true)
			const uploadProfilePictureResponse = await blueDotApiClient.personalInfoDataService.uploadProfilePicture(selectedImage)
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
	}, [blueDotApiClient.personalInfoDataService, personalInfoClass, toast])
}

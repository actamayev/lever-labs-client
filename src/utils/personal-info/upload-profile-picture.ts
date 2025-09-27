"use client"

import isEqual from "lodash-es/isEqual"
import toastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import personalInfoClass from "../../classes/personal-info-class"
import blueDotApiClient from "../../classes/lever-labs-api-client-class"

export default async function uploadProfilePicture(
	selectedImage: File,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) : Promise<void> {
	try {
		setIsLoading(true)
		const uploadProfilePictureResponse = await blueDotApiClient.personalInfoDataService.uploadProfilePicture(selectedImage)
		if (!isEqual(uploadProfilePictureResponse.status, 200) || isNonSuccessResponse(uploadProfilePictureResponse.data)) {
			return
		}
		personalInfoClass.setProfilePictureUrl(uploadProfilePictureResponse.data.profilePictureUrl)
		toastClass.positive({
			title: "New profile picture uploaded"
		})
	} catch (error) {
		console.error(error)
		toastClass.negative({
			title: "Unable to upload profile picture at this time. Please reload page and try again"
		})
	} finally {
		setIsLoading(false)
	}
}

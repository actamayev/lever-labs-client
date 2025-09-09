"use client"

import isEqual from "lodash-es/isEqual"
import getToastClass from "../../classes/toast-class"
import { isNonSuccessResponse } from "../type-checks"
import getPersonalInfoClass from "../../classes/personal-info-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function uploadProfilePicture(
	selectedImage: File,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) : Promise<void> {
	try {
		setIsLoading(true)
		const uploadProfilePictureResponse = await getBlueDotApiClientClass().personalInfoDataService.uploadProfilePicture(selectedImage)
		if (!isEqual(uploadProfilePictureResponse.status, 200) || isNonSuccessResponse(uploadProfilePictureResponse.data)) {
			return
		}
		getPersonalInfoClass().setProfilePictureUrl(uploadProfilePictureResponse.data.profilePictureUrl)
		getToastClass().positive({
			title: "New profile picture uploaded"
		})
	} catch (error) {
		console.error(error)
		getToastClass().negative({
			title: "Unable to upload profile picture at this time. Please reload page and try again"
		})
	} finally {
		setIsLoading(false)
	}
}

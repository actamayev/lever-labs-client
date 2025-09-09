"use client"

import isEqual from "lodash-es/isEqual"
import toastClass from "../../classes/toast-class"
import { isErrorResponse } from "../type-checks"
import personalInfoClass from "../../classes/personal-info-class"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"

export default async function removeCurrentProfilePicture(
	setIsDeletingCurrentPicture: React.Dispatch<React.SetStateAction<boolean>>
) : Promise<void> {
	const previousProfilePictureUrl = personalInfoClass.profilePictureUrl
	try {
		personalInfoClass.setProfilePictureUrl(null)
		setIsDeletingCurrentPicture(false)
		const response = await blueDotApiClient.personalInfoDataService.removeCurrentProfilePicture()

		if (!isEqual(response.status, 200) || isErrorResponse(response.data)) {
			return
		}
		toastClass.positive({
			title: "Profile picture removed"
		})
	} catch (error) {
		console.error(error)
		personalInfoClass.setProfilePictureUrl(previousProfilePictureUrl)  // if fails, reset the url to what it previously was
		toastClass.negative({
			title: "Unable to remove profile picture at this time. Please reload page and try again"
		})
	}
}

"use client"

import isEqual from "lodash-es/isEqual"
import getToastClass from "../../classes/toast-class"
import { isErrorResponse } from "../type-checks"
import getPersonalInfoClass from "../../classes/personal-info-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"

export default async function removeCurrentProfilePicture(
	setIsDeletingCurrentPicture: React.Dispatch<React.SetStateAction<boolean>>
) : Promise<void> {
	const previousProfilePictureUrl = getPersonalInfoClass().profilePictureUrl
	try {
		getPersonalInfoClass().setProfilePictureUrl(null)
		setIsDeletingCurrentPicture(false)
		const response = await getBlueDotApiClientClass().personalInfoDataService.removeCurrentProfilePicture()

		if (!isEqual(response.status, 200) || isErrorResponse(response.data)) {
			return
		}
		getToastClass().positive({
			title: "Profile picture removed"
		})
	} catch (error) {
		console.error(error)
		getPersonalInfoClass().setProfilePictureUrl(previousProfilePictureUrl)  // if fails, reset the url to what it previously was
		getToastClass().negative({
			title: "Unable to remove profile picture at this time. Please reload page and try again"
		})
	}
}

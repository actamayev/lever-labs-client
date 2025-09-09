"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../type-checks"
import toastClass from "../../classes/toast-class"
import teacherClass from "../../classes/teacher-class"
import personalInfoClass from "../../classes/personal-info-class"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default async function retrievePersonalInfo(): Promise<void> {
	try {
		if (
			// We need to retrieve the personal info wherever we are to confirm Google users have finished registering their usernames
			personalInfoClass.isRetrievingPersonalInfo === true ||
			personalInfoClass.retrievedPersonalInfo === true
		) return

		personalInfoClass.setIsRetrievingPersonalDetails(true)

		const personalInfoResponse = await blueDotApiClient.personalInfoDataService.retrievePersonalInfo()
		if (!isEqual(personalInfoResponse.status, 200) || isErrorResponse(personalInfoResponse.data)) {
			throw Error ("Unable to retrieve personal info")
		}
		personalInfoClass.setRetrievedPersonalData(personalInfoResponse.data)
		teacherClass.setTeacherData(personalInfoResponse.data.teacherData)
		// This is here to auto-connect when the username is retrieved
		void serialConnectionManagerClass.checkAndAutoConnectIfLoggedIn()
	} catch (error) {
		console.error(error)
		personalInfoClass.setIsRetrievingPersonalDetails(false)
		return toastClass.negative({
			title: "Unable to retrieve Personal Info",
			description: "Please reload the page and try again"
		})
	}
}

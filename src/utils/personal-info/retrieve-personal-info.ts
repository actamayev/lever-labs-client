"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../type-checks"
import getToastClass from "../../classes/toast-class"
import getTeacherClass from "../../classes/teacher-class"
import getPersonalInfoClass from "../../classes/personal-info-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default async function retrievePersonalInfo(): Promise<void> {
	try {
		if (
			// We need to retrieve the personal info wherever we are to confirm Google users have finished registering their usernames
			getPersonalInfoClass().isRetrievingPersonalInfo === true ||
			getPersonalInfoClass().retrievedPersonalInfo === true
		) return

		getPersonalInfoClass().setIsRetrievingPersonalDetails(true)

		const personalInfoResponse = await getBlueDotApiClientClass().personalInfoDataService.retrievePersonalInfo()
		if (!isEqual(personalInfoResponse.status, 200) || isErrorResponse(personalInfoResponse.data)) {
			throw Error ("Unable to retrieve personal info")
		}
		getPersonalInfoClass().setRetrievedPersonalData(personalInfoResponse.data)
		getTeacherClass().setTeacherData(personalInfoResponse.data.teacherData)
		// This is here to auto-connect when the username is retrieved
		void serialConnectionManagerClass.checkAndAutoConnectIfLoggedIn()
	} catch (error) {
		console.error(error)
		getPersonalInfoClass().setIsRetrievingPersonalDetails(false)
		return getToastClass().negative({
			title: "Unable to retrieve Personal Info",
			description: "Please reload the page and try again"
		})
	}
}

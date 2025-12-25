"use client"

import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import isUndefined from "lodash-es/isUndefined"
import { CredentialResponse } from "@react-oauth/google"
import authClass from "../../classes/auth-class"
import studentClass from "../../classes/student-class"
import teacherClass from "../../classes/teacher-class"
import { isErrorResponses } from "../../utils/type-checks"
import personalInfoClass from "../../classes/personal-info-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"
import { isNull } from "lodash-es"
import garageClass from "../../classes/garage-class"
import pipClass from "../../classes/pip-class"
import { GoogleAuthSuccess } from "@actamayev/lever-labs-common-ts/types/api"

export default function useGoogleAuthCallback(): (successResponse: CredentialResponse) => Promise<GoogleAuthSuccess | null> {
	return useCallback(async (successResponse: CredentialResponse): Promise<GoogleAuthSuccess | null> => {
		try {
			authClass.setAuthenticating(true)
			if (
				isUndefined(successResponse.credential) ||
				isUndefined(successResponse.clientId) ||
				typeof window === "undefined"
			) return null

			const siteTheme = personalInfoClass.defaultSiteTheme

			const googleCallbackResponse = await leverLabsApiClient.authDataService.googleLoginCallback(
				successResponse.credential, siteTheme
			)

			if (!isEqual(googleCallbackResponse.status, 200) || isErrorResponses(googleCallbackResponse.data)) {
				throw Error("Unable to log in")
			}

			authClass.setAuthState({
				isAuthenticated: true,
				hasCompletedSignup: !googleCallbackResponse.data.isNewUser
			})

			if (googleCallbackResponse.data.isNewUser === true || isUndefined(googleCallbackResponse.data.personalInfo)) {
				return googleCallbackResponse.data
			}

			personalInfoClass.setRetrievedPersonalData(googleCallbackResponse.data.personalInfo)
			teacherClass.setTeacherData(googleCallbackResponse.data.teacherData)
			const classroomInfo = googleCallbackResponse.data.studentClasses.map((classroom): StudentClassroomDataWithHubs => ({
				...classroom,
				activeHubs: classroom.activeHubs.map((hub): ExtendedStudentViewHubData => ({ ...hub, isHubJoined: false }))
			}))
			studentClass.setRetrievedStudentData(classroomInfo)
			void serialConnectionManagerClass.checkAndAutoConnectIfLoggedIn()
			garageClass.setStudentGarageStatuses(classroomInfo)
			if (!isNull(googleCallbackResponse.data.autoConnectedPipUUID)) {
				pipClass.addNewPip({
					pipUUID: googleCallbackResponse.data.autoConnectedPipUUID,
					pipConnectionStatus: "connected online to you"
				})
			}
			return googleCallbackResponse.data
		} catch (error) {
			console.error(error)
			return null
		} finally {
			authClass.setAuthenticating(false)
		}
	}, [])
}

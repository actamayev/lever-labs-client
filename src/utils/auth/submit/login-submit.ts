"use client"

import { isEmpty, isNull } from "lodash-es"
import isEqual from "lodash-es/isEqual"
import { LoginRequest } from "@lever-labs/common-ts/types/api"
import authClass from "../../../classes/auth-class"
import studentClass from "../../../classes/student-class"
import teacherClass from "../../../classes/teacher-class"
import { isNonSuccessResponse } from "../../type-checks"
import personalInfoClass from "../../../classes/personal-info-class"
import confirmLoginFields from "../confirm-login-fields"
import leverLabsApiClient from "../../../classes/lever-labs-api-client-class"
import setErrorAxiosResponse from "../../error-handling/set-error-axios-response"
import serialConnectionManagerClass from "../../../classes/serial-connection-manager-class"
import garageClass from "../../../classes/garage-class"
import pipClass from "../../../classes/pip-class"

type WhereToNavigate = "PageToNavigateAfterLogin" | "Whiteboard" | "ClassManager" | null

export default async function loginSubmit(
	loginInformation: LoginRequest,
	setError: (error: string) => void
) : Promise<WhereToNavigate> {
	try {
		setError("")
		const areCredentialsValid = confirmLoginFields(loginInformation, setError)
		if (areCredentialsValid === false) return null

		authClass.setAuthenticating(true)
		const response = await leverLabsApiClient.authDataService.login(loginInformation)
		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			setError("Unable to log in. Please reload the page and try again")
			return null
		}
		authClass.setAuthState({
			isAuthenticated: true,
			hasCompletedSignup: true
		})
		personalInfoClass.setRetrievedPersonalData(response.data.personalInfo)
		teacherClass.setTeacherData(response.data.teacherData)
		const classroomInfo = response.data.studentClasses.map((classroom): StudentClassroomDataWithHubs => ({
			...classroom,
			activeHubs: classroom.activeHubs.map((hub): ExtendedStudentViewHubData => ({ ...hub, isHubJoined: false }))
		}))
		studentClass.setRetrievedStudentData(classroomInfo)
		void serialConnectionManagerClass.checkAndAutoConnectIfLoggedIn()
		garageClass.setStudentGarageStatuses(classroomInfo)
		if (!isNull(response.data.autoConnectedPipUUID)) {
			pipClass.addNewPip({
				pipUUID: response.data.autoConnectedPipUUID,
				pipConnectionStatus: "connected online to you"
			})
		}

		if (response.data.teacherData && response.data.teacherData.isApproved === true) return "ClassManager"
		if (!isEmpty(classroomInfo)) return "Whiteboard"
		return "PageToNavigateAfterLogin"
	} catch (error: unknown) {
		setErrorAxiosResponse(error, setError)
		return null
	} finally {
		authClass.setAuthenticating(false)
	}
}

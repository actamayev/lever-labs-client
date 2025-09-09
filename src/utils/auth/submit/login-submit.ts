"use client"

import isEqual from "lodash-es/isEqual"
import { LoginRequest } from "@bluedotrobots/common-ts/types/api"
import getPipClass from "../../../classes/pip-class"
import getAuthClass from "../../../classes/auth-class"
import getStudentClass from "../../../classes/student-class"
import getTeacherClass from "../../../classes/teacher-class"
import { isNonSuccessResponse } from "../../type-checks"
import getPersonalInfoClass from "../../../classes/personal-info-class"
import confirmLoginFields from "../confirm-login-fields"
import getBlueDotApiClientClass from "../../../classes/blue-dot-api-client-class"
import setErrorAxiosResponse from "../../error-handling/set-error-axios-response"
import serialConnectionManagerClass from "../../../classes/serial-connection-manager-class"

export default async function loginSubmit(
	loginInformation: LoginRequest,
	setError: (error: string) => void
) : Promise<boolean> {
	try {
		setError("")
		const areCredentialsValid = confirmLoginFields(loginInformation, setError)
		if (areCredentialsValid === false) return false

		getAuthClass().setAuthenticating(true)
		const response = await getBlueDotApiClientClass().authDataService.login(loginInformation)
		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			setError("Unable to log in. Please reload the page and try again")
			return false
		}
		getAuthClass().setAuthState({
			isAuthenticated: true,
			hasCompletedSignup: true
		})
		getPersonalInfoClass().setRetrievedPersonalData(response.data.personalInfo)
		getTeacherClass().setTeacherData(response.data.teacherData)
		getPipClass().setPipData(response.data.userPipData)
		const classroomInfo = response.data.studentClasses.map((classroom): StudentClassroomDataWithHubs => ({
			...classroom,
			activeHubs: classroom.activeHubs.map((hub): ExtendedStudentViewHubData => ({ ...hub, isHubJoined: false }))
		}))
		getStudentClass().setRetrievedStudentData(classroomInfo)
		void serialConnectionManagerClass.checkAndAutoConnectIfLoggedIn()
		return true
	} catch (error: unknown) {
		setErrorAxiosResponse(error, setError)
		return false
	} finally {
		getAuthClass().setAuthenticating(false)
	}
}

"use client"

import isEqual from "lodash-es/isEqual"
import { LoginRequest } from "@bluedotrobots/common-ts/types/api"
import pipClass from "../../../classes/pip-class"
import authClass from "../../../classes/auth-class"
import studentClass from "../../../classes/student-class"
import teacherClass from "../../../classes/teacher-class"
import { isNonSuccessResponse } from "../../type-checks"
import personalInfoClass from "../../../classes/personal-info-class"
import confirmLoginFields from "../confirm-login-fields"
import blueDotApiClientClass from "../../../classes/blue-dot-api-client-class"
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

		authClass.setAuthenticating(true)
		const response = await blueDotApiClientClass.authDataService.login(loginInformation)
		if (!isEqual(response.status, 200) || isNonSuccessResponse(response.data)) {
			setError("Unable to log in. Please reload the page and try again")
			return false
		}
		authClass.setAuthState({
			isAuthenticated: true,
			hasCompletedSignup: true
		})
		personalInfoClass.setRetrievedPersonalData(response.data.personalInfo)
		teacherClass.setTeacherData(response.data.teacherData)
		pipClass.setPipData(response.data.userPipData)
		const classroomInfo = response.data.studentClasses.map((classroom): StudentClassroomDataWithHubs => ({
			...classroom,
			activeHubs: classroom.activeHubs.map((hub): ExtendedStudentViewHubData => ({ ...hub, isHubJoined: false }))
		}))
		studentClass.setRetrievedStudentData(classroomInfo)
		void serialConnectionManagerClass.checkAndAutoConnectIfLoggedIn()
		return true
	} catch (error: unknown) {
		setErrorAxiosResponse(error, setError)
		return false
	} finally {
		authClass.setAuthenticating(false)
	}
}

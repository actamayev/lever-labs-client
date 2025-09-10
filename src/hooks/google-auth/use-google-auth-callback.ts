"use client"

import { useCallback } from "react"
import isEqual from "lodash-es/isEqual"
import { usePathname } from "next/navigation"
import isUndefined from "lodash-es/isUndefined"
import { CredentialResponse } from "@react-oauth/google"
import authClass from "../../classes/auth-class"
import studentClass from "../../classes/student-class"
import teacherClass from "../../classes/teacher-class"
import { isErrorResponses } from "../../utils/type-checks"
import useTypedNavigate from "../navigate/use-typed-navigate"
import personalInfoClass from "../../classes/personal-info-class"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"
import { PageToNavigateAfterLogin } from "../../utils/constants/page-constants"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default function useGoogleAuthCallback(): (successResponse: CredentialResponse) => Promise<void> {
	const navigate = useTypedNavigate()
	const pathname = usePathname()

	// eslint-disable-next-line complexity
	return useCallback(async (successResponse: CredentialResponse): Promise<void> => {
		try {
			authClass.setAuthenticating(true)
			if (
				isUndefined(successResponse.credential) ||
				isUndefined(successResponse.clientId) ||
				typeof window === "undefined"
			) return

			const siteTheme = personalInfoClass.defaultSiteTheme

			const googleCallbackResponse = await blueDotApiClient.authDataService.googleLoginCallback(
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
				return navigate("/register-google") // Smooth navigation, no refresh
			}

			personalInfoClass.setRetrievedPersonalData(googleCallbackResponse.data.personalInfo)
			teacherClass.setTeacherData(googleCallbackResponse.data.teacherData)
			const classroomInfo = googleCallbackResponse.data.studentClasses.map((classroom): StudentClassroomDataWithHubs => ({
				...classroom,
				activeHubs: classroom.activeHubs.map((hub): ExtendedStudentViewHubData => ({ ...hub, isHubJoined: false }))
			}))
			studentClass.setRetrievedStudentData(classroomInfo)
			void serialConnectionManagerClass.checkAndAutoConnectIfLoggedIn()

			// ✅ Navigate smoothly if on auth pages (no refresh)
			if (pathname === "/login" || pathname === "/register") {
				navigate(PageToNavigateAfterLogin)
			}
			// If on other pages (like /garage), stay where you are - auth state update will show correct content
		} catch (error) {
			console.error(error)
		} finally {
			authClass.setAuthenticating(false)
		}
	}, [navigate, pathname])
}

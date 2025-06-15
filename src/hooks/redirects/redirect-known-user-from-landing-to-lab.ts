"use client"

import { useEffect } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import authClass from "../../classes/auth-class"
import { usePersonalInfoContext } from "../../classes/personal-info-context"
import { PageToNavigateAfterLogin } from "../../utils/constants"

export default function useRedirectKnownUserToLab (): void {
	const navigate = useTypedNavigate()
	const personalInfoClass = usePersonalInfoContext()

	useEffect(() => {
		if (!authClass.isLoggedIn) return
		if (!personalInfoClass.username) return navigate("/register-username")
		return navigate(PageToNavigateAfterLogin)
	}, [authClass.isAuthenticating, authClass.isLoggedIn, navigate, personalInfoClass.username])
}

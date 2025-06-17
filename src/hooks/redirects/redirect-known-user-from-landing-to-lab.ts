"use client"

import { useEffect } from "react"
import authClass from "../../classes/auth-class"
import useTypedNavigate from "../navigate/typed-navigate"
import { PageToNavigateAfterLogin } from "../../utils/constants"
import personalInfoClass from "../../classes/personal-info-class"

export default function useRedirectKnownUserToLab(): void {
	const navigate = useTypedNavigate()

	useEffect(() => {
		if (!authClass.isLoggedIn) return
		if (!personalInfoClass.username) return navigate("/register-username")
		return navigate(PageToNavigateAfterLogin)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authClass.isAuthenticating, authClass.isLoggedIn, navigate, personalInfoClass.username])
}

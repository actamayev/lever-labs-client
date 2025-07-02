"use client"

import { useEffect } from "react"
import authClass from "../../classes/auth-class"
import useTypedNavigate from "../navigate/typed-navigate"
import personalInfoClass from "../../classes/personal-info-class"
import { PageToNavigateAfterLogin } from "../../utils/constants/page-constants"

export default function useRedirectKnownUserToLab(): void {
	const navigate = useTypedNavigate()

	useEffect(() => {
		if (!authClass.isLoggedIn) return
		if (!personalInfoClass.username) return navigate("/register-google")
		return navigate(PageToNavigateAfterLogin)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authClass.isAuthenticating, authClass.isLoggedIn, navigate, personalInfoClass.username])
}

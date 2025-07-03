"use client"

import isNull from "lodash-es/isNull"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import authClass from "../../classes/auth-class"
import useTypedNavigate from "../navigate/typed-navigate"
import personalInfoClass from "../../classes/personal-info-class"

// This hook exists to make sure that Google users who have not registered their username are unable to go to private pages
export default function useRedirectBackToRegisterGoogle(): void {
	const pathname = usePathname()
	const navigate = useTypedNavigate()

	useEffect(() => {
		if (
			authClass.isFinishedWithSignup === true || // If the user is logged in and has a username, no need to re-direct
			isNull(personalInfoClass.email) // If the user doesn't have an email, no need to re-direct
		) return

		navigate("/register-google")
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, navigate, authClass.isFinishedWithSignup, personalInfoClass.email])
}

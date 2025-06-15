"use client"

import { useEffect } from "react"
import isNull from "lodash-es/isNull"
import { usePathname } from "next/navigation"
import { PageToNavigateAfterLogin, PrivatePageNames } from "../../utils/constants"
import useTypedNavigate from "../navigate/typed-navigate"
import authClass from "../../classes/auth-class"
import personalInfoClass from "../../classes/personal-info-class"

export default function useRedirectKnownUser(): void {
	const navigate = useTypedNavigate()
	const pathname = usePathname()

	useEffect(() => {
		const isPrivatePage = PrivatePageNames.some(privatePath =>
			pathname.startsWith(privatePath)
		)
		// if the user is logged in and has a username, go to lab
		if (
			authClass.isLoggedIn === false ||
			isNull(personalInfoClass.username) ||
			authClass.isAuthenticating === true ||
			isPrivatePage
		) return

		navigate(PageToNavigateAfterLogin)
	}, [authClass.isAuthenticating, authClass.isLoggedIn, pathname, navigate, personalInfoClass.username])
}

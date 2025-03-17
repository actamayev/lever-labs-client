"use client"

import isNull from "lodash-es/isNull"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { PrivatePageNames } from "../../utils/constants"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

// This hook exists to make sure that Google users who have not registered their username are unable to go to private pages
export default function useRedirectBackToRegisterUsername(): void {
	const authClass = useAuthContext()
	const personalInfoClass = usePersonalInfoContext()
	const pathname = usePathname()
	const navigate = useTypedNavigate()

	useEffect(() => {
		// If the user isn't logged in, no need to re-direct (return)
		if (authClass.isLoggedIn === false) return
		// If the user already has a username, no need to re-direct (return)
		if (!isNull(personalInfoClass.username) || isNull(personalInfoClass.email)) return
		// Check if the current path starts with any of the private page roots

		if (isNull(pathname)) return
		const isPrivatePage = PrivatePageNames.some(root =>
			pathname === root || pathname.startsWith(`${root}/`)
		)
		// If the user isn't trying to access a private page, no need to re-direct (return)
		if (!isPrivatePage) return

		navigate("/register-username")
	}, [authClass.isLoggedIn, pathname, navigate, personalInfoClass, personalInfoClass.username, personalInfoClass.email])
}

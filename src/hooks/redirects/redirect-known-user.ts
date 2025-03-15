"use client"

import { useEffect } from "react"
import isNull from "lodash-es/isNull"
import { usePathname } from "next/navigation"
import { PrivatePageNames } from "../../utils/constants"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAuthContext } from "../../contexts/auth-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useRedirectKnownUser(): void {
	const authClass = useAuthContext()
	const navigate = useTypedNavigate()
	const personalInfoClass = usePersonalInfoContext()
	const pathName = usePathname()

	useEffect(() => {
		// Add early return if pathName is null
		if (pathName === null) return

		const isPrivatePage = PrivatePageNames.some(privatePath =>
			pathName.startsWith(privatePath)
		)
		// if the user is logged in and has a username, go to lab
		if (
			authClass.isLoggedIn === false ||
			isNull(personalInfoClass.username) ||
			authClass.isAuthenticating === true ||
			isPrivatePage
		) return

		navigate("/lab")
	}, [authClass.isAuthenticating, authClass.isLoggedIn, pathName, navigate, personalInfoClass.username])
}

"use client"

import isNull from "lodash-es/isNull"
import useTypedNavigate from "../navigate/typed-navigate"
import { useEffect } from "react"
import authClass from "../../classes/auth-context"
import { usePersonalInfoContext } from "../../classes/personal-info-context"
import { PageToNavigateAfterLogin } from "../../utils/constants"

export default function useRedirectUserWithUsername (): void  {
	const personalInfoClass = usePersonalInfoContext()
	const navigate = useTypedNavigate()

	useEffect(() => {
		if (authClass.isLoggedIn === false) {
			return navigate("/")
		}
		if (isNull(personalInfoClass.username)) return
		navigate(PageToNavigateAfterLogin)
	}, [authClass.isLoggedIn, navigate, personalInfoClass, personalInfoClass.username])
}

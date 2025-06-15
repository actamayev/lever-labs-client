"use client"

import isNull from "lodash-es/isNull"
import useTypedNavigate from "../navigate/typed-navigate"
import { useEffect } from "react"
import authClass from "../../classes/auth-class"
import personalInfoClass from "../../classes/personal-info-class"
import { PageToNavigateAfterLogin } from "../../utils/constants"

export default function useRedirectUserWithUsername (): void  {
	const navigate = useTypedNavigate()

	useEffect(() => {
		if (authClass.isLoggedIn === false) {
			return navigate("/")
		}
		if (isNull(personalInfoClass.username)) return
		navigate(PageToNavigateAfterLogin)
	}, [authClass.isLoggedIn, navigate, personalInfoClass, personalInfoClass.username])
}

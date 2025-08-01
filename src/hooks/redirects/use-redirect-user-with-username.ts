"use client"

import isNull from "lodash-es/isNull"
import { useEffect } from "react"
import authClass from "../../classes/auth-class"
import useTypedNavigate from "../navigate/use-typed-navigate"
import { PageToNavigateAfterLogin } from "../../utils/constants/page-constants"
import personalInfoClass from "../../classes/personal-info-class"

export default function useRedirectUserWithUsername(): void  {
	const navigate = useTypedNavigate()

	useEffect(() => {
		if (authClass.isLoggedIn === false) {
			return navigate("/")
		}
		if (isNull(personalInfoClass.username)) return
		navigate(PageToNavigateAfterLogin)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigate, authClass.isLoggedIn, personalInfoClass.username])
}

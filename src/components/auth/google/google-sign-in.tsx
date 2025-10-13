"use client"

import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import useGoogleAuthCallback from "../../../hooks/google-auth/use-google-auth-callback"
import { isNull, isUndefined } from "lodash-es"
import { useCallback } from "react"
import { PageToNavigateAfterLogin } from "../../../utils/constants/page-constants"
import useTypedNavigate from "../../../hooks/navigate/use-typed-navigate"
import { usePathname } from "next/navigation"

export default function GoogleSignIn(): React.ReactNode {
	const googleAuthCallback = useGoogleAuthCallback()
	const navigate = useTypedNavigate()
	const pathname = usePathname()

	const onSuccess = useCallback(async (successResponse: CredentialResponse): Promise<void> => {
		const response = await googleAuthCallback(successResponse)
		if (isNull(response) || (pathname !== "/login" && pathname !== "/register")) return
		if (response.isNewUser === true || isUndefined(response.personalInfo)) {
			navigate("/register-google")
			return
		}
		navigate(PageToNavigateAfterLogin)
	}, [googleAuthCallback, navigate, pathname])

	return (
		<div className="flex justify-center">
			<GoogleLogin
				onSuccess={onSuccess}
				onError={(): void => console.error("Login Failed")}
				shape="pill"
				width={300}
				text="continue_with"
				logo_alignment="center"
			/>
		</div>
	)
}

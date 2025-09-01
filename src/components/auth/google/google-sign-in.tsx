"use client"

import { GoogleLogin } from "@react-oauth/google"
import useGoogleAuthCallback from "../../../hooks/google-auth/use-google-auth-callback"

export default function GoogleSignIn(): React.ReactNode {
	const googleAuthCallback = useGoogleAuthCallback()

	return (
		<div className="flex justify-center">
			<GoogleLogin
				onSuccess={googleAuthCallback}
				onError={(): void => console.error("Login Failed")}
				shape="pill"
				width={300}
				text="continue_with"
				logo_alignment="center"
			/>
		</div>
	)
}

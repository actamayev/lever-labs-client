"use client"

import { GoogleLogin } from "@react-oauth/google"
import useGoogleAuthCallback from "../../../hooks/auth/google/google-auth-callback"

export default function GoogleSignIn() {
	const googleAuthCallback = useGoogleAuthCallback()

	return (
		<div className="flex justify-center">
			<GoogleLogin
				onSuccess={googleAuthCallback}
				onError={() => console.error("Login Failed")}
				shape="pill"
				width={300}
				text="continue_with"
				logo_alignment="center"
			/>
		</div>
	)
}

import { observer } from "mobx-react"
import { GoogleLogin } from "@react-oauth/google"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"
import useGoogleAuthCallback from "../../../hooks/auth/google/google-auth-callback"

interface Props {
	whereToNavigate: PageNames
}

function GoogleSignIn(props: Props) {
	const { whereToNavigate } = props
	const googleAuthCallback = useGoogleAuthCallback(whereToNavigate)
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<div className="flex justify-center">
			<GoogleLogin
				onSuccess={googleAuthCallback}
				onError={() => console.error("Login Failed")}
				shape="rectangular"
				width={200}
				theme={defaultSiteTheme === "dark" ? "outline" : "filled_black"}
				text="continue_with"
				logo_alignment="center"
			/>
		</div>
	)
}

export default observer(GoogleSignIn)

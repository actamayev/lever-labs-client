import Login from "../../components/auth/login/login"
import PageHelmet from "../../components/helmet/page-helmet"

export default function LoginPage() {
	return (
		<>
			<PageHelmet pageTitle="/login" />
			<Login whereToNavigate="/lab/welcome"/>
		</>
	)
}

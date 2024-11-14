import Login from "../../components/auth/login"
import PageHelmet from "../../components/helmet/page-helmet"

export default function LoginPage() {
	return (
		<>
			<PageHelmet pageTitle="/login" />
			<Login whereToNavigate="/garage"/>
		</>
	)
}

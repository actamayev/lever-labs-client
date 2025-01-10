import Register from "../../components/auth/register/register"
import PageHelmet from "../../components/helmet/page-helmet"

export default function RegisterPage() {
	return (
		<>
			<PageHelmet pageTitle="/register" />
			<Register whereToNavigate="/lab/welcome" />
		</>
	)
}

import { useState } from "react"
import Button from "../button"
import ContactInput from "./contact-input"
import ErrorMessage from "../error-message"
import SubLoginInfo from "./sub-login-info"
import PasswordInput from "./password-input"
import GoogleSignIn from "./google/google-sign-in"
import AuthTemplate from "../templates/auth-template"
import useLoginSubmit from "../../hooks/auth/login-submit"
import useRedirectKnownUser from "../../hooks/redirects/redirect-known-user"

interface Props {
	whereToNavigate: PageNames
	setLoginOrRegister?: React.Dispatch<React.SetStateAction<LoginOrRegister>>
	customStyles?: object
}

export default function Login(props: Props) {
	const { whereToNavigate, setLoginOrRegister, customStyles = { width: "32%" } } = props
	useRedirectKnownUser()
	const [loginInformation, setLoginInformation] = useState<LoginCredentials>({
		contact: "",
		password: ""
	})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const loginSubmit = useLoginSubmit(whereToNavigate, loginInformation, setError, setLoading)

	const createSetCredentialsFunction = (setter: React.Dispatch<React.SetStateAction<LoginCredentials>>) => {
		return (newCredentials: Partial<LoginCredentials | RegisterCredentials>) => {
			setter(prevState => ({ ...prevState, ...newCredentials as Partial<LoginCredentials> }))
		}
	}

	return (
		<div>
			<AuthTemplate title="Login" customStyles={customStyles}>
				<form onSubmit={loginSubmit} className="mb-3">
					<ContactInput
						loginInformation={loginInformation}
						setLoginInformation={setLoginInformation}
					/>

					<PasswordInput
						credentials = {loginInformation}
						setCredentials = {createSetCredentialsFunction(setLoginInformation)}
					/>

					<ErrorMessage error={error} />

					<Button
						title="Login"
						className="mt-3 w-full font-semibold text-lg text-white"
						colorClass="bg-blue-600"
						hoverClass="hover:bg-blue-700"
						disabled={loading}
					/>
				</form>
				<SubLoginInfo setLoginOrRegister={setLoginOrRegister}/>
			</AuthTemplate>
			<div className="mt-4">
				<GoogleSignIn whereToNavigate = {whereToNavigate}/>
			</div>
		</div>
	)
}

import { useState } from "react"
import Button from "../button"
import EmailInput from "./email-input"
import ErrorMessage from "../error-message"
import PasswordInput from "./password-input"
import UsernameInput from "./username-input"
import ConfirmPassword from "./confirm-password"
import SubRegisterInfo from "./sub-register-info"
import GoogleSignIn from "./google/google-sign-in"
import AuthTemplate from "../templates/auth-template"
import useRegisterSubmit from "../../hooks/auth/register-submit"
import useRedirectKnownUser from "../../hooks/redirects/redirect-known-user"

interface Props {
	whereToNavigate: PageNames
	setLoginOrRegister?: React.Dispatch<React.SetStateAction<LoginOrRegister>>
	customStyles?: object
}

export default function Register(props: Props) {
	const { whereToNavigate, setLoginOrRegister, customStyles = { width: "32%" }} = props
	useRedirectKnownUser()
	const [registerInformation, setRegisterInformation] = useState<RegisterCredentials>({
		email: "",
		username: "",
		password: "",
		passwordConfirmation: ""
	})
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const registerSubmit = useRegisterSubmit(whereToNavigate, registerInformation, setError, setLoading)

	const createSetCredentialsFunction = (setter: React.Dispatch<React.SetStateAction<RegisterCredentials>>) => {
		return (newCredentials: Partial<LoginCredentials | RegisterCredentials>) => {
			setter(prevState => ({ ...prevState, ...newCredentials as Partial<RegisterCredentials> }))
		}
	}

	return (
		<div>
			<AuthTemplate title="Register" customStyles={customStyles}>
				<form onSubmit={registerSubmit} className="mb-3">
					<UsernameInput
						credentials={registerInformation}
						setCredentials={setRegisterInformation}
					/>

					<EmailInput
						registerInformation={registerInformation}
						setRegisterInformation={setRegisterInformation}
					/>

					<PasswordInput
						credentials = {registerInformation}
						setCredentials = {createSetCredentialsFunction(setRegisterInformation)}
					/>

					<ConfirmPassword
						credentials = {registerInformation}
						setCredentials = {createSetCredentialsFunction(setRegisterInformation)}
					/>

					<Button
						title="Register"
						className="my-3 w-full font-semibold text-lg text-white"
						disabled={loading}
					/>

					<ErrorMessage error={error} />
				</form>
				<SubRegisterInfo setLoginOrRegister = {setLoginOrRegister}/>
			</AuthTemplate>
			<div className="mt-4">
				<GoogleSignIn whereToNavigate={whereToNavigate}/>
			</div>
		</div>
	)
}

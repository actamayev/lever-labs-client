import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/shadcn/ui/form"
import EmailInput from "./email-input"
import UsernameInput from "./username-input"
import ErrorMessage from "../../error-message"
import PasswordField from "../password-input"
import { Button } from "../../shadcn/ui/button"
import SubRegisterInfo from "./sub-register-info"
import GoogleSignIn from "../google/google-sign-in"
import AuthTemplate from "../../templates/auth-template"
import useRegisterSubmit from "../../../hooks/auth/register-submit"
import useRedirectKnownUser from "../../../hooks/redirects/redirect-known-user"
import { RegisterFormValues, registerSchema } from "../../../utils/auth/auth-schemas"

interface Props {
	whereToNavigate: PageNames
	setLoginOrRegister?: React.Dispatch<React.SetStateAction<LoginOrRegister>>
	customStyles?: object
}

export default function Register(props: Props) {
	const { whereToNavigate, setLoginOrRegister } = props
	useRedirectKnownUser()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const registerSubmit = useRegisterSubmit(whereToNavigate, setError, setLoading)

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			username: "",
			password: "",
			passwordConfirmation: ""
		}
	})

	const onSubmit = useCallback(async (values: RegisterFormValues) => {
		await registerSubmit(values)
	}, [registerSubmit])

	return (
		<AuthTemplate title="Register">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mb-3">
					<UsernameInput control={form.control} />

					<EmailInput control={form.control} />

					<PasswordField<RegisterFormValues>
						control={form.control}
						name="password"
						label="Password"
					/>
					<PasswordField<RegisterFormValues>
						control={form.control}
						name="passwordConfirmation"
						label="Confirm Password"
					/>

					<Button
						type="submit"
						className="my-3 w-full font-semibold text-lg text-white"
						disabled={loading}
					>
						Register
					</Button>

					{error && <ErrorMessage error={error} />}
				</form>
			</Form>
			<SubRegisterInfo setLoginOrRegister = {setLoginOrRegister}/>
			<div className="mt-4">
				<GoogleSignIn whereToNavigate={whereToNavigate}/>
			</div>
		</AuthTemplate>
	)
}

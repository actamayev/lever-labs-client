import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import EmailInput from "./email-input"
import OrComponent from "../or-component"
import UsernameInput from "./username-input"
import ErrorMessage from "../../messages/error-message"
import PasswordField from "../password-input"
import { Button } from "../../shadcn/ui/button"
import SubRegisterInfo from "./sub-register-info"
import { Form } from "@/components/shadcn/ui/form"
import GoogleSignIn from "../google/google-sign-in"
import { zodResolver } from "@hookform/resolvers/zod"
import AuthTemplate from "../../templates/auth-template"
import { registerSchema } from "../../../utils/auth/auth-schemas"
import useRegisterSubmit from "../../../hooks/auth/register-submit"
import useRedirectKnownUser from "../../../hooks/redirects/redirect-known-user"

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
		<AuthTemplate title="Create a new account">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
					<UsernameInput control={form.control} />
					<EmailInput control={form.control} />

					<PasswordField<RegisterFormValues>
						control={form.control}
						name="password"
					/>

					<PasswordField<RegisterFormValues>
						control={form.control}
						name="passwordConfirmation"
						placeholder="Confirm Password"
					/>

					<Button
						type="submit"
						className="w-full"
						disabled={loading}
					>
						Create account
					</Button>

					{error && <ErrorMessage error={error} />}

					<OrComponent />

					<div className="grid gap-2">
						<GoogleSignIn whereToNavigate={whereToNavigate} />
					</div>
				</form>
			</Form>

			<div className="mt-4">
				<SubRegisterInfo setLoginOrRegister={setLoginOrRegister} />
			</div>
		</AuthTemplate>
	)
}

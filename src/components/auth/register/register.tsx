import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import EmailInput from "./email-input"
import OrComponent from "../or-component"
import UsernameInput from "./username-input"
import PasswordField from "../password-input"
import { Form } from "@/components/shadcn/ui/form"
import GoogleSignIn from "../google/google-sign-in"
import { zodResolver } from "@hookform/resolvers/zod"
import ErrorMessage from "../../messages/error-message"
import AuthTemplate from "../../templates/auth-template"
import { BlueTactileButton } from "../../tactile-buttons"
import { registerSchema } from "../../../utils/auth/auth-schemas"
import useRegisterSubmit from "../../../hooks/auth/register-submit"
import useRedirectKnownUser from "../../../hooks/redirects/redirect-known-user"

export default function Register() {
	useRedirectKnownUser()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const registerSubmit = useRegisterSubmit(setError, setLoading)

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

					<BlueTactileButton
						type="submit"
						disabled={loading}
						shadowHeight={4}
						className="w-full h-12 my-2"
					>
						CREATE ACCOUNT
					</BlueTactileButton>

					{error && <ErrorMessage error={error} />}

					<OrComponent />

					<div className="grid gap-2">
						<GoogleSignIn />
					</div>
				</form>
			</Form>
		</AuthTemplate>
	)
}

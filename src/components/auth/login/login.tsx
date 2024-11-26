import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/shadcn/ui/form"
import { Button } from "@/components/shadcn/ui/button"
import ErrorMessage from "../../error-message"
import SubLoginInfo from "./sub-login-info"
import GoogleSignIn from "../google/google-sign-in"
import AuthTemplate from "../../templates/auth-template"
import useLoginSubmit from "../../../hooks/auth/login-submit"
import useRedirectKnownUser from "../../../hooks/redirects/redirect-known-user"
import ContactInput from "./contact-input"
import PasswordField from "../password-input"
import { LoginFormValues, loginSchema } from "../../../utils/auth/auth-schemas"

interface Props {
	whereToNavigate: PageNames
	setLoginOrRegister?: React.Dispatch<React.SetStateAction<LoginOrRegister>>
	customStyles?: object
}

export default function Login(props: Props) {
	const { whereToNavigate, setLoginOrRegister, customStyles = { width: "32%" } } = props
	useRedirectKnownUser()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const loginSubmit = useLoginSubmit(whereToNavigate, setError, setLoading)

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			contact: "",
			password: ""
		}
	})

	const onSubmit = useCallback(async (values: LoginFormValues) => {
		await loginSubmit(values)
	}, [loginSubmit])

	return (
		<AuthTemplate title="Login" customStyles={customStyles}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mb-3">
					<ContactInput control={form.control} />

					<PasswordField<LoginFormValues>
						control={form.control}
						name="password"
						label="Password"
					/>

					<Button
						type="submit"
						className="my-3 w-full font-semibold text-lg"
						disabled={loading}
					>
						Login
					</Button>

					{error && <ErrorMessage error={error} />}
				</form>
			</Form>
			<SubLoginInfo setLoginOrRegister={setLoginOrRegister}/>
			<div className="mt-4">
				<GoogleSignIn whereToNavigate={whereToNavigate}/>
			</div>
		</AuthTemplate>
	)
}

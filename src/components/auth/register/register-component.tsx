"use client"

import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import { Form } from "@/components/ui/form"
import AgeInput from "./age-input"
import EmailInput from "./email-input"
import OrComponent from "../or-component"
import UsernameInput from "./username-input"
import PasswordField from "../password-input"
import GoogleSignIn from "../google/google-sign-in"
import { zodResolver } from "@hookform/resolvers/zod"
import AuthButton from "../../buttons/generic-buttons"
import ErrorMessage from "../../messages/error-message"
import AuthTemplate from "../../templates/auth-template"
import registerSubmit from "../../../utils/auth/submit/register-submit"
import { registerSchema } from "../../../utils/auth/auth-schemas"
import { PageToNavigateAfterLogin } from "../../../utils/constants/page-constants"
import TermsAndPrivacyAgreement from "../terms-and-privacy-agreement"
import useTypedNavigate from "../../../hooks/navigate/use-typed-navigate"
import { usePathname } from "next/navigation"

export default function RegisterComponent(): React.ReactNode {
	const [error, setError] = useState("")
	const navigate = useTypedNavigate()
	const pathname = usePathname()

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			age: null,
			email: "",
			username: "",
			password: "",
		}
	})

	const onSubmit = useCallback(async (values: RegisterFormValues): Promise<void> => {
		const success = await registerSubmit(values, setError)
		if (success === false || pathname !== "/register") return
		navigate(PageToNavigateAfterLogin)
	}, [navigate, pathname])

	return (
		<AuthTemplate title="Create a new account">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
					<AgeInput control={form.control} />
					<UsernameInput control={form.control} />
					<EmailInput control={form.control} />

					<PasswordField<RegisterFormValues>
						control={form.control}
						name="password"
					/>

					<AuthButton	title="CREATE ACCOUNT" />

					{error && <ErrorMessage error={error} />}

					<OrComponent />

					<div className="grid gap-2">
						<GoogleSignIn />
					</div>
				</form>
			</Form>
			<TermsAndPrivacyAgreement />
		</AuthTemplate>
	)
}

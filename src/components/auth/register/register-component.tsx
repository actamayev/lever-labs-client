"use client"

import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import EmailInput from "./email-input"
import OrComponent from "../or-component"
import UsernameInput from "./username-input"
import PasswordField from "../password-input"
import { Form } from "@/components/shadcn/ui/form"
import GoogleSignIn from "../google/google-sign-in"
import { zodResolver } from "@hookform/resolvers/zod"
import AuthButton from "../../buttons/generic-buttons"
import ErrorMessage from "../../messages/error-message"
import AuthTemplate from "../../templates/auth-template"
import { registerSchema } from "../../../utils/auth/auth-schemas"
import useRegisterSubmit from "../../../hooks/auth/register-submit"
import TermsAndPrivacyAgreement from "../terms-and-privacy-agreement"
import AgeInput from "./age-input"

export default function RegisterComponent() {
	const [error, setError] = useState("")
	const registerSubmit = useRegisterSubmit(setError)

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			age: null,
			email: "",
			username: "",
			password: "",
		}
	})

	const onSubmit = useCallback(async (values: RegisterFormValues) => {
		await registerSubmit(values)
	}, [registerSubmit])

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

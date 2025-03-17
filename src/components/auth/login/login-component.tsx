"use client"

import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import { Form } from "@/components/shadcn/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import OrComponent from "../or-component"
import ContactInput from "./contact-input"
import PasswordField from "../password-input"
import GoogleSignIn from "../google/google-sign-in"
import AuthButton from "../../buttons/generic-buttons"
import ErrorMessage from "../../messages/error-message"
import AuthTemplate from "../../templates/auth-template"
import useLoginSubmit from "../../../hooks/auth/login-submit"
import { loginSchema } from "../../../utils/auth/auth-schemas"

export default function LoginComponent() {
	const [error, setError] = useState("")
	const loginSubmit = useLoginSubmit(setError)

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
		<AuthTemplate title="Log in">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
					<ContactInput control={form.control} />
					<PasswordField<LoginFormValues>
						control={form.control}
						name="password"
						// showForgotPassword={true}
					/>
					<AuthButton title="LOG IN" />

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

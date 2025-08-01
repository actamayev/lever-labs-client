"use client"

import { useForm } from "react-hook-form"
import { usePathname } from "next/navigation"
import { useCallback, useState } from "react"
import { Form } from "@/components/shadcn/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginRequest } from "@bluedotrobots/common-ts"
import OrComponent from "../or-component"
import ContactInput from "./contact-input"
import PasswordField from "../password-input"
import GoogleSignIn from "../google/google-sign-in"
import AuthButton from "../../buttons/generic-buttons"
import ErrorMessage from "../../messages/error-message"
import AuthTemplate from "../../templates/auth-template"
import loginSubmit from "../../../utils/auth/submit/login-submit"
import { loginSchema } from "../../../utils/auth/auth-schemas"
import TermsAndPrivacyAgreement from "../terms-and-privacy-agreement"
import useTypedNavigate from "../../../hooks/navigate/use-typed-navigate"
import { PageToNavigateAfterLogin } from "../../../utils/constants/page-constants"

export default function LoginComponent() {
	const [error, setError] = useState("")
	const navigate = useTypedNavigate()
	const pathname = usePathname()

	const form = useForm<LoginRequest>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			contact: "",
			password: ""
		}
	})

	const onSubmit = useCallback(async (values: LoginRequest) => {
		const success = await loginSubmit(values, setError)
		if (success === false) return
		if (pathname === "/login") navigate(PageToNavigateAfterLogin)
	}, [navigate, pathname])

	return (
		<AuthTemplate title="Log in">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
					<ContactInput control={form.control} />
					<PasswordField<LoginRequest>
						control={form.control}
						name="password"
					/>
					<AuthButton title="LOG IN" />

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

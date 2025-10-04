"use client"

import { useForm } from "react-hook-form"
import { usePathname } from "next/navigation"
import { useCallback, useState } from "react"
import { Form } from "@/components/shadcn/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginRequest } from "@lever-labs/common-ts/types/api"
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
import { isEmpty, isNull } from "lodash-es"

export default function LoginComponent(): React.ReactNode {
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

	const onSubmit = useCallback(async (values: LoginRequest): Promise<void> => {
		const response = await loginSubmit(values, setError)
		if (isNull(response) || pathname !== "/login") return
		if (response.teacherData && response.teacherData.isApproved === true) {
			navigate("/class-manager")
			return
		}
		if (!isEmpty(response.studentClasses)) {
			navigate("/whiteboard")
			return
		}
		navigate(PageToNavigateAfterLogin)
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

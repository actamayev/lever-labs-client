"use client"

import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../../shadcn/ui/form"
import AgeInput from "../register/age-input"
import AuthButton from "../../buttons/generic-buttons"
import UsernameInput from "../register/username-input"
import ErrorMessage from "../../messages/error-message"
import AuthTemplate from "../../templates/auth-template"
import useTypedNavigate from "../../../hooks/navigate/use-typed-navigate"
import { registerUsernameSchema } from "../../../utils/auth/auth-schemas"
import registerGoogleInfo from "../../../utils/auth/google/register-google-info"
import { PageToNavigateAfterLogin } from "../../../utils/constants/page-constants"

export default function RegisterGoogleInfoComponent() {
	const [error, setError] = useState("")
	const navigate = useTypedNavigate()

	const form = useForm<NewGoogleInfoFormValues>({
		resolver: zodResolver(registerUsernameSchema),
		defaultValues: {
			username: "",
			age: null
		}
	})

	const onSubmit = useCallback(async (values: NewGoogleInfoFormValues) => {
		const success = await registerGoogleInfo(values, setError)
		if (success === false) return
		navigate(PageToNavigateAfterLogin)
	}, [navigate])

	return (
		<AuthTemplate title="Choose your username">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
					<AgeInput control={form.control} />
					<UsernameInput control={form.control} />

					<AuthButton title="CONTINUE" />

					{error && <ErrorMessage error={error} />}
				</form>
			</Form>
		</AuthTemplate>
	)
}

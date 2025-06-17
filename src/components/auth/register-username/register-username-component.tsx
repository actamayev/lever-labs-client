"use client"

import { useForm } from "react-hook-form"
import { useCallback, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { NewUsernameRequest } from "@bluedotrobots/common-ts"
import { Form } from "../../shadcn/ui/form"
import AuthButton from "../../buttons/generic-buttons"
import UsernameInput from "../register/username-input"
import ErrorMessage from "../../messages/error-message"
import AuthTemplate from "../../templates/auth-template"
import { PageToNavigateAfterLogin } from "../../../utils/constants"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import usernameSubmit from "../../../utils/auth/google/username-submit"
import { registerUsernameSchema } from "../../../utils/auth/auth-schemas"

export default function RegisterUsernameComponent() {
	const [error, setError] = useState("")
	const navigate = useTypedNavigate()

	const form = useForm<NewUsernameRequest>({
		resolver: zodResolver(registerUsernameSchema),
		defaultValues: {
			username: ""
		}
	})

	const username = form.watch("username")
	const isDisabled = useMemo(() => username.length < 4, [username])

	const onSubmit = useCallback(async (values: NewUsernameRequest) => {
		const success = await usernameSubmit(values.username, setError)
		if (success === false) return
		navigate(PageToNavigateAfterLogin)
	}, [navigate])

	return (
		<>
			<AuthTemplate title="Choose your username">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
						<UsernameInput control={form.control} />

						<AuthButton loading={isDisabled} title="CONTINUE" />

						{error && <ErrorMessage error={error} />}
					</form>
				</Form>
			</AuthTemplate>
		</>
	)
}

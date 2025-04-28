"use client"

import { useForm } from "react-hook-form"
import { useCallback, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../../shadcn/ui/form"
import AuthButton from "../../buttons/generic-buttons"
import ErrorMessage from "../../messages/error-message"
import AuthTemplate from "../../templates/auth-template"
import UsernameInput from "../register/username-input"
import { registerUsernameSchema } from "../../../utils/auth/auth-schemas"
import useUsernameSubmit from "../../../hooks/auth/google/username-submit"
import { NewUsernameRequest } from "@bluedotrobots/common-ts"

export default function RegisterUsernameComponent() {
	const [error, setError] = useState("")
	const usernameSubmit = useUsernameSubmit(setError)

	const form = useForm<NewUsernameRequest>({
		resolver: zodResolver(registerUsernameSchema),
		defaultValues: {
			username: ""
		}
	})

	const username = form.watch("username")
	const isDisabled = useMemo(() => username.length < 4, [username])

	const onSubmit = useCallback(async (values: NewUsernameRequest) => {
		await usernameSubmit(values.username)
	}, [usernameSubmit])

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

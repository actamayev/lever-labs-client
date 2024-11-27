import _ from "lodash"
import { useForm } from "react-hook-form"
import { useCallback, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../../components/shadcn/ui/form"
import ErrorMessage from "../../components/error-message"
import { Button } from "../../components/shadcn/ui/button"
import PageHelmet from "../../components/helmet/page-helmet"
import AuthTemplate from "../../components/templates/auth-template"
import { registerUsernameSchema } from "../../utils/auth/auth-schemas"
import useUsernameSubmit from "../../hooks/auth/google/username-submit"
import UsernameInput from "../../components/auth/register/username-input"
import useRedirectUserWithUsername from "../../hooks/redirects/redirect-user-with-username"

export default function RegisterUsername() {
	useRedirectUserWithUsername()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const usernameSubmit = useUsernameSubmit(setError, setLoading)

	const form = useForm<RegisterUsernameFormValues>({
		resolver: zodResolver(registerUsernameSchema),
		defaultValues: {
			username: ""
		}
	})

	const username = form.watch("username")
	const isDisabled = useMemo(() => {
		return username.length < 4
	}, [username])

	const onSubmit = useCallback(async (values: RegisterUsernameFormValues) => {
		await usernameSubmit(values.username)
	}, [usernameSubmit])

	return (
		<>
			<PageHelmet pageTitle="/register-username" />
			<AuthTemplate title="Choose your username">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
						<UsernameInput control={form.control} />

						<Button
							type="submit"
							className="w-full"
							disabled={loading || isDisabled}
						>
							{_.isEmpty(username) ? "Continue" : `Continue as ${username}`}
						</Button>

						{error && <ErrorMessage error={error} />}
					</form>
				</Form>
			</AuthTemplate>
		</>
	)
}

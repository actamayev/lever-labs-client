import { observer } from "mobx-react"
import { useForm } from "react-hook-form"
import { useCallback, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../../components/shadcn/ui/form"
import { Button } from "../../components/shadcn/ui/button"
import PageHelmet from "../../components/helmet/page-helmet"
import ErrorMessage from "../../components/messages/error-message"
import AuthTemplate from "../../components/templates/auth-template"
import { registerUsernameSchema } from "../../utils/auth/auth-schemas"
import useUsernameSubmit from "../../hooks/auth/google/username-submit"
import UsernameInput from "../../components/auth/register/username-input"
import useRedirectUserWithUsername from "../../hooks/redirects/redirect-user-with-username"

function RegisterUsername() {
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
	const isDisabled = useMemo(() => username.length < 4, [username])

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
							className="w-full h-12 rounded-2xl my-2 bg-pipTheme hover:bg-pipThemeHover dark:text-white"
							disabled={loading || isDisabled}
						>
							CONTINUE
						</Button>

						{error && <ErrorMessage error={error} />}
					</form>
				</Form>
			</AuthTemplate>
		</>
	)
}

export default observer(RegisterUsername)

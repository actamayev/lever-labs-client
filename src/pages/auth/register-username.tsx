import _ from "lodash"
import { useForm } from "react-hook-form"
import { useCallback, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../components/shadcn/ui/input"
import ErrorMessage from "../../components/error-message"
import { Button } from "../../components/shadcn/ui/button"
import PageHelmet from "../../components/helmet/page-helmet"
import AuthTemplate from "../../components/templates/auth-template"
import { registerUsernameSchema } from "../../utils/auth/auth-schemas"
import useUsernameSubmit from "../../hooks/auth/google/username-submit"
import useHandleTypeUsername from "../../hooks/handle-type-validation/handle-type-username"
import useRedirectUserWithUsername from "../../hooks/redirects/redirect-user-with-username"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/shadcn/ui/form"

export default function RegisterUsername() {
	useRedirectUserWithUsername()
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const usernameSubmit = useUsernameSubmit(setError, setLoading)
	const handleTypeUsername = useHandleTypeUsername()

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
		await usernameSubmit(values)
	}, [usernameSubmit])

	return (
		<>
			<PageHelmet pageTitle="/register-username" />
			<AuthTemplate title="Register Username">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="mb-3">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem className="mb-4">
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder="abc123"
											{...field}
											onChange={(event) => {
												const sanitizedValue = handleTypeUsername(event)
												field.onChange(sanitizedValue)
											}}
											maxLength={100}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="my-3 w-full font-semibold text-lg text-white dark:text-black"
							disabled={loading || isDisabled}
						>
							{_.isEmpty(username) ? "Register username" : `Register ${username}`}
						</Button>

						{error && <ErrorMessage error={error} /> }
					</form>
				</Form>
			</AuthTemplate>
		</>
	)
}

"use client"

import Link from "next/link"
import { observer } from "mobx-react"
import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import GoogleSignIn from "../google/google-sign-in"
import OrComponent from "../or-component"
import ErrorMessage from "../../messages/error-message"
import registerSubmit from "../../../utils/auth/submit/register-submit"
import { registerSchema } from "../../../utils/auth/auth-schemas"
import { PageToNavigateAfterLogin } from "../../../utils/constants/page-constants"
import useTypedNavigate from "../../../hooks/navigate/use-typed-navigate"
import { usePathname } from "next/navigation"
import AgeInput from "../age-input"
import UsernameInput from "../username-input"
import PasswordField from "../password-input"
import AuthButton from "../../buttons/auth-button"
import { zodResolver } from "@hookform/resolvers/zod"
import authClass from "../../../classes/auth-class"
import AuthTemplate from "../auth-template"

function RegisterComponent(): React.ReactNode {
	const [error, setError] = useState("")
	const navigate = useTypedNavigate()
	const pathname = usePathname()

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			age: null,
			email: "",
			username: "",
			password: "",
		}
	})

	const onSubmit = useCallback(async (values: RegisterFormValues): Promise<void> => {
		const success = await registerSubmit(values, setError)
		if (success === false || pathname !== "/register") return
		navigate(PageToNavigateAfterLogin)
	}, [navigate, pathname])


	return (
		<AuthTemplate>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
					<div className="flex flex-col items-center text-center">
						<h1 className="text-2xl font-bold">Create your account</h1>
					</div>

					{error && <ErrorMessage error={error} />}

					<AgeInput control={form.control} />

					<UsernameInput control={form.control} />

					<div className="grid gap-2">
						<FormField
							control={form.control}
							name="email"
							render={({ field }): React.ReactElement => {
								const ageValue = form.watch("age")
								const placeholder = ageValue && ageValue < 13 ? "Parent's email" : "Email"

								return (
									<FormItem>
										<FormControl>
											<Input
												id="email"
												type="email"
												placeholder={placeholder}
												{...field}
												maxLength={100}
												required
												// eslint-disable-next-line max-len
												className="w-full h-12 rounded-xl text-xl! font-light border-2 bg-polar shadow-none border-swan"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>

					<PasswordField control={form.control} name={"password"} />

					<AuthButton title="CREATE ACCOUNT" />

					<OrComponent />

					<GoogleSignIn />

					<div className="text-center text-sm">
						Already have an account?{" "}
						{pathname === "/register" ? (
							<Link href="/login" className="underline underline-offset-4">
								Login
							</Link>
						) : (
							<button
								type="button"
								onClick={(): void => authClass.setShowLoginOrRegister("Login")}
								className="underline underline-offset-4"
							>
								Login
							</button>
						)}
					</div>
				</form>
			</Form>
		</AuthTemplate>
	)
}

export default observer(RegisterComponent)

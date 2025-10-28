"use client"

import { observer } from "mobx-react"
import { useForm } from "react-hook-form"
import { usePathname } from "next/navigation"
import { useCallback, useState } from "react"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginRequest } from "@lever-labs/common-ts/types/api"
import { Input } from "@/components/ui/input"
import AuthButton from "../../buttons/auth-button"
import Link from "next/link"
import GoogleSignIn from "../google/google-sign-in"
import OrComponent from "../or-component"
import ErrorMessage from "../../messages/error-message"
import loginSubmit from "../../../utils/auth/submit/login-submit"
import { loginSchema } from "../../../utils/auth/auth-schemas"
import useTypedNavigate from "../../../hooks/navigate/use-typed-navigate"
import { PageToNavigateAfterLogin } from "../../../utils/constants/page-constants"
import authClass from "../../../classes/auth-class"
import PasswordField from "../password-input"
import AuthTemplate from "../auth-template"

function LoginComponent(): React.ReactNode {
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
		const success = await loginSubmit(values, setError)
		if (success === false || pathname !== "/login") return
		navigate(PageToNavigateAfterLogin)
	}, [navigate, pathname])

	return (
		<AuthTemplate>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
					<div className="flex flex-col items-center text-center">
						<h1 className="text-2xl font-bold">Welcome back</h1>
						<p className="text-balance text-muted-foreground">Sign in to your account</p>
					</div>

					{error && <ErrorMessage error={error} />}

					<div className="grid gap-2">
						<FormField
							control={form.control}
							name="contact"
							render={({ field }): React.ReactElement => (
								<FormItem>
									<FormControl>
										<Input
											id="contact"
											type="text"
											placeholder="Email or Username"
											{...field}
											maxLength={100}
											required

											className="w-full h-12 rounded-xl text-xl! font-light border-2 bg-polar shadow-none border-swan"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<PasswordField control={form.control} name={"password"} />

					<AuthButton title="LOGIN" />

					<OrComponent />

					<GoogleSignIn />

					<div className="text-center text-sm">
						Don&apos;t have an account?{" "}
						{pathname === "/login" ? (
							<Link href="/register" className="underline underline-offset-4">
								<span className="font-semibold">Register</span>
							</Link>
						) : (
							<button
								type="button"
								onClick={(): void => authClass.setShowLoginOrRegister("Register")}
								className="underline underline-offset-4 font-semibold"
							>
								Register
							</button>
						)}
					</div>
				</form>
			</Form>
		</AuthTemplate>

	)
}

export default observer(LoginComponent)

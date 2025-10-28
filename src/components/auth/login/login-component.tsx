"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { usePathname } from "next/navigation"
import { useCallback, useState } from "react"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginRequest } from "@lever-labs/common-ts/types/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { GoogleLogin, CredentialResponse } from "@react-oauth/google"
import useGoogleAuthCallback from "../../../hooks/google-auth/use-google-auth-callback"
import { isNull, isUndefined } from "lodash-es"
import OrComponent from "../or-component"
import ErrorMessage from "../../messages/error-message"
import loginSubmit from "../../../utils/auth/submit/login-submit"
import { loginSchema } from "../../../utils/auth/auth-schemas"
import useTypedNavigate from "../../../hooks/navigate/use-typed-navigate"
import { PageToNavigateAfterLogin } from "../../../utils/constants/page-constants"
import TermsAndPrivacyAgreement from "../terms-and-privacy-agreement"
import authClass from "../../../classes/auth-class"
import { observer } from "mobx-react"

// eslint-disable-next-line max-lines-per-function
function LoginComponent(): React.ReactNode {
	const [error, setError] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useTypedNavigate()
	const pathname = usePathname()
	const googleAuthCallback = useGoogleAuthCallback()

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

	const onGoogleSuccess = useCallback(async (successResponse: CredentialResponse): Promise<void> => {
		const response = await googleAuthCallback(successResponse)
		if (isNull(response) || (pathname !== "/login" && pathname !== "/register")) return
		if (response.isNewUser === true || isUndefined(response.personalInfo)) {
			navigate("/register-google")
			return
		}
		navigate(PageToNavigateAfterLogin)
	}, [googleAuthCallback, navigate, pathname])

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link href="/" className="flex items-center gap-2 font-medium">
						<div className="flex size-8 items-center justify-center rounded-md">
							<Image src="/favicon.svg" alt="Lever Labs" width={40} height={40} />
						</div>
						<span className="text-2xl font-bold">Lever Labs</span>
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-sm md:max-w-md">
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
												<FormLabel htmlFor="contact">Email or Username</FormLabel>
												<FormControl>
													<Input
														id="contact"
														type="text"
														placeholder="nikola@tesla.com"
														{...field}
														maxLength={100}
														required
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="grid gap-2">
									<FormField
										control={form.control}
										name="password"
										render={({ field }): React.ReactElement => (
											<FormItem>
												<FormLabel htmlFor="password">Password</FormLabel>
												<FormControl>
													<div className="relative">
														<Input
															id="password"
															type={showPassword ? "text" : "password"}
															{...field}
															value={field.value?.toString() || ""}
															placeholder="Password"
															maxLength={100}
															required
															className="pr-16"
														/>
														<Button
															type="button"
															variant="ghost"
															size="sm"
															className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
															onClick={(): void => setShowPassword(!showPassword)}
														>
															{showPassword ? (
																<EyeOff className="h-4 w-4" />
															) : (
																<Eye className="h-4 w-4" />
															)}
														</Button>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<Button type="submit" className="w-full">Login</Button>

								<OrComponent />

								<div className="flex justify-center">
									<GoogleLogin
										onSuccess={onGoogleSuccess}
										onError={(): void => console.error("Login Failed")}
										shape="pill"
										width={300}
										text="continue_with"
										logo_alignment="center"
									/>
								</div>

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
						<TermsAndPrivacyAgreement />
					</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<Image
					src="/favicon.svg"
					alt="Image"
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
					fill
					priority
				/>
			</div>
		</div>
	)
}

export default observer(LoginComponent)

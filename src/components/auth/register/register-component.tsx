"use client"

import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import Link from "next/link"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { GoogleLogin, CredentialResponse } from "@react-oauth/google"
import useGoogleAuthCallback from "../../../hooks/google-auth/use-google-auth-callback"
import { isNull, isUndefined } from "lodash-es"
import OrComponent from "../or-component"
import ErrorMessage from "../../messages/error-message"
import registerSubmit from "../../../utils/auth/submit/register-submit"
import { registerSchema } from "../../../utils/auth/auth-schemas"
import { PageToNavigateAfterLogin } from "../../../utils/constants/page-constants"
import useTypedNavigate from "../../../hooks/navigate/use-typed-navigate"
import { usePathname } from "next/navigation"
import { handleTypeAge, handleTypeUsername } from "../../../utils/handle-type-validation/handle-type-fields"
import CharacterCounter from "../../character-counter"
import { zodResolver } from "@hookform/resolvers/zod"
import TermsAndPrivacyAgreement from "../terms-and-privacy-agreement"
import Image from "next/image"

// eslint-disable-next-line max-lines-per-function
export default function RegisterComponent(): React.ReactNode {
	const [error, setError] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useTypedNavigate()
	const pathname = usePathname()
	const googleAuthCallback = useGoogleAuthCallback()

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
		<div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-4xl">
				<Card className="overflow-hidden py-0!">
					<CardContent className="grid p-0 md:grid-cols-2">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
								<div className="flex flex-col gap-6">
									<div className="flex flex-col items-center text-center">
										<h1 className="text-2xl font-bold">Create your account</h1>
										<p className="text-balance text-muted-foreground">
											Enter your information below to create your account
										</p>
									</div>

									{error && <ErrorMessage error={error} />}

									<div className="grid gap-2">
										<FormField
											control={form.control}
											name="age"
											render={({ field }): React.ReactElement => (
												<FormItem>
													<FormLabel htmlFor="age">Age</FormLabel>
													<FormControl>
														<Input
															id="age"
															type="text"
															inputMode="numeric"
															placeholder="Age"
															{...field}
															value={field.value?.toString() || ""}
															onChange={(event): void => {
																const sanitizedValue = handleTypeAge(event)
																// eslint-disable-next-line max-len
																const numericValue = sanitizedValue === "" ? null : parseInt(sanitizedValue, 10)
																field.onChange(numericValue)
															}}
															maxLength={3}
															required
														/>
													</FormControl>
													<FormMessage />
													<div className="text-sm text-muted-foreground mt-1">
														<span>
															Providing your age ensures you get the right Lever Labs experience.
															For more details, please visit our{" "}
														</span>
														<Link
															href="/privacy"
															className="text-primary underline underline-offset-4"
														>
															Privacy Policy
														</Link>
														<span>.</span>
													</div>
												</FormItem>
											)}
										/>
									</div>

									<div className="grid gap-2">
										<FormField
											control={form.control}
											name="username"
											render={({ field }): React.ReactElement => (
												<FormItem>
													<FormLabel htmlFor="username">Username</FormLabel>
													<FormControl>
														<div className="relative">
															<Input
																id="username"
																placeholder="Username"
																{...field}
																value={field.value.toString() || ""}
																onChange={(event): void => {
																	const sanitizedValue = handleTypeUsername(event)
																	field.onChange(sanitizedValue)
																}}
																maxLength={100}
																required
																className="pr-16"
															/>
															<CharacterCounter
																value={field.value.toString() || ""}
																characterLimit={100}
																extraClasses="right-3"
															/>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<div className="grid gap-2">
										<FormField
											control={form.control}
											name="email"
											render={({ field }): React.ReactElement => {
												const ageValue = form.watch("age")
												const placeholder = ageValue && ageValue < 13 ? "Parent's email" : "Email"

												return (
													<FormItem>
														<FormLabel htmlFor="email">Email</FormLabel>
														<FormControl>
															<Input
																id="email"
																type="email"
																placeholder={placeholder}
																{...field}
																maxLength={100}
																required
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)
											}}
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
													<div className="text-sm text-muted-foreground">
														Must be at least 6 characters long.
													</div>
												</FormItem>
											)}
										/>
									</div>

									<Button type="submit" className="w-full">
										Create Account
									</Button>

									<OrComponent />

									<div className="flex justify-center">
										<GoogleLogin
											onSuccess={onGoogleSuccess}
											onError={(): void => console.error("Registration Failed")}
											shape="pill"
											width={300}
											text="continue_with"
											logo_alignment="center"
										/>
									</div>

									<div className="text-center text-sm">
										Already have an account?{" "}
										<Link href="/login" className="underline underline-offset-4">
											Login
										</Link>
									</div>
								</div>
							</form>
						</Form>
						<div className="relative hidden md:block">
							<Image
								src="/favicon.svg"
								alt="Image"
								className="items-center justify-center h-3/4 w-full object-cover"
								width={100}
								height={100}
								quality={100}
								priority
							/>
						</div>
					</CardContent>
				</Card>
				<TermsAndPrivacyAgreement />
			</div>
		</div>
	)
}

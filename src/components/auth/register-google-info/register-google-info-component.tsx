"use client"

import { useForm } from "react-hook-form"
import { useCallback, useState } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../../ui/form"
import AgeInput from "../age-input"
import AuthButton from "../../buttons/auth-button"
import UsernameInput from "../username-input"
import ErrorMessage from "../../messages/error-message"
import useTypedNavigate from "../../../hooks/navigate/use-typed-navigate"
import { registerUsernameSchema } from "../../../utils/auth/auth-schemas"
import registerGoogleInfo from "../../../utils/auth/google/register-google-info"
import { PageToNavigateAfterLogin } from "../../../utils/constants/page-constants"

export default function RegisterGoogleInfoComponent(): React.ReactNode {
	const [error, setError] = useState("")
	const navigate = useTypedNavigate()

	const form = useForm<NewGoogleInfoFormValues>({
		resolver: zodResolver(registerUsernameSchema),
		defaultValues: {
			username: "",
			age: null
		}
	})

	const onSubmit = useCallback(async (values: NewGoogleInfoFormValues): Promise<void> => {
		const success = await registerGoogleInfo(values, setError)
		if (success === false) return
		navigate(PageToNavigateAfterLogin)
	}, [navigate])

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-sm md:max-w-md">
						<div className="flex flex-col items-center text-center mb-6">
							<h1 className="text-2xl font-bold">Choose your username</h1>
						</div>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
								<AgeInput control={form.control} />
								<UsernameInput control={form.control} />

								<AuthButton title="CONTINUE" />

								{error && <ErrorMessage error={error} />}
							</form>
						</Form>
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

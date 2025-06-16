"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useMemo, useState } from "react"
import { EmailUpdatesRequest } from "@bluedotrobots/common-ts"
import { Input } from "../shadcn/ui/input"
import isEmailValid from "../../utils/auth/is-email-valid"
import { emailUpdatesSchema } from "../../utils/auth/auth-schemas"
import subscribeForUpdates from "../../utils/subscribe-for-updates"
import AnimatedStateButton from "../magicui/animated-rainbow-button"
import { Form, FormControl, FormField, FormItem } from "../shadcn/ui/form"

export default function SignUpForUpdates() {
	const [isLoading, setIsLoading] = useState(false)

	const onSubmit = useCallback(async (values: EmailUpdatesRequest) => {
		if (isLoading) return
		await subscribeForUpdates(values, setIsLoading )
	}, [isLoading])

	const form = useForm<EmailUpdatesRequest>({
		resolver: zodResolver(emailUpdatesSchema),
		defaultValues: {
			email: ""
		}
	})

	const formValues = form.watch()
	const isEmailValidMemo = useMemo(() => {
		return isEmailValid(formValues.email) === "Email"
	}, [formValues.email])

	return (
		<div className="w-full">
			<div className="flex flex-col md:flex-row justify-between w-full gap-8 md:gap-8 lg:gap-16">
				{/* Left content - subscription form */}
				<div className="flex flex-col w-full md:w-1/2 lg:w-1/2 justify-center order-1 md:order-1 px-4 md:px-0">
					<div className="text-xl text-center">
						Pip isn't available yet - but will be soon.
					</div>
					<div className="text-xl text-center mt-4 md:mt-6 mb-6 md:mb-10">
						Please enter your email below to get notified.
					</div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col sm:flex-row gap-4 md:gap-2 max-w-md mx-auto items-center">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="w-full md:w-auto">
										<FormControl>
											<Input
												type="email"
												placeholder="Email"
												required
												className="flex-1 h-10 w-full md:w-56 border-eel border-2
												duration-0 !text-lg md:!text-xl font-light"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<AnimatedStateButton
								buttonText="SUBSCRIBE"
								isDisabled={!isEmailValidMemo}
								type="submit"
								className="w-40 !duration-150"
							/>
						</form>
					</Form>
				</div>

				{/* Right content - video */}
				<div className="w-full md:w-1/2 lg:w-1/2 flex mt-8 md:mt-0 justify-center items-center order-2 md:order-2">
					<div className="relative aspect-video w-full max-w-5xl">
						<iframe
							className="w-full h-full rounded-xl"
							src="https://www.youtube.com/embed/anl3IRTi8gg"
							title="Pip's Big Adventure"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useMemo, useState } from "react"
import { Input } from "../shadcn/ui/input"
import isEmailValid from "../../utils/auth/is-email-valid"
import { emailUpdatesSchema } from "../../utils/auth/auth-schemas"
import RainbowSubscribeButton from "../shadcn/ui/rainbox-subscribe"
import useSubscribeForUpdates from "../../hooks/subscribe-for-updates"
import { Form, FormControl, FormField, FormItem } from "../shadcn/ui/form"

export default function SignUpForUpdates() {
	const [isLoading, setIsLoading] = useState(false)
	const [isSubscribed, setIsSubscribed] = useState(false)
	const subscribeForUpdates = useSubscribeForUpdates(isLoading, setIsLoading, setIsSubscribed)

	const onSubmit = useCallback(async (values: EmailUpdatesFormValues) => {
		await subscribeForUpdates(values)
	}, [subscribeForUpdates])

	const form = useForm<EmailUpdatesFormValues>({
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
		<>
			<div className="text-3xl">
				Pip isn&apos;t available yet - but it will be soon.
			</div>
			<div className="text-3xl mt-6 mb-10">
				Please enter your email below to sign up for updates.
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 max-w-md">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type="email"
										placeholder="Email"
										required
										className="flex-1 h-12 w-56 border-black dark:border-white border-2
										transition-all duration-300 !text-xl font-light"
										disabled={isSubscribed || isLoading}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					>

					</FormField>
					<RainbowSubscribeButton
						initialText="Subscribe"
						changeText="Subscribed!"
						isSubscribed={isSubscribed}
						isDisabled={!isEmailValidMemo}
						isLoading={isLoading}
						className="transition-all duration-300 rounded-xl h-12"
					/>
				</form>
			</Form>
		</>
	)
}

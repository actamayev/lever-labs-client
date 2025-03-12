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
		<div className="w-full px-4 md:px-0">
			<div className="text-xl md:text-3xl text-center">
                Pip isn't available yet - but will be soon.
			</div>
			<div className="text-xl md:text-3xl text-center mt-4 md:mt-6 mb-6 md:mb-10">
                Please enter your email below to get notified.
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col md:flex-row gap-4 md:gap-2 max-w-md mx-auto items-center">
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
										className="flex-1 h-12 w-full md:w-56 border-black dark:border-white border-2
                                        transition-all duration-300 !text-lg md:!text-xl font-light"
										disabled={isSubscribed || isLoading}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<RainbowSubscribeButton
						initialText="SUBSCRIBE"
						changeText="SUBSCRIBED!"
						isSubscribed={isSubscribed}
						isDisabled={!isEmailValidMemo}
						isLoading={isLoading}
						className="transition-all duration-300 rounded-xl h-12 w-full md:w-auto"
					/>
				</form>
			</Form>
		</div>
	)
}

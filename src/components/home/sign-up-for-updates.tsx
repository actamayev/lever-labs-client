import { useCallback, useState } from "react"
import { CheckIcon, ChevronRightIcon } from "lucide-react"
import { Input } from "../shadcn/ui/input"
import useSubscribeForUpdates from "../../hooks/subscribe-for-updates"
import { AnimatedSubscribeButton } from "../shadcn/ui/animated-subscribe-button"
import { AnimatedRainbowSubscribeButton } from "../shadcn/ui/animated-rainbow-subscribe-button"

export default function SignUpForUpdates() {
	const subscribeForUpdates = useSubscribeForUpdates()
	const [email, setEmail] = useState("")
	const [isSubscribed, setIsSubscribed] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = useCallback(async (e: React.FormEvent) => {
		e.preventDefault()
		if (!email || isLoading) return

		setIsLoading(true)
		try {
			await subscribeForUpdates(email)
			setIsSubscribed(true)
		} catch (error) {
			console.error("Failed to subscribe:", error)
		} finally {
			setIsLoading(false)
		}
	}, [email, isLoading, subscribeForUpdates])

	// TODO: Combine the aniated subscribe button with the rainbow button
	return (
		<>
			<div className="text-3xl mt-24">
				Pip isn&apos;t available yet - but it will be soon.
			</div>
			<div className="text-3xl my-6">
				Enter your email below to sign up for updates.
			</div>
			<form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
				<Input
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="flex-1"
					disabled={isSubscribed || isLoading}
				/>
				<AnimatedRainbowSubscribeButton
					// buttonColor="#000000"
					// buttonTextColor="#ffffff"
					subscribeStatus={isSubscribed}
					initialText={
						<span className="group inline-flex items-center">
							Subscribe{" "}
							<ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
						</span>
					}
					changeText={
						<span className="group inline-flex items-center">
							<CheckIcon className="mr-2 size-4" />
							Subscribed{" "}
						</span>
					}
				/>
			</form>
		</>
	)
}

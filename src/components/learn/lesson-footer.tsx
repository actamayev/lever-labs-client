"use client"

import { TactileButton } from "../shadcn/ui/tactile-button"
import AnimatedStateButton from "../magicui/animated-rainbow-button"

function LessonFooter(): React.ReactNode {
	const handleCheckClick = (): void => {
		// TODO: Implement check functionality
	}

	const handleRunCodeClick = (): void => {
		// TODO: Implement run code functionality
	}

	return (
		// eslint-disable-next-line max-len
		<footer className="h-[20vh] border-t-2 border-swan flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-60 2xl:px-96">
			{/* Left: Run code button */}
			<div className="h-12 w-48">
				<AnimatedStateButton
					buttonText="RUN CODE"
					isDisabled={false}
					onClick={handleRunCodeClick}
					className="duration-150 rounded-xl text-lg"
				/>
			</div>

			{/* Right: Check button */}
			<TactileButton
				onClick={handleCheckClick}
				shadowClass="shadow-chargingGreen-2"
				className="h-12 px-8 py-4 text-xl font-semibold rounded-xl text-standardBackground"
				shadowHeight={4}
			>
				CHECK
			</TactileButton>
		</footer>
	)
}

export default LessonFooter

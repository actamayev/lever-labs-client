"use client"

interface LilypadContainerProps {
	children: React.ReactNode
}

export default function LilypadContainer({ children }: LilypadContainerProps) {
	return (
		<div className="pt-20 px-8 relative">
			<div
				className="relative w-full overflow-x-auto"
				style={{
					overscrollBehavior: "auto", // Allow scrolling behavior in this container
					WebkitOverflowScrolling: "touch" // For better scrolling on iOS
				}}
			>
				<div className="flex justify-start min-w-max">
					{children}
				</div>
			</div>
		</div>
	)
}

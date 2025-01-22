interface LilypadContainerProps {
	children: React.ReactNode
}

// TODO: Make this vertically centered
export function LilypadContainer({ children }: LilypadContainerProps) {
	return (
		<div className="pt-32 px-8">
			<div className="relative w-full overflow-x-auto pb-8">
				<div className="flex items-center justify-start space-x-24 min-w-max px-8">
					{children}
				</div>
			</div>
		</div>
	)
}

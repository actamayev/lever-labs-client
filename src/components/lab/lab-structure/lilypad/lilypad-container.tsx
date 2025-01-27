interface LilypadContainerProps {
	children: React.ReactNode
}

export function LilypadContainer({ children }: LilypadContainerProps) {
	return (
		<div className="pt-20 px-8 relative">
			<div className="relative w-full overflow-x-auto">
				<div className="flex justify-start min-w-max">
					{children}
				</div>
			</div>
		</div>
	)
}

interface LilypadContainerProps {
	children: React.ReactNode
}

export function LilypadContainer({ children }: LilypadContainerProps) {
	return (
		<div className="pt-16 px-8">
			<div className="relative w-full overflow-x-auto pb-8">
				<div className="flex justify-start min-w-max">
					{children}
				</div>
			</div>
		</div>
	)
}

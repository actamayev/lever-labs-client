interface LilypadContainerProps {
	children: React.ReactNode
}

// TODO: Make this vertically centered
export function LilypadContainer({ children }: LilypadContainerProps) {
	return (
		<div className="pt-16 px-8">
			<div className="relative w-full overflow-x-auto pb-8">
				<div className="flex justify-start space-x-20 min-w-max">
					{children}
				</div>
			</div>
		</div>
	)
}

export function LilypadSection(props: LilypadContainerProps) {
	const { children } = props
	return (
		<div className="flex space-x-20">
			{children}
		</div>
	)
}

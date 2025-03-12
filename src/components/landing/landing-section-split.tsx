interface Props {
	leftContent: React.ReactNode
	rightContent: React.ReactNode
}

export default function LandingSectionSplit(props: Props) {
	const { leftContent, rightContent } = props

	return (
		<div className="w-full">
			<div className="flex flex-col md:flex-row justify-between w-full gap-16">
				<div className="flex flex-col w-full md:w-1/2">
					{leftContent}
				</div>

				<div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
					{rightContent}
				</div>
			</div>
		</div>
	)
}

import { cn } from "../../../lib/shadcn/utils"

interface Props {
	title: string
	description: string
	icon: React.ReactNode
	outerDivStyles: string
	paragraphStyles?: string
}

export default function SensorsSkeloton(props: Props) {
	const { title, description, icon: Icon, outerDivStyles, paragraphStyles } = props

	return (
		<div
			className={cn(
				"group relative flex flex-col justify-between overflow-hidden rounded-xl",
				"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
				"transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)]",
				"dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
				outerDivStyles
			)}
		>
			<div className="pointer-events-none z-10 flex transform-gpu gap-6 p-4 items-center">
				{Icon}
				<div className="flex flex-col">
					<h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
						{title}
					</h3>
					<p
						className={cn(
							"max-w-lg text-neutral-400",
							paragraphStyles
						)}
					>
						{description}
					</p>
				</div>
			</div>
		</div>
	)
}

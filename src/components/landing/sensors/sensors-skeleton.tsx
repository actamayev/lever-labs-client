import { cn } from "../../../lib/shadcn/utils"

interface Props {
	title: React.ReactNode
	description: string
	icon: React.ReactNode
	outerDivStyles: string
	paragraphStyles?: string
}

export default function SensorsSkeleton(props: Props) {
	const { title, description, icon: Icon, outerDivStyles, paragraphStyles } = props

	return (
		<div
			className={cn(
				"group relative flex flex-col justify-between overflow-hidden rounded-xl",
				"bg-lightThemeBackground [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
				"transform-gpu dark:bg-darkThemeBackground dark:[border:1px_solid_rgba(255,255,255,.1)]",
				"dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
				outerDivStyles
			)}
		>
			{/* Container changes from vertical on mobile to horizontal on md+ */}
			<div className="z-10 flex flex-col md:flex-row transform-gpu gap-4 p-4 h-full">
				{/* Icon container */}
				<div className="shrink-0 flex justify-center md:justify-start md:items-center">
					{Icon}
				</div>
				{/* Text container */}
				<div className="flex flex-col items-center md:items-start text-center md:text-left">
					<h3 className="text-lg md:text-xl font-semibold text-neutral-700 dark:text-neutral-300">
						{title}
					</h3>
					<p className={cn(
						"text-sm md:text-base text-neutral-400",
						paragraphStyles
					)}>
						{description}
					</p>
				</div>
			</div>
		</div>
	)
}

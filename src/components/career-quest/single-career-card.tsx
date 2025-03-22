"use client"

import { TactileButton } from "../shadcn/ui/tactile-button"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import { cn } from "../../lib/shadcn/utils"
import SingleComponentUsed from "./single-component-used"

export default function SingleCareerCard({ careerData }: { careerData: CareerData }) {
	const { careerName, componentsUsed, careerUrl, careerIcon: Icon, totalLessons, lessonsComplete, backgroundColor } = careerData
	const navigate = useTypedNavigate()

	// Calculate progress percentage
	const progressPercentage = Math.max(7, Math.min(100, ((lessonsComplete) / totalLessons) * 100))

	return (
		<div className={cn(
			"relative overflow-hidden rounded-2xl text-white w-[750px] h-[321px] flex cursor-default",
			backgroundColor
		)}>
			{/* Left Section */}
			<div className="w-1/2 flex flex-col p-6 justify-between">
				{/* Title */}
				<h3 className="text-2xl font-bold">{careerName}</h3>

				{/* Progress Bar */}
				<div className="w-full h-5 bg-emerald-600 rounded-full overflow-hidden relative">
					<div
						className="relative h-full rounded-full transition-all duration-300 ease-out bg-emerald-300"
						style={{
							width: `${progressPercentage}%`,
						}}
					>
						{/* Highlight shadow effect - only on the completed part */}
						<div
							className="absolute top-1 left-2 right-2 rounded-full"
							style={{
								background: "rgb(167, 243, 208)",
								height: "3px"
							}}
						/>
					</div>

					{/* Text inside progress bar */}
					<div className="absolute inset-0 flex items-center justify-center text-sm font-medium cursor-default">
						{lessonsComplete} / {totalLessons}
					</div>
				</div>

				{/* Component Icons */}
				<div className="flex flex-wrap gap-2 my-4">
					{componentsUsed.slice(0, 4).map((component) => (
						<SingleComponentUsed
							key={component.componentName}
							component={component}
						/>
					))}
					{componentsUsed.length > 4 && (
						<div className="w-10 h-10 bg-emerald-600 rounded-2xl flex items-center justify-center">
							<span className="font-bold">+{componentsUsed.length - 4}</span>
						</div>
					)}
				</div>

				{/* Continue Button */}
				<TactileButton
					className="duration-0 text-emerald-600 bg-white hover:bg-[rgb(230,230,230)] h-12 rounded-2xl text-base"
					onClick={() => navigate(careerUrl)}
					shadowColor="rgb(178,214,201)"
				>
					{lessonsComplete === 0 ? "START" : "CONTINUE"}
				</TactileButton>
			</div>

			{/* Right Section with Image */}
			<div className="w-1/2 flex items-center justify-center">
				<Icon size={200} fill="white"/>
			</div>
		</div>
	)
}

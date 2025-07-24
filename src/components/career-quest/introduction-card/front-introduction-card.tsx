"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "../../../lib/shadcn/utils"
import BackFlipButton from "../back-flip-button"
import SingleComponentUsed from "../single-component-used"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import { getDuolingoColors, getProgressColors } from "../../../utils/duolingo-utils"

interface Props {
	introData: CareerData
	flipCard: () => void
}

// eslint-disable-next-line max-lines-per-function
export default function FrontIntroductionCard(props: Props) {
	const { introData, flipCard } = props
	const { careerName, totalLessons, lessonsComplete, careerUrl, careerIcon: Icon, componentsUsed, backgroundColor } = introData

	const colors = getDuolingoColors(backgroundColor)
	const progressColors = getProgressColors(backgroundColor)

	// Calculate progress percentage
	const progressPercentage = Math.max(7, Math.min(100, ((lessonsComplete) / totalLessons) * 100))

	return (
		<motion.div
			className={cn("absolute w-full h-full backface-hidden flex cursor-default", colors.bg2)}
			style={{
				backfaceVisibility: "hidden",
				borderRadius: "60px"
			}}
		>
			{/* Left Section */}
			<div className={cn("w-1/2 flex flex-col p-6", colors.bg2)}>
				{/* Title */}
				<h3
					className="text-2xl font-bold mb-5"
					style={{
						fontSize: "27px",
						lineHeight: "34px",
						cursor: "text"
					}}
				>
					{careerName}
				</h3>

				{/* <div className={cn("w-full h-5 rounded-full overflow-hidden relative mb-5", progressColors.background)}>
					<div
						className={cn("relative h-full rounded-full duration-0 ease-out", progressColors.fill)}
						style={{
							width: `${progressPercentage}%`
						}}
					>
						<div
							className={cn("absolute top-1 left-2 right-2 rounded-full", progressColors.highlight)}
							style={{
								height: "3px"
							}}
						/>
					</div>

					<div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white cursor-default">
						{lessonsComplete} / {totalLessons}
					</div>
				</div> */}

				{/* Component Icons */}
				<div className="flex flex-wrap gap-2 mb-auto">
					{componentsUsed.slice(0, 4).map((component) => (
						<SingleComponentUsed
							key={component.componentName}
							component={component}
							baseColor={backgroundColor}  // Pass base color
						/>
					))}
					{componentsUsed.length > 4 && (
						<div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", colors.bg2)}>
							<span className="font-bold">+{componentsUsed.length - 4}</span>
						</div>
					)}
				</div>

				{/* Continue Button */}
				<Link href={careerUrl}>
					<TactileButton
						className={cn("duration-150 bg-white h-10 rounded-full text-base w-full", colors.text)}
						shadowClass={colors.shadow2}
						shadowHeight={4}
					>
						{lessonsComplete === 0 ? "START" : "CONTINUE"}
					</TactileButton>
				</Link>
			</div>

			{/* Right Section with Image */}
			<div
				className={cn("w-1/2 flex items-center justify-center", colors.bg)}
				style={{
					borderRadius: "60px"
				}}
			>
				<Icon
					size="200"
					className="w-12 h-12 md:w-24 md:h-24 lg:w-48 lg:h-48 xl:w-64 xl:h-64"
				/>
			</div>

			<BackFlipButton
				onFlip={flipCard}
				extraClasses="absolute bottom-6 right-6 size-8 rounded-full flex items-center justify-center focus:outline-none duration-0"
			/>
		</motion.div>
	)
}

"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "../../../lib/shadcn/utils"
import BackFlipButton from "../back-flip-button"
import SingleComponentUsed from "../single-component-used"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import SingleCodingConceptUsed from "../single-coding-concept-used"
import { getDuolingoColors, getProgressColors } from "../../../utils/duolingo-utils"

interface Props {
	careerData: CareerData
	flipCard: () => void
}

// eslint-disable-next-line max-lines-per-function
export default function FrontCareerCard(props: Props) {
	const { careerData, flipCard } = props
	const { careerName, componentsUsed, careerUrl, careerIcon: Icon,
		totalLessons, lessonsComplete, backgroundColor, codingConcepts } = careerData

	const colors = getDuolingoColors(backgroundColor)
	const progressColors = getProgressColors(backgroundColor)

	// Calculate progress percentage
	const progressPercentage = Math.max(7, Math.min(100, ((lessonsComplete) / totalLessons) * 100))

	return (
		<motion.div
			className={cn("absolute w-full h-full backface-hidden flex flex-col cursor-default", colors.bg2)}
			style={{
				backfaceVisibility: "hidden",
				borderRadius: "60px"
			}}
		>
			{/* Icon/Image Section */}
			<div
				className={cn("flex-1 flex items-center justify-center px-4 py-2 h-3/5", colors.bg)}
				style={{ borderRadius: "60px" }}
			>
				<Icon
					size="120"
					className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
				/>
			</div>
			<div
				className={cn("h-2/5", colors.bg2)}
				style={{
					borderBottomLeftRadius: "60px",
					borderBottomRightRadius: "60px"
				}}
			>
				{/* make 3 sections. the top one should be 35% of the height, then 30%, then 35% */}
				<div style={{ height: "35%" }} className="flex items-end">
					<h3
						className="font-bold text-white ml-7"
						style={{
							fontSize: "27px",
							lineHeight: "34px"
						}}
					>
						{careerName}
					</h3>
				</div>
				<div style={{ height: "30%" }} className="items-center flex">
					<div className="flex flex-wrap gap-1.5 ml-7">
						{componentsUsed.slice(0, 4).map((component) => (
							<SingleComponentUsed
								key={component.componentName}
								component={component}
								baseColor={backgroundColor}
							/>
						))}
					</div>
				</div>
				<div style={{ height: "35%" }}>
					<div className="pl-7 pb-4 flex flex-row items-center gap-3">
						<Link href={careerUrl} className="flex-1">
							<TactileButton
								className={cn("duration-150 bg-white h-10 rounded-full text-base w-full", colors.text)}
								shadowClass={colors.shadow}
								shadowHeight={4}
							>
								{lessonsComplete === 0 ? "START" : "CONTINUE"}
							</TactileButton>
						</Link>

						{/* Flip Button */}
						<BackFlipButton
							onFlip={flipCard}
							extraClasses="size-8 rounded-full flex items-center justify-center focus:outline-none duration-0"
							style={{
								marginRight: "30px"
							}}
						/>
					</div>
				</div>

				{/* <div className="p-4 pb-2">
				<h3 className="text-xl font-bold text-white mb-3">{careerName}</h3>

				<div className={cn("w-full h-5 rounded-full overflow-hidden relative", progressColors.background)}>
					<div
						className={cn("relative h-full rounded-full duration-0 ease-out", progressColors.fill)}
						style={{
							width: `${progressPercentage}%`,
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
				</div>
			</div> */}

				{/* Components Section */}
			</div>
		</motion.div>
	)
}

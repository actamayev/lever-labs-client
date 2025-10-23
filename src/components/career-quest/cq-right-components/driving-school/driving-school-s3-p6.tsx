"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { TactileButton } from "../../../buttons/tactile-button"
import getDuolingoColors from "../../../../utils/get-duolingo-colors"
import { cn } from "../../../../lib/shadcn/utils"
import careerQuestClass from "../../../../classes/career-quest-class"
import navigationManagerClass from "../../../../classes/navigation-manager-class"
import { CareerUUID } from "@lever-labs/common-ts/types/utils"
type AnswerChoice = "time" | "distance" | null

interface Props {
	careerUUID?: CareerUUID // Optional: if provided, will mark slide completion on correct answer
}

// eslint-disable-next-line max-lines-per-function
export default function DrivingSchoolS3P6(props: Props = {}): React.ReactNode {
	const { careerUUID } = props
	const [selectedAnswer, setSelectedAnswer] = useState<AnswerChoice>(null)

	const handleAnswerClick = (answer: AnswerChoice): void => {
		setSelectedAnswer(answer)

		// Mark completion if correct answer is selected and in career quest context
		if (answer === "distance" && careerUUID) {
			const currentSlide = navigationManagerClass.getCurrentMainSlide(careerUUID)
			let slideId: string | undefined

			if (currentSlide.type === "textParent") {
				const textChildIndex = navigationManagerClass.getCurrentTextChildIndex(careerUUID, currentSlide.id)
				const textChild = currentSlide.data.children[textChildIndex]
				slideId = textChild.id
			} else if (currentSlide.type === "challenge") {
				slideId = currentSlide.id
			}

			if (slideId) {
				careerQuestClass.markSlideInteractionComplete(careerUUID, slideId)
			}
		}
	}

	const getButtonStyles = (answer: AnswerChoice): string => {
		if (selectedAnswer === answer) {
			if (answer === "distance") {
				return "bg-charging-green text-white"
			} else {
				return "bg-cardinal text-white"
			}
		}

		// If wrong answer was selected, allow clicking the correct answer
		if (selectedAnswer === "time" && answer === "distance") {
			return "text-white bg-humpback"
		}

		return "text-white bg-humpback"
	}

	const renderExplanation = (): React.ReactNode => {
		if (selectedAnswer === null) return null

		if (selectedAnswer === "distance") {
			return (
				<div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
					<p className="text-green-800 text-lg">
						Exactly! Distance is more exact because my wheels can measure how far I've gone.
						That way I'll stop in the same place each time.
					</p>
				</div>
			)
		}

		if (selectedAnswer === "time") {
			return (
				<div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
					<p className="text-red-800 text-lg">
						Time can work, but it changes if I go faster or slower, or if the floor is different.
						Distance is better because my encoders track how far I move. That's why distance works better.
					</p>
				</div>
			)
		}

		return null
	}

	const humpbackColors = getDuolingoColors("humpback")
	const chargingGreenColors = getDuolingoColors("charging-green")
	const cardinalColors = getDuolingoColors("cardinal")

	const distanceShadowClass = useMemo((): string => {
		return selectedAnswer === "distance" ? chargingGreenColors.shadow2 : humpbackColors.shadow2
	}, [chargingGreenColors.shadow2, humpbackColors.shadow2, selectedAnswer])

	const timeShadowClass = useMemo((): string => {
		return selectedAnswer === "time" ? cardinalColors.shadow2 : humpbackColors.shadow2
	}, [cardinalColors.shadow2, humpbackColors.shadow2, selectedAnswer])

	return (
		<div className="flex flex-col h-full p-6 items-center justify-center">
			{/* Image Section - Top - Fixed height to prevent shifting */}
			<div className="shrink-0 mb-6 flex justify-center h-60">
				<div className="relative w-full max-w-2xl h-full">
					<Image
						src="/images/career-quest/driving-school/S3P6.png"
						alt="Robot with clock vs ruler comparison"
						width={600}
						height={300}
						className="object-contain rounded-lg h-full w-full"
						priority
					/>
				</div>
			</div>

			{/* Answer Choices - Middle */}
			<div className="shrink-0 mb-4">
				<div className="flex gap-4 justify-center">
					<TactileButton
						onClick={(): void => handleAnswerClick("time")}
						className={cn("px-8 py-4 rounded-lg font-semibold text-3xl min-w-32", humpbackColors.bg, getButtonStyles("time"))}
						shadowHeight={4}
						shadowClass={timeShadowClass}
					>
						Time
					</TactileButton>
					<TactileButton
						onClick={(): void => handleAnswerClick("distance")}
						className={cn("px-8 py-4 rounded-lg font-semibold text-3xl  min-w-32",
							humpbackColors.bg, getButtonStyles("distance"))}
						shadowHeight={4}
						shadowClass={distanceShadowClass}
					>
						Distance
					</TactileButton>
				</div>
			</div>

			{/* Explanation Section - Bottom - Fixed height to prevent shifting */}
			<div className="flex-1 flex flex-col justify-start min-h-24">
				{renderExplanation()}
			</div>
		</div>
	)
}

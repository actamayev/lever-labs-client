
// In career-quest-activity-header.tsx:
"use client"

import Link from "next/link"
import { ArrowLeft, MessageCircle } from "lucide-react" // Add MessageCircle import
import { observer } from "mobx-react" // Add observer import
import CustomTooltip from "../../custom-tooltip"
// import ChallengeProgressCircle from "./challenge-progress-circle"
// import careerQuestClass from "../../../classes/career-quest-class" // Add import
import stopCareerTrigger from "../../../utils/career-quest/stop-career-trigger"

function CareerQuestActivityHeader({ careerData }: { careerData: CareerQuestData }): React.ReactNode {
	// const isChatToggled = careerQuestClass.isCareerChatToggled(careerData.careerUUID)
	// const currentSlide = careerQuestClass.getCurrentMainSlide(careerData.careerUUID)
	// const isOnChallengeSection = currentSlide.type === "challenge"

	// const handleChatToggle = (): void => {
	// 	if (isOnChallengeSection) return
	// 	careerQuestClass.toggleCareerChat(careerData.careerUUID)
	// }

	return (
		<header className="h-20 flex items-center px-4 shadow-sm fixed top-0 left-0 right-0 bg-standardBackground z-10">
			{/* Left section with back button */}
			<div className="w-1/4 flex items-center">
				<CustomTooltip
					tooltipTrigger={
						<Link href="/career-quest">
							<button
								className="flex items-center text-questionText hover:bg-polar p-2 rounded-lg mr-2"
								onClick={(): Promise<void> => stopCareerTrigger()}
							>
								<ArrowLeft size={30} className="mr-1" />
							</button>
						</Link>
					}
					tooltipContent="CAREER QUEST"
				/>
			</div>

			{/* Center section with career title */}
			<div className="w-1/2 flex justify-center">
				<h1 className="text-5xl font-medium text-questionText text-center">
					{careerData.careerTitle}
				</h1>
			</div>

			{/* Right section with chat button and progress circle */}
			<div className="w-1/4 flex justify-end items-center pr-4 gap-2">
				{/* <CustomTooltip
					tooltipTrigger={
						<button
							onClick={handleChatToggle}
							disabled={isOnChallengeSection}
							className={`flex items-center p-2 rounded-lg transition-colors ${
								isOnChallengeSection
									? "text-gray-400 cursor-not-allowed opacity-50"
									: isChatToggled
										? "bg-blue-100 text-blue-600 hover:bg-blue-200"
										: "text-questionText hover:bg-polar"
							}`}
						>
							<MessageCircle size={24} />
						</button>
					}
					tooltipContent={
						isOnChallengeSection
							? "CHAT UNAVAILABLE ON CHALLENGE SECTIONS"
							: isChatToggled ? "HIDE CHAT" : "SHOW CHAT"
					}
				/> */}
				{/* <ChallengeProgressCircle careerData={careerData} /> */}
			</div>
		</header>
	)
}

export default observer(CareerQuestActivityHeader) // Wrap with observer

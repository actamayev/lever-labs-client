/* eslint-disable no-nested-ternary */
"use client"

import { ArrowLeft, MessageCircle, Users } from "lucide-react" // Add MessageCircle import
import { observer } from "mobx-react" // Add observer import
import { TeacherViewHubData } from "@lever-labs/common-ts/types/hub"
// import ChallengeProgressCircle from "./challenge-progress-circle"
import careerQuestClass from "../../../classes/career-quest-class" // Add import
import stopCareerTrigger from "../../../utils/career-quest/stop-career-trigger"
import studentClass from "../../../classes/student-class"
import teacherClass from "../../../classes/teacher-class"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import HubStudentsDialog from "./hub-students-dialog"
import CustomTooltip from "../../custom-tooltip"
import ChallengeProgressCircle from "./challenge-progress-circle"
import navigationManagerClass from "../../../classes/navigation-manager-class"
import pipClass from "../../../classes/pip-class"
import ConnectToPipButton from "../../connect-pip/connect-to-pip-button"
import getDuolingoColors from "../../../utils/get-duolingo-colors"
import CQBatterySection from "./cq-battery-section"
import CQNetworkSection from "./cq-network-section"

// eslint-disable-next-line max-lines-per-function, complexity
function CareerQuestActivityHeader({ careerData }: { careerData: CareerQuestData }): React.ReactNode {
	const currentSlide = navigationManagerClass.getCurrentMainSlide(careerData.careerUUID)
	const isOnChallengeSection = currentSlide.type === "challenge"

	// Get appropriate toggle state based on section type
	const isChatToggled = isOnChallengeSection
		? careerQuestClass.isChallengeChatToggled(careerData.careerUUID)
		: careerQuestClass.isCareerChatToggled(careerData.careerUUID)

	const handleChatToggle = (): void => {
		if (isOnChallengeSection) {
			careerQuestClass.toggleChallengeChat(careerData.careerUUID)
		} else {
			careerQuestClass.toggleCareerChat(careerData.careerUUID)
		}
	}
	const router = useRouter()
	const [isStudentsDialogOpen, setIsStudentsDialogOpen] = useState(false)
	const hasNavigationHistory = useRef(false)

	// Track if user has navigation history from within the app
	useEffect((): void => {
		// Check if there's a referrer from the same origin
		if (document.referrer && new URL(document.referrer).origin === window.location.origin) {
			hasNavigationHistory.current = true
		}
	}, [])

	const handleBack = useCallback((): void => {
		// If user came directly to this page (no internal navigation), go to career-quest page
		// Otherwise, use normal back navigation
		if (!hasNavigationHistory.current) {
			router.push("/career-quest")
		} else {
			router.back()
		}
		stopCareerTrigger()
	}, [router])

	const handleShowStudents = useCallback((): void => {
		setIsStudentsDialogOpen(true)
	}, [])

	// Check if user is teacher and is focusing students
	const isTeacher = teacherClass.teacherData !== null && teacherClass.teacherData.isApproved
	const isFocusingStudents = teacherClass.isFocusingStudents
	const shouldShowStudentsButton = isTeacher && isFocusingStudents

	// Get current active hub data
	const getCurrentHub = useCallback((): TeacherViewHubData | null => {
		if (!shouldShowStudentsButton) return null

		// Find the current active hub based on career
		for (const [, classroomData] of teacherClass.detailedClassroomData) {
			const activeHub = classroomData.activeHubs.find((hub): boolean => hub.careerUUID === careerData.careerUUID)
			if (activeHub) {
				return activeHub
			}
		}
		return null
	}, [shouldShowStudentsButton, careerData.careerUUID])

	const currentHub = getCurrentHub()

	return (
		<header className="h-20 flex items-center px-4 shadow-xs fixed top-0 left-0 right-0 bg-standard-background z-10">
			{/* Left section with back button */}
			<div className="w-1/4 flex items-center">
				{!studentClass.isInFocusMode && (
					<button
						onClick={handleBack}
						className="flex items-center text-question-text hover:bg-polar p-2 rounded-lg mr-2"
					>
						<ArrowLeft size={30} className="mr-1" />
					</button>
				)}
			</div>

			{/* Center section with career title */}
			<div className="w-1/2 flex justify-center">
				<h1 className="text-5xl font-medium text-question-text text-center">
					{careerData.careerTitle}
				</h1>
			</div>

			{/* Right section with students button and progress circle */}
			<div className="w-1/4 flex justify-end items-center gap-2">
				{shouldShowStudentsButton && currentHub && (
					<button
						onClick={handleShowStudents}
						className="flex items-center p-2 rounded-lg text-question-text hover:bg-polar duration-0"
						title="View students in hub"
					>
						<Users size={24} />
						<span className="ml-2 text-sm font-medium">
							{currentHub.studentsJoined.length}
						</span>
					</button>
				)}
				{pipClass.selectedPip ? (
					<div className="flex flex-row gap-5">
						<CQBatterySection />
						<CQNetworkSection />
					</div>
				) : (
					<ConnectToPipButton
						colors={getDuolingoColors(careerData.careerColor)}
						tactileButtonClasses="text-3xl"
						botIconClasses="size-9!"
					/>
				)}
				{careerData.needsChat && (
					<CustomTooltip
						tooltipTrigger={
							<button
								onClick={handleChatToggle}
								className={`flex items-center p-2 rounded-lg duration-0 ${
									isChatToggled
										? "bg-macaw text-white"
										: "text-question-text hover:bg-polar"
								}`}
							>
								<MessageCircle size={30} />
							</button>
						}
						tooltipContent={
							isOnChallengeSection
								? (isChatToggled ? "SHOW CHALLENGE TEXT" : "SHOW CHALLENGE CHAT")
								: (isChatToggled ? "HIDE CHAT" : "SHOW CHAT")
						}
					/>
				)}
				<ChallengeProgressCircle careerData={careerData} />
			</div>

			{/* Students Dialog */}
			{shouldShowStudentsButton && currentHub && (
				<HubStudentsDialog
					isStudentsDialogOpen={isStudentsDialogOpen}
					setIsStudentsDialogOpen={setIsStudentsDialogOpen}
					studentsJoined={currentHub.studentsJoined}
					hubName={currentHub.hubName}
				/>
			)}
		</header>
	)
}

export default observer(CareerQuestActivityHeader) // Wrap with observer

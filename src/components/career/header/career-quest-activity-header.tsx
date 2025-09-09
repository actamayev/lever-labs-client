/* eslint-disable no-nested-ternary */
"use client"

import { ArrowLeft, MessageCircle, Users } from "lucide-react" // Add MessageCircle import
import { observer } from "mobx-react" // Add observer import
import { TeacherViewHubData } from "@bluedotrobots/common-ts/types/hub"
// import ChallengeProgressCircle from "./challenge-progress-circle"
import getCareerQuestClass from "../../../classes/career-quest-class" // Add import
import stopCareerTrigger from "../../../utils/career-quest/stop-career-trigger"
import getStudentClass from "../../../classes/student-class"
import getTeacherClass from "../../../classes/teacher-class"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import HubStudentsDialog from "./hub-students-dialog"
import CustomTooltip from "../../custom-tooltip"
import ChallengeProgressCircle from "./challenge-progress-circle"
import getNavigationManagerClass from "../../../classes/navigation-manager-class"

// eslint-disable-next-line max-lines-per-function, complexity
function CareerQuestActivityHeader({ careerData }: { careerData: CareerQuestData }): React.ReactNode {
	const isChatToggled = getCareerQuestClass().isCareerChatToggled(careerData.careerUUID)
	const currentSlide = getNavigationManagerClass().getCurrentMainSlide(careerData.careerUUID)
	const isOnChallengeSection = currentSlide.type === "challenge"

	const handleChatToggle = (): void => {
		if (isOnChallengeSection) return
		getCareerQuestClass().toggleCareerChat(careerData.careerUUID)
	}
	const router = useRouter()
	const [isStudentsDialogOpen, setIsStudentsDialogOpen] = useState(false)

	const handleBack = useCallback((): void => {
		router.back()
		stopCareerTrigger()
	}, [router])

	const handleShowStudents = useCallback((): void => {
		setIsStudentsDialogOpen(true)
	}, [])

	// Check if user is teacher and is focusing students
	const isTeacher = getTeacherClass().teacherData !== null
	const isFocusingStudents = getTeacherClass().isFocusingStudents
	const shouldShowStudentsButton = isTeacher && isFocusingStudents

	// Get current active hub data
	const getCurrentHub = useCallback((): TeacherViewHubData | null => {
		if (!shouldShowStudentsButton) return null

		// Find the current active hub based on career
		for (const [, classroomData] of getTeacherClass().detailedClassroomData) {
			const activeHub = classroomData.activeHubs.find((hub): boolean => hub.careerUUID === careerData.careerUUID)
			if (activeHub) {
				return activeHub
			}
		}
		return null
	}, [shouldShowStudentsButton, careerData.careerUUID])

	const currentHub = getCurrentHub()

	return (
		<header className="h-20 flex items-center px-4 shadow-sm fixed top-0 left-0 right-0 bg-standardBackground z-10">
			{/* Left section with back button */}
			<div className="w-1/4 flex items-center">
				{!getStudentClass().isInFocusMode && (
					<button
						onClick={handleBack}
						className="flex items-center text-questionText hover:bg-polar p-2 rounded-lg mr-2"
					>
						<ArrowLeft size={30} className="mr-1" />
					</button>
				)}
			</div>

			{/* Center section with career title */}
			<div className="w-1/2 flex justify-center">
				<h1 className="text-5xl font-medium text-questionText text-center">
					{careerData.careerTitle}
				</h1>
			</div>

			{/* Right section with students button and progress circle */}
			<div className="w-1/4 flex justify-end items-center pr-4 gap-2">
				{shouldShowStudentsButton && currentHub && (
					<button
						onClick={handleShowStudents}
						className="flex items-center p-2 rounded-lg text-questionText hover:bg-polar transition-colors"
						title="View students in hub"
					>
						<Users size={24} />
						<span className="ml-2 text-sm font-medium">
							{currentHub.studentsJoined.length}
						</span>
					</button>
				)}
				{careerData.needsChat && (
					<CustomTooltip
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

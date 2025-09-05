"use client"

import { useCallback, useEffect } from "react"
import { observer } from "mobx-react"
import { ArrowLeft, Hash, Play, UserCheck, ExternalLink } from "lucide-react"
import { CareerUUID, ClassCode } from "@bluedotrobots/common-ts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/ui/card"
import { TactileButton } from "../shadcn/ui/tactile-button"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import studentClass from "../../classes/student-class"
import ClassroomInvitationResponse from "../whiteboard/classroom-invitation-response"
import { careerData, meetPipData } from "../../utils/constants/career-quest/career-data"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import { cn } from "../../lib/shadcn/utils"
import useJoinHub from "../../hooks/student/join-hub"
import careerQuestClass from "../../classes/career-quest-class"
import { UUID } from "crypto"

interface ClassroomPageProps {
	classCode: ClassCode
}

// eslint-disable-next-line max-lines-per-function, complexity
function SingleWhiteboardPage({ classCode }: ClassroomPageProps): React.ReactNode {
	const navigate = useTypedNavigate()
	const joinHub = useJoinHub()

	const classroomData = studentClass.getClassroomData(classCode)

	useEffect((): void => {
		document.title = `${classroomData?.classroomName} | Blue Dot Robots`
	}, [classroomData?.classroomName])

	const handleBackClick = (): void => navigate("/whiteboard")

	// Check if this classroom has a pending invitation
	const isPendingInvitation = classroomData?.invitationStatus === "PENDING"

	const joinHubHandler = useCallback((careerUUID: CareerUUID, hubId: UUID): void => {
		if (careerUUID === meetPipData.careerUUID) {
			studentClass.setIsInFocusMode(true)
			joinHub(classCode, hubId)
			return
		}
		const career = careerData.find((singleCareerData): boolean => singleCareerData.careerUUID === careerUUID)
		if (career) {
			studentClass.setIsInFocusMode(true)
			joinHub(classCode, hubId)
		}
	}, [classCode, joinHub])

	const continueHubHandler = useCallback((hub: ExtendedStudentViewHubData): void => {
		// Set the saved position to hub's current position before navigating
		// This ensures the career quest will restore to the hub position when data loads
		const hubSlideId = hub.slideId
		if (hubSlideId) {
			// Parse navigation command from slideId if present
			let actualSlideId = hubSlideId

			// Handle morphing commands which have format: "advance_morph:morphingTextId:actualSlideId"
			if (hubSlideId.startsWith("advance_morph:") || hubSlideId.startsWith("back_morph:")) {
				const parts = hubSlideId.split(":")
				if (parts.length >= 3) {
					actualSlideId = parts[2] // The actual slide ID
				}
			} else {
				// Handle other commands with format: "command:actualSlideId"
				const colonIndex = hubSlideId.indexOf(":")
				if (colonIndex !== -1) {
					actualSlideId = hubSlideId.substring(colonIndex + 1)
				}
			}

			// Set saved position so career quest restores to hub position when it loads
			careerQuestClass.setSavedPosition(hub.careerUUID, actualSlideId)
		}

		studentClass.setIsInFocusMode(true)
		
		// Navigate to the appropriate career quest page
		if (hub.careerUUID === meetPipData.careerUUID) {
			navigate("/career-quest/meet-pip")
		} else {
			const career = careerData.find((singleCareerData): boolean => singleCareerData.careerUUID === hub.careerUUID)
			if (career) {
				navigate(career.careerUrl)
			}
		}
	}, [navigate])

	if (studentClass.isRetrievingStudentData) {
		return (
			<div className="p-6">
				<div className="flex items-center gap-4 mb-8">
					<TactileButton
						onClick={handleBackClick}
						className="flex items-center gap-2 h-10 px-4 rounded-xl text-lg bg-polar text-eel border border-swan"
						shadowHeight={2}
						shadowClass="shadow-gray-300"
					>
						<ArrowLeft className="h-4 w-4" />
						Back
					</TactileButton>
				</div>
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="text-lg text-eel">Loading classroom details...</div>
				</div>
			</div>
		)
	}

	// Show invitation response UI if the invitation is pending
	if (isPendingInvitation && classroomData) {
		return (
			<ClassroomInvitationResponse
				classCode={classCode}
				classroomName={classroomData.classroomName}
			/>
		)
	}

	return (
		<div className="p-6 max-w-7xl mx-auto">
			{/* Header with back button */}
			<div className="flex items-center gap-4 mb-8">
				<TactileButton
					onClick={handleBackClick}
					className="flex items-center gap-2 h-10 px-4 rounded-xl text-lg bg-polar text-eel border border-swan hover:bg-gray-50"
					shadowHeight={2}
					shadowClass="shadow-gray-300"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Whiteboard
				</TactileButton>
			</div>

			{/* Page Title */}
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-wolf mb-2">
					{classroomData?.classroomName || "Classroom"}
				</h1>
				<p className="text-eel text-lg">Interactive whiteboard for robotics learning</p>
			</div>

			{/* Class Info Card */}
			<div className="mb-8">
				<Card className="border-2 border-swan bg-standardBackground">
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center gap-2 text-lg">
							<Hash className="h-5 w-5 text-pipTheme" />
							Class Code
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-mono font-bold text-wolf bg-polar px-4 py-2 rounded-lg border border-swan w-fit">
							{classCode}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Student Hubs Section */}
			{classroomData?.activeHubs && classroomData.activeHubs.length > 0 ? (
				<Card className="border-2 border-swan bg-standardBackground">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Play className="h-5 w-5 text-pipTheme" />
							Available Learning Activities
						</CardTitle>
						<CardDescription>
							Join active hubs to participate in robotics learning activities
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{classroomData.activeHubs.map((hub): React.ReactNode => {
								// Find career data for this hub
								const careerInfo = hub.careerUUID === meetPipData.careerUUID
									? meetPipData
									: careerData.find((career): boolean => career.careerUUID === hub.careerUUID)

								const CareerIcon = careerInfo?.careerIcon || Play
								const careerColors = getDuolingoColors(careerInfo?.backgroundColor || "humpback")

								return (
									<Card key={hub.hubId} className="border border-swan transition-shadow">
										<CardContent className="p-4">
											<div className="flex items-start gap-3">
												<div className={cn("p-2 rounded-lg", careerColors.bg)}>
													<CareerIcon className="h-5 w-5 text-white" />
												</div>
												<div className="flex-1 min-w-0">
													<h3 className="font-semibold text-wolf truncate mb-1">
														{hub.hubName}
													</h3>
													<p className="text-sm text-eel mb-2">
														{careerInfo?.careerName || "Unknown Career"}
													</p>
													<div className="flex items-center gap-2 text-xs">
														{hub.isHubJoined ? (
															<div className="flex items-center gap-1 text-green-600">
																<UserCheck className="h-3 w-3" />
																<span>Joined</span>
															</div>
														) : (
															<div className="flex items-center gap-1 text-eel">
																<Play className="h-3 w-3" />
																<span>Available to join</span>
															</div>
														)}
													</div>
												</div>
											</div>
											<div className="mt-3">
												{hub.isHubJoined ? (
													<TactileButton
														className={cn("w-full h-8 text-sm text-white", careerColors.bg)}
														shadowHeight={2}
														shadowClass={careerColors.shadow2}
														onClick={(): void => continueHubHandler(hub)}
													>
														<ExternalLink className="h-3 w-3 mr-2" />
														Continue Learning
													</TactileButton>
												) : (
													<TactileButton
														className={cn("w-full h-8 text-sm text-white", careerColors.bg)}
														shadowHeight={4}
														shadowClass={careerColors.shadow2}
														onClick={(): void => joinHubHandler(hub.careerUUID, hub.hubId)}
													>
														Join Hub
													</TactileButton>
												)}
											</div>
										</CardContent>
									</Card>
								)
							})}
						</div>
					</CardContent>
				</Card>
			) : (
				<Card className="border-2 border-swan bg-standardBackground">
					<CardContent>
						<div className="text-center py-16">
							<Play className="h-16 w-16 text-eel mx-auto mb-6 opacity-50" />
							<h3 className="text-xl font-medium text-wolf mb-3">No Active Learning Activities</h3>
							<p className="text-eel mb-6 max-w-md mx-auto">
								Your teacher hasn't started any learning activities yet.
								Check back later or ask your teacher to create a hub for the class.
							</p>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	)
}

export default observer(SingleWhiteboardPage)

/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
"use client"

import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import { ArrowLeft, Users, Rocket, Play, UserCheck, EllipsisVertical, Trash2, Car, Lightbulb, Volume2 } from "lucide-react"
import { ClassCode } from "@bluedotrobots/common-ts/types/utils"
import { TeacherViewHubData } from "@bluedotrobots/common-ts/types/hub"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcn/ui/table"
import { TactileButton } from "../shadcn/ui/tactile-button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../shadcn/ui/dropdown-menu"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import teacherClass from "../../classes/teacher-class"
import careerQuestClass from "../../classes/career-quest-class"
import retrieveDetailedClassroomInfo from "../../utils/teacher/retrieve-detailed-classroom-info"
import updateDrivingStatusForAllStudents from "../../utils/teacher/update-driving-status-all-students"
import updateLightsStatusForAllStudents from "../../utils/teacher/update-lights-status-all-students"
import updateSoundsStatusForAllStudents from "../../utils/teacher/update-sounds-status-all-students"
import updateIndividualStudentDrivingStatus from "../../utils/teacher/update-individual-student-driving-status"
import updateIndividualStudentLightsStatus from "../../utils/teacher/update-individual-student-lights-status"
import updateIndividualStudentSoundsStatus from "../../utils/teacher/update-individual-student-sounds-status"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import { cn } from "../../lib/shadcn/utils"
import { careerData, meetPipData } from "../../utils/constants/career-quest/career-data"
import ClassroomStatsCards from "./classroom-stats-cards"

// eslint-disable-next-line max-lines-per-function, complexity
function ClassroomPage({ classCode }: { classCode: ClassCode }): React.ReactNode {
	const navigate = useTypedNavigate()
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [hubToDelete, setHubToDelete] = useState<TeacherViewHubData | null>(null)

	// Fetch detailed classroom data on component mount
	useEffect((): void => {
		retrieveDetailedClassroomInfo(classCode)
	}, [classCode])

	const classroomData = teacherClass.getDetailedClassroomData(classCode)

	useEffect((): void => {
		document.title = `${classroomData?.classroomName} | Blue Dot Robots`
	}, [classroomData?.classroomName])

	const handleBackClick = (): void => navigate("/class-manager")

	const handleDeleteHub = useCallback((hub: TeacherViewHubData): void => {
		setHubToDelete(hub)
		setIsDeleteDialogOpen(true)
	}, [])

	const joinHubHandler = useCallback((hub: TeacherViewHubData): void => {
		if (hub.careerUUID === meetPipData.careerUUID) {
			teacherClass.setIsFocusingStudents({ classCode, hubId: hub.hubId })
			careerQuestClass.resetCareerToBeginning(meetPipData.careerUUID)
			navigate("/career-quest/meet-pip")
			return
		}
		const career = careerData.find((singleCareerData): boolean => singleCareerData.careerUUID === hub.careerUUID)
		if (career) {
			teacherClass.setIsFocusingStudents({ classCode, hubId: hub.hubId })
			careerQuestClass.resetCareerToBeginning(hub.careerUUID)
			navigate(career.careerUrl)
		}
	}, [navigate, classCode])

	// Helper functions for garage control buttons
	const getGarageStatus = useCallback((statusType: "driving" | "lights" | "sounds"): "none" | "all-on" | "all-off" | "mixed" => {
		if (!classroomData?.students || classroomData.students.length === 0) return "none"

		const allOn = classroomData.students.every((student): boolean => {
			switch (statusType) {
				case "driving": return student.garageDrivingAllowed
				case "lights": return student.garageLightsAllowed
				case "sounds": return student.garageSoundsAllowed
				default: return false
			}
		})

		const allOff = classroomData.students.every((student): boolean => {
			switch (statusType) {
				case "driving": return !student.garageDrivingAllowed
				case "lights": return !student.garageLightsAllowed
				case "sounds": return !student.garageSoundsAllowed
				default: return false
			}
		})

		if (allOn) return "all-on"
		if (allOff) return "all-off"
		return "mixed"
	}, [classroomData])

	const handleGarageControlClick = useCallback((statusType: "driving" | "lights" | "sounds"): void => {
		const currentStatus = getGarageStatus(statusType)
		// If mixed or all-on, turn all off. If all-off, turn all on
		const newStatus = currentStatus === "all-off"

		switch (statusType) {
			case "driving":
				updateDrivingStatusForAllStudents(classCode, newStatus)
				break
			case "lights":
				updateLightsStatusForAllStudents(classCode, newStatus)
				break
			case "sounds":
				updateSoundsStatusForAllStudents(classCode, newStatus)
				break
		}
	}, [classCode, getGarageStatus])

	const handleIndividualStudentControl = useCallback((
		studentId: number,
		statusType: "driving" | "lights" | "sounds",
		currentStatus: boolean
	): void => {
		const newStatus = !currentStatus

		switch (statusType) {
			case "driving":
				updateIndividualStudentDrivingStatus(classCode, studentId, newStatus)
				break
			case "lights":
				updateIndividualStudentLightsStatus(classCode, studentId, newStatus)
				break
			case "sounds":
				updateIndividualStudentSoundsStatus(classCode, studentId, newStatus)
				break
		}
	}, [classCode])

	if (teacherClass.isRetrievingDetailedData) {
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
					Back to Class Manager
				</TactileButton>
			</div>

			{/* Page Title */}
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-wolf mb-2">
					{classroomData?.classroomName || "Classroom"}
				</h1>
				<p className="text-eel text-lg">Manage your classroom and view student information</p>
			</div>

			<ClassroomStatsCards
				classCode={classCode}
				hubToDelete={hubToDelete}
				isDeleteDialogOpen={isDeleteDialogOpen}
				setIsDeleteDialogOpen={setIsDeleteDialogOpen}
			/>

			{/* Active Hubs Section */}
			{classroomData?.activeHubs && classroomData.activeHubs.length > 0 && (
				<Card className="border-2 border-swan bg-standardBackground mb-8">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Play className="h-5 w-5 text-pipTheme" />
							Active Hubs
						</CardTitle>
						<CardDescription>
							Currently running learning activities in this classroom
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{classroomData.activeHubs.map((hub): React.ReactNode => {
								// Find career data for this hub
								const careerInfo = hub.careerUUID === meetPipData.careerUUID
									? meetPipData
									: careerData.find((career): boolean => career.careerUUID === hub.careerUUID)

								const CareerIcon = careerInfo?.careerIcon || Rocket
								const careerColors = getDuolingoColors(careerInfo?.backgroundColor || "humpback")

								return (
									<Card key={hub.hubId} className="border border-swan hover:shadow-md transition-shadow relative">
										<CardContent className="p-4">
											<div className="flex items-start gap-3">
												<div className={cn("p-2 rounded-lg", careerColors.bg)}>
													<CareerIcon className="h-5 w-5 text-white" />
												</div>
												<div className="flex-1 min-w-0">
													<h3 className="font-semibold text-wolf truncate mb-1 pr-8">
														{hub.hubName}
													</h3>
													<p className="text-sm text-eel mb-2">
														{careerInfo?.careerName || "Unknown Career"}
													</p>
													<div className="flex items-center gap-2 text-xs text-eel">
														<UserCheck className="h-3 w-3" />
														<span>{hub.studentsJoined.length} students joined</span>
													</div>
												</div>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<div className="p-1 transition-none rounded hover:bg-polar cursor-pointer">
															<EllipsisVertical
																className="text-wolf"
																size={16}
															/>
														</div>
													</DropdownMenuTrigger>
													<DropdownMenuContent className="w-32 bg-standardBackground shadow-none">
														<DropdownMenuItem
															onClick={(): void => handleDeleteHub(hub)}

															className="cursor-pointer text-sm hover:!bg-polar text-cardinal hover:!text-cardinal"
														>
															<Trash2 className="mr-2 !size-4" strokeWidth={2.5}/>
															Delete
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
											<div className="mt-3 flex gap-2">
												<TactileButton
													className={cn("flex-1 h-8 text-sm text-white rounded-xl", careerColors.bg)}
													shadowHeight={4}
													shadowClass={careerColors.shadow2}
													onClick={(): void => joinHubHandler(hub)}
												>
													Join Hub
												</TactileButton>
											</div>
										</CardContent>
									</Card>
								)
							})}
						</div>
					</CardContent>
				</Card>
			)}

			{/* Students Table */}
			<Card className="border-2 border-swan bg-standardBackground">
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="flex items-center gap-2">
								<Users className="h-5 w-5 text-pipTheme" />
								Students
							</CardTitle>
							<CardDescription>
								View all students enrolled in this classroom
							</CardDescription>
						</div>
						<div className="flex items-center gap-2">
							{/* Garage Control Buttons */}
							<TactileButton
								onClick={(): void => handleGarageControlClick("driving")}
								className={cn(
									"h-8 w-8 rounded-lg flex items-center justify-center duration-150",
									getGarageStatus("driving") === "all-on" && "bg-chargingGreen text-standardBackground border border-chargingGreen",
									getGarageStatus("driving") === "all-off" && "bg-cardinal text-standardBackground border border-cardinal",
									getGarageStatus("driving") === "mixed" && "bg-standardBackground text-wolf border border-swan"
								)}
								shadowHeight={4}
								shadowClass={
									getGarageStatus("driving") === "all-on"
										? "shadow-chargingGreen-2"
										: getGarageStatus("driving") === "all-off"
											? "shadow-cardinal-2"
											: "shadow-swan"
								}
								title="Toggle driving for all students"
							>
								<Car className="h-4 w-4" />
							</TactileButton>
							<TactileButton
								onClick={(): void => handleGarageControlClick("lights")}
								className={cn(
									"h-8 w-8 rounded-lg flex items-center justify-center duration-150",
									getGarageStatus("lights") === "all-on" && "bg-chargingGreen text-standardBackground border border-chargingGreen",
									getGarageStatus("lights") === "all-off" && "bg-cardinal text-standardBackground border border-cardinal",
									getGarageStatus("lights") === "mixed" && "bg-standardBackground text-wolf border border-swan"
								)}
								shadowHeight={4}
								shadowClass={
									getGarageStatus("lights") === "all-on"
										? "shadow-chargingGreen-2"
										: getGarageStatus("lights") === "all-off"
											? "shadow-cardinal-2"
											: "shadow-swan"
								}
								title="Toggle lights for all students"
							>
								<Lightbulb className="h-4 w-4" />
							</TactileButton>
							<TactileButton
								onClick={(): void => handleGarageControlClick("sounds")}
								className={cn(
									"h-8 w-8 rounded-lg flex items-center justify-center duration-150",
									getGarageStatus("sounds") === "all-on" && "bg-chargingGreen text-standardBackground border border-chargingGreen",
									getGarageStatus("sounds") === "all-off" && "bg-cardinal text-standardBackground border border-cardinal",
									getGarageStatus("sounds") === "mixed" && "bg-standardBackground text-wolf border border-swan"
								)}
								shadowHeight={4}
								shadowClass={
									getGarageStatus("sounds") === "all-on"
										? "shadow-chargingGreen-2"
										: getGarageStatus("sounds") === "all-off"
											? "shadow-cardinal-2"
											: "shadow-swan"
								}
								title="Toggle sounds for all students"
							>
								<Volume2 className="h-4 w-4" />
							</TactileButton>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					{classroomData?.students &&  (
						<Table>
							<TableHeader>
								<TableRow className="border-swan">
									<TableHead className="text-wolf font-semibold">#</TableHead>
									<TableHead className="text-wolf font-semibold">Username</TableHead>
									<TableHead className="text-wolf font-semibold text-center">Garage Controls</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{classroomData.students.map((student, index): React.ReactNode => (
									<TableRow key={student.username || index} className="border-swan hover:bg-polar/50">
										<TableCell className="font-medium text-wolf">
											{index + 1}
										</TableCell>
										<TableCell className="font-medium text-wolf">
											{student.username || "Unknown"}
										</TableCell>
										<TableCell>
											<div className="flex items-center justify-center gap-1">
												{/* Individual Student Garage Controls */}
												<TactileButton
													onClick={(): void => handleIndividualStudentControl(
														student.studentId,
														"driving",
														student.garageDrivingAllowed
													)}
													className={cn(
														"h-6 w-6 rounded flex items-center justify-center duration-150",
														student.garageDrivingAllowed
															? "bg-chargingGreen text-standardBackground"
															: "bg-cardinal text-standardBackground border border-cardinal"
													)}
													shadowHeight={4}
													shadowClass={
														student.garageDrivingAllowed
															? "shadow-chargingGreen-2"
															: "shadow-cardinal-2"
													}
													title={`Toggle driving for ${student.username}`}
												>
													<Car className="h-3 w-3" />
												</TactileButton>
												<TactileButton
													onClick={(): void => handleIndividualStudentControl(
														student.studentId,
														"lights",
														student.garageLightsAllowed
													)}
													className={cn(
														"h-6 w-6 rounded flex items-center justify-center duration-150",
														student.garageLightsAllowed
															? "bg-chargingGreen text-standardBackground"
															: "bg-cardinal text-standardBackground border border-cardinal"
													)}
													shadowHeight={4}
													shadowClass={
														student.garageLightsAllowed
															? "shadow-chargingGreen-2"
															: "shadow-cardinal-2"
													}
													title={`Toggle lights for ${student.username}`}
												>
													<Lightbulb className="h-3 w-3" />
												</TactileButton>
												<TactileButton
													onClick={(): void => handleIndividualStudentControl(
														student.studentId,
														"sounds",
														student.garageSoundsAllowed
													)}
													className={cn(
														"h-6 w-6 rounded flex items-center justify-center duration-150",
														student.garageSoundsAllowed
															? "bg-chargingGreen text-standardBackground"
															: "bg-cardinal text-standardBackground border border-cardinal"
													)}
													shadowHeight={4}
													shadowClass={
														student.garageSoundsAllowed
															? "shadow-chargingGreen-2"
															: "shadow-cardinal-2"
													}
													title={`Toggle sounds for ${student.username}`}
												>
													<Volume2 className="h-3 w-3" />
												</TactileButton>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>
		</div>
	)
}

export default observer(ClassroomPage)

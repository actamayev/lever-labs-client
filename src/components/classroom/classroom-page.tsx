/* eslint-disable no-nested-ternary */
"use client"

import { observer } from "mobx-react"
import { useCallback, useEffect } from "react"
import { ArrowLeft, Users, Car, Lightbulb, Volume2, Monitor } from "lucide-react"
import { ClassCode } from "@bluedotrobots/common-ts/types/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcn/ui/table"
import { TactileButton } from "../shadcn/ui/tactile-button"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import teacherClass from "../../classes/teacher-class"
import retrieveDetailedClassroomInfo from "../../utils/teacher/retrieve-detailed-classroom-info"
import updateDrivingStatusForAllStudents from "../../utils/teacher/update-driving-status-all-students"
import updateLightsStatusForAllStudents from "../../utils/teacher/update-lights-status-all-students"
import updateSoundsStatusForAllStudents from "../../utils/teacher/update-sounds-status-all-students"
import updateDisplayStatusForAllStudents from "../../utils/teacher/update-display-status-all-students"
import { getGarageStatusClasses } from "../../utils/garage-status-classes"
import ClassroomStatsCards from "./classroom-stats-cards"
import StudentGarageControls from "./student-garage-controls"
import ClassroomHubsSection from "./classroom-hubs-section"
import CustomTooltip from "../custom-tooltip"

// eslint-disable-next-line max-lines-per-function, complexity
function ClassroomPage({ classCode }: { classCode: ClassCode }): React.ReactNode {
	const navigate = useTypedNavigate()

	// Fetch detailed classroom data on component mount
	useEffect((): void => {
		retrieveDetailedClassroomInfo(classCode)
	}, [classCode])

	const classroomData = teacherClass.getDetailedClassroomData(classCode)

	useEffect((): void => {
		document.title = `${classroomData?.classroomName} | Blue Dot Robots`
	}, [classroomData?.classroomName])

	const handleBackClick = (): void => navigate("/class-manager")

	// Helper functions for garage control buttons
	const getGarageStatus = useCallback((statusType: GarageStatusType): GarageStatusValue => {
		if (!classroomData?.students || classroomData.students.length === 0) return "none"

		const allOn = classroomData.students.every((student): boolean => {
			switch (statusType) {
				case "driving": return student.garageDrivingAllowed
				case "lights": return student.garageLightsAllowed
				case "sounds": return student.garageSoundsAllowed
				case "display": return student.garageDisplayAllowed
				default: return false
			}
		})

		const allOff = classroomData.students.every((student): boolean => {
			switch (statusType) {
				case "driving": return !student.garageDrivingAllowed
				case "lights": return !student.garageLightsAllowed
				case "sounds": return !student.garageSoundsAllowed
				case "display": return !student.garageDisplayAllowed
				default: return false
			}
		})

		if (allOn) return "all-on"
		if (allOff) return "all-off"
		return "mixed"
	}, [classroomData])

	const handleGarageControlClick = useCallback((statusType: "driving" | "lights" | "sounds" | "display"): void => {
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
			case "display":
				updateDisplayStatusForAllStudents(classCode, newStatus)
				break
		}
	}, [classCode, getGarageStatus])


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

	if (!classroomData) {
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
					<div className="text-center">
						<div className="text-lg text-eel mb-2">Classroom not found</div>
						<div className="text-sm text-eel">This classroom may have been deleted or you may not have access to it.</div>
					</div>
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
					shadowHeight={4}
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
			/>

			<ClassroomHubsSection
				classCode={classCode}
			/>

			{/* Students Table */}
			<Card className="border-2 border-swan bg-standardBackground">
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="flex items-center gap-2">
								<Users className="h-5 w-5 text-humpback" />
								Students
							</CardTitle>
							<CardDescription>
								View all students enrolled in this classroom
							</CardDescription>
						</div>
						<div className="flex items-center gap-2">
							{/* Garage Control Buttons */}
							<CustomTooltip
								tooltipTrigger={
									<TactileButton
										onClick={(): void => handleGarageControlClick("driving")}
										className={getGarageStatusClasses(getGarageStatus("driving")).className}
										shadowHeight={4}
										shadowClass={getGarageStatusClasses(getGarageStatus("driving")).shadowClass}
									>
										<Car className="h-4 w-4" />
									</TactileButton>
								}
								tooltipContent={
									getGarageStatus("driving") === "all-on"
										? "Disable driving for all students"
										: getGarageStatus("driving") === "all-off"
											? "Enable driving for all students"
											: "Disable driving for all students"
								}
							/>
							<CustomTooltip
								tooltipTrigger={
									<TactileButton
										onClick={(): void => handleGarageControlClick("lights")}
										className={getGarageStatusClasses(getGarageStatus("lights")).className}
										shadowHeight={4}
										shadowClass={getGarageStatusClasses(getGarageStatus("lights")).shadowClass}
									>
										<Lightbulb className="h-4 w-4" />
									</TactileButton>
								}
								tooltipContent={
									getGarageStatus("lights") === "all-on"
										? "Disable lights for all students"
										: getGarageStatus("lights") === "all-off"
											? "Enable lights for all students"
											: "Disable lights for all students"
								}
							/>
							<CustomTooltip
								tooltipTrigger={
									<TactileButton
										onClick={(): void => handleGarageControlClick("sounds")}
										className={getGarageStatusClasses(getGarageStatus("sounds")).className}
										shadowHeight={4}
										shadowClass={getGarageStatusClasses(getGarageStatus("sounds")).shadowClass}
									>
										<Volume2 className="h-4 w-4" />
									</TactileButton>
								}
								tooltipContent={
									getGarageStatus("sounds") === "all-on"
										? "Disable sounds for all students"
										: getGarageStatus("sounds") === "all-off"
											? "Enable sounds for all students"
											: "Disable sounds for all students"
								}
							/>
							<CustomTooltip
								tooltipTrigger={
									<TactileButton
										onClick={(): void => handleGarageControlClick("display")}
										className={getGarageStatusClasses(getGarageStatus("display")).className}
										shadowHeight={4}
										shadowClass={getGarageStatusClasses(getGarageStatus("display")).shadowClass}
									>
										<Monitor className="h-4 w-4" />
									</TactileButton>
								}
								tooltipContent={
									getGarageStatus("display") === "all-on"
										? "Disable display for all students"
										: getGarageStatus("display") === "all-off"
											? "Enable display for all students"
											: "Disable display for all students"
								}
							/>
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
								{[...classroomData.students]
									.sort((a, b): number => a.studentId - b.studentId)
									.map((student, index): React.ReactNode => (
										<TableRow key={student.username || index} className="border-swan hover:bg-polar/50">
											<TableCell className="font-medium text-wolf">
												{index + 1}
											</TableCell>
											<TableCell className="font-medium text-wolf">
												{student.username || "Unknown"}
											</TableCell>
											<TableCell>
												<StudentGarageControls
													studentId={student.studentId}
													classCode={classCode}
												/>
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

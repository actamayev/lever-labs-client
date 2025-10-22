/* eslint-disable no-nested-ternary */
"use client"

import { observer } from "mobx-react"
import { useCallback } from "react"
import { Users, Car, Lightbulb, Volume2, Monitor } from "lucide-react"
import { ClassCode } from "@lever-labs/common-ts/types/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcn/ui/table"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { getGarageStatusClasses } from "../../utils/garage-status-classes"
import StudentGarageControls from "./student-garage-controls"
import CustomTooltip from "../custom-tooltip"
import updateDrivingStatusForAllStudents from "../../utils/teacher/update-driving-status-all-students"
import updateLightsStatusForAllStudents from "../../utils/teacher/update-lights-status-all-students"
import updateSoundsStatusForAllStudents from "../../utils/teacher/update-sounds-status-all-students"
import updateDisplayStatusForAllStudents from "../../utils/teacher/update-display-status-all-students"
import teacherClass from "../../classes/teacher-class"

// eslint-disable-next-line max-lines-per-function, complexity
function StudentsTable({ classCode }: { classCode: ClassCode }): React.ReactNode {
	// Helper function for garage control buttons
	const classroomData = teacherClass.getDetailedClassroomData(classCode)

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

	const handleGarageControlClick = useCallback((statusType: GarageStatusType): void => {
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

	return (
		<Card className="border-2 border-swan bg-standard-background">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle className="flex items-center gap-2">
							<Users className="h-5 w-5 text-humpback" />
							Students
							<span className="ml-2 text-sm font-normal text-eel bg-polar px-2 py-1 rounded-full border border-swan">
								{classroomData?.students?.length || 0} total
							</span>
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
				{classroomData?.students && (
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
	)
}

export default observer(StudentsTable)

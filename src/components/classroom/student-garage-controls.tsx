
"use client"

import { Car, Lightbulb, Volume2, Monitor } from "lucide-react"
import { ClassCode } from "@lever-labs/common-ts/types/utils"
import { TactileButton } from "../buttons/tactile-button"
import { cn } from "../../lib/utils"
import teacherClass from "../../classes/teacher-class"
import updateIndividualStudentDrivingStatus from "../../utils/teacher/update-individual-student-driving-status"
import updateIndividualStudentLightsStatus from "../../utils/teacher/update-individual-student-lights-status"
import updateIndividualStudentSoundsStatus from "../../utils/teacher/update-individual-student-sounds-status"
import updateIndividualStudentDisplayStatus from "../../utils/teacher/update-individual-student-display-status"
import { observer } from "mobx-react"
import CustomTooltip from "../custom-tooltip"

interface StudentGarageControlsProps {
	studentId: number
	classCode: ClassCode
}

// eslint-disable-next-line max-lines-per-function, complexity
function StudentGarageControls({
	studentId,
	classCode
}: StudentGarageControlsProps): React.ReactNode {
	// Get student data from teacher class
	const classroomData = teacherClass.getDetailedClassroomData(classCode)
	const student = classroomData?.students.find((s): boolean => s.studentId === studentId)

	if (!student) return null

	const { username, garageDrivingAllowed, garageLightsAllowed, garageSoundsAllowed, garageDisplayAllowed } = student

	const handleDrivingToggle = (): void => {
		updateIndividualStudentDrivingStatus(classCode, studentId, !garageDrivingAllowed)
	}

	const handleLightsToggle = (): void => {
		updateIndividualStudentLightsStatus(classCode, studentId, !garageLightsAllowed)
	}

	const handleSoundsToggle = (): void => {
		updateIndividualStudentSoundsStatus(classCode, studentId, !garageSoundsAllowed)
	}

	const handleDisplayToggle = (): void => {
		updateIndividualStudentDisplayStatus(classCode, studentId, !garageDisplayAllowed)
	}
	return (
		<div className="flex items-center justify-center gap-1">
			<CustomTooltip
				tooltipTrigger={
					<TactileButton
						onClick={handleDrivingToggle}
						className={cn(
							"h-6 w-6 rounded flex items-center justify-center duration-150",
							garageDrivingAllowed
								? "bg-charging-green text-standard-background border border-charging-green"
								: "bg-cardinal text-standard-background border border-cardinal"
						)}
						shadowHeight={4}
						shadowClass={
							garageDrivingAllowed
								? "shadow-charging-green-2"
								: "shadow-cardinal-2"
						}
					>
						<Car className="h-3 w-3" />
					</TactileButton>
				}
				tooltipContent={
					garageDrivingAllowed
						? `Disable driving for ${username}`
						: `Enable driving for ${username}`
				}
			/>
			<CustomTooltip
				tooltipTrigger={
					<TactileButton
						onClick={handleLightsToggle}
						className={cn(
							"h-6 w-6 rounded flex items-center justify-center duration-150",
							garageLightsAllowed
								? "bg-charging-green text-standard-background border border-charging-green"
								: "bg-cardinal text-standard-background border border-cardinal"
						)}
						shadowHeight={4}
						shadowClass={
							garageLightsAllowed
								? "shadow-charging-green-2"
								: "shadow-cardinal-2"
						}
					>
						<Lightbulb className="h-3 w-3" />
					</TactileButton>
				}
				tooltipContent={
					garageLightsAllowed
						? `Disable lights for ${username}`
						: `Enable lights for ${username}`
				}
			/>
			<CustomTooltip
				tooltipTrigger={
					<TactileButton
						onClick={handleSoundsToggle}
						className={cn(
							"h-6 w-6 rounded flex items-center justify-center duration-150",
							garageSoundsAllowed
								? "bg-charging-green text-standard-background border border-charging-green"
								: "bg-cardinal text-standard-background border border-cardinal"
						)}
						shadowHeight={4}
						shadowClass={
							garageSoundsAllowed
								? "shadow-charging-green-2"
								: "shadow-cardinal-2"
						}
					>
						<Volume2 className="h-3 w-3" />
					</TactileButton>
				}
				tooltipContent={
					garageSoundsAllowed
						? `Disable sounds for ${username}`
						: `Enable sounds for ${username}`
				}
			/>
			<CustomTooltip
				tooltipTrigger={
					<TactileButton
						onClick={handleDisplayToggle}
						className={cn(
							"h-6 w-6 rounded flex items-center justify-center duration-150",
							garageDisplayAllowed
								? "bg-charging-green text-standard-background border border-charging-green"
								: "bg-cardinal text-standard-background border border-cardinal"
						)}
						shadowHeight={4}
						shadowClass={
							garageDisplayAllowed
								? "shadow-charging-green-2"
								: "shadow-cardinal-2"
						}
					>
						<Monitor className="h-3 w-3" />
					</TactileButton>
				}
				tooltipContent={
					garageDisplayAllowed
						? `Disable display for ${username}`
						: `Enable display for ${username}`
				}
			/>
		</div>
	)
}

export default observer(StudentGarageControls)

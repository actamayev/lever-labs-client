"use client"

import { ClassCode, ScoreboardUUID } from "@lever-labs/common-ts/types/utils"
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react"
import { Users, X, Plus } from "lucide-react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose
} from "../shadcn/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/ui/card"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { cn } from "../../lib/shadcn/utils"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import teacherClass from "../../classes/teacher-class"
import addStudentToScoreboard from "../../utils/teacher/scoreboard/add-student-to-scoreboard"
import removeStudentFromScoreboard from "../../utils/teacher/scoreboard/remove-student-from-scoreboard"
import { StudentJoinedScoreboardData } from "@lever-labs/common-ts/types/scoreboard"
import { observer } from "mobx-react"

interface Props {
	classCode: ClassCode
	scoreboardId: ScoreboardUUID
	teamNumber: 1 | 2
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

// eslint-disable-next-line max-lines-per-function
function TeamMemberAssignmentDialog(props: Props): React.ReactNode {
	const { classCode, scoreboardId, teamNumber, isOpen, setIsOpen } = props
	const [isLoading, setIsLoading] = useState(false)
	const colors = getDuolingoColors("humpback")

	const scoreboardData = teacherClass.getScoreboardData(scoreboardId)
	const classroomData = teacherClass.getDetailedClassroomData(classCode)

	const currentTeamStudents = useMemo((): StudentJoinedScoreboardData[] => {
		if (!scoreboardData) return []
		return teamNumber === 1 ? scoreboardData.team1Stats.students : scoreboardData.team2Stats.students
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scoreboardData, teamNumber, scoreboardData?.team1Stats.students.length, scoreboardData?.team2Stats.students.length])

	const availableStudents = useMemo((): StudentJoinedScoreboardData[] => {
		if (!classroomData?.students) return []

		const assignedStudentIds = new Set([
			...scoreboardData?.team1Stats.students.map((s): number => s.studentId) || [],
			...scoreboardData?.team2Stats.students.map((s): number => s.studentId) || []
		])

		return classroomData.students
			.map((student): StudentJoinedScoreboardData => ({
				studentId: student.studentId,
				username: student.username
			}))
			.filter((student): boolean => !assignedStudentIds.has(student.studentId))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [classroomData, scoreboardData, scoreboardData?.team1Stats.students.length, scoreboardData?.team2Stats.students.length])

	const handleAddStudent = useCallback(async (studentId: number): Promise<void> => {
		setIsLoading(true)
		try {
			await addStudentToScoreboard(classCode, studentId, scoreboardId, teamNumber)
		} finally {
			setIsLoading(false)
		}
	}, [classCode, scoreboardId, teamNumber])

	const handleRemoveStudent = useCallback(async (studentId: number): Promise<void> => {
		setIsLoading(true)
		try {
			await removeStudentFromScoreboard(classCode, studentId, scoreboardId, teamNumber)
		} finally {
			setIsLoading(false)
		}
	}, [classCode, scoreboardId, teamNumber])

	const handleClose = useCallback((): void => {
		setIsOpen(false)
	}, [setIsOpen])

	if (!scoreboardData || !classroomData) return null

	const teamName = teamNumber === 1 ? scoreboardData.team1Stats.teamName : scoreboardData.team2Stats.teamName

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="w-96 border-none max-h-[80vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="text-2xl">Assign Students to {teamName}</DialogTitle>
					<DialogClose />
				</DialogHeader>

				<div className="space-y-4">
					{/* Current Team Members */}
					<Card className="border-2 border-swan bg-standard-background">
						<CardHeader className="pb-3">
							<CardTitle className="flex items-center gap-2 text-lg">
								<Users className="h-5 w-5 text-humpback" />
								Current Team Members ({currentTeamStudents.length})
							</CardTitle>
						</CardHeader>
						<CardContent>
							{currentTeamStudents.length === 0 ? (
								<p className="text-eel text-sm">No students assigned to this team yet.</p>
							) : (
								<div className="space-y-2">
									{currentTeamStudents.map((student): React.ReactNode => (
										<div
											key={student.studentId}
											className="flex items-center justify-between p-2 bg-polar rounded-lg border border-swan"
										>
											<span className="text-wolf font-medium">{student.username}</span>
											<TactileButton
												onClick={(): void => void handleRemoveStudent(student.studentId)}
												className="px-2 py-1 rounded-lg text-sm text-white bg-cardinal"
												shadowHeight={2}
												shadowClass="shadow-cardinal"
												disabled={isLoading}
											>
												<X className="h-3 w-3" />
											</TactileButton>
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>

					{/* Available Students */}
					<Card className="border-2 border-swan bg-standard-background">
						<CardHeader className="pb-3">
							<CardTitle className="flex items-center gap-2 text-lg">
								<Plus className="h-5 w-5 text-humpback" />
								Available Students ({availableStudents.length})
							</CardTitle>
						</CardHeader>
						<CardContent>
							{availableStudents.length === 0 ? (
								<p className="text-eel text-sm">All students are already assigned to teams.</p>
							) : (
								<div className="space-y-2">
									{availableStudents.map((student): React.ReactNode => (
										<div
											key={student.studentId}
											className="flex items-center justify-between p-2 bg-polar rounded-lg border border-swan"
										>
											<span className="text-wolf font-medium">{student.username}</span>
											<TactileButton
												onClick={(): void => void handleAddStudent(student.studentId)}
												className={cn("px-2 py-1 rounded-lg text-sm text-white", colors.bg)}
												shadowHeight={2}
												shadowClass={colors.shadow2}
												disabled={isLoading}
											>
												<Plus className="h-3 w-3" />
											</TactileButton>
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				</div>

				<DialogFooter className="flex justify-end">
					<TactileButton
						onClick={handleClose}
						className="px-6 py-2 rounded-xl text-lg text-white bg-eel dark:bg-swan"
						shadowHeight={4}
						shadowClass="shadow-hare"
						disabled={isLoading}
					>
						Close
					</TactileButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default observer(TeamMemberAssignmentDialog)

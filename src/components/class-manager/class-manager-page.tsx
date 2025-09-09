
"use client"

import { BookOpen } from "lucide-react"
import { observer } from "mobx-react"
import { useState, useEffect, useCallback } from "react"
import { BasicTeacherClassroomData } from "@bluedotrobots/common-ts/types/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/ui/card"
import getTeacherClass from "../../classes/teacher-class"
import CreateClassroomDialog from "./create-classroom-dialog"
import RenameClassroomDialog from "./rename-classroom-dialog"
import retrieveTeacherClassrooms from "../../utils/teacher/retrieve-teacher-classrooms"
import SingleClassCard from "./single-class-card"
import ClassManagerStatsCards from "./class-manager-stats-cards"


function ClassManagerPage(): React.ReactNode {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
	const [selectedClassroom, setSelectedClassroom] = useState<BasicTeacherClassroomData | null>(null)
	const [newClassroomName, setNewClassroomName] = useState("")

	// Fetch classroom data on component mount
	useEffect((): void => {
		retrieveTeacherClassrooms()
	}, [])

	const handleRenameClick = useCallback((e: React.MouseEvent, classroom: BasicTeacherClassroomData): void => {
		e.stopPropagation()
		setSelectedClassroom(classroom)
		setNewClassroomName(classroom.classroomName)
		setIsRenameDialogOpen(true)
	}, [])

	if (getTeacherClass().isRetrievingClassroomData) {
		return (
			<div className="p-6">
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="text-lg text-eel">Loading your classrooms...</div>
				</div>
			</div>
		)
	}

	return (
		<div className="p-6 max-w-7xl mx-auto">
			{/* Page Title */}
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-wolf mb-2">Class Manager</h1>
				<p className="text-eel text-lg">Create and manage your robotics classrooms</p>
			</div>

			<ClassManagerStatsCards setIsCreateDialogOpen={setIsCreateDialogOpen} />

			{/* Classrooms Section */}
			<Card className="border-2 border-swan bg-standardBackground">
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="flex items-center gap-2">
								<BookOpen className="h-5 w-5 text-pipTheme" />
								Your Classrooms
							</CardTitle>
							<CardDescription>
								Manage your robotics classrooms and student enrollments
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{getTeacherClass().classroomData.map((classroom): React.ReactNode => (
							<SingleClassCard
								key={classroom.classCode}
								classroom={classroom}
								handleRenameClick={handleRenameClick}
							/>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Create Classroom Dialog */}
			<CreateClassroomDialog
				isOpen={isCreateDialogOpen}
				onOpenChange={setIsCreateDialogOpen}
			/>

			{/* Rename Classroom Dialog */}
			{selectedClassroom && (
				<RenameClassroomDialog
					classCode={selectedClassroom.classCode}
					isRenameDialogOpen={isRenameDialogOpen}
					setIsRenameDialogOpen={setIsRenameDialogOpen}
					newClassroomName={newClassroomName}
					setNewClassroomName={setNewClassroomName}
				/>
			)}
		</div>
	)
}

export default observer(ClassManagerPage)

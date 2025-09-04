
"use client"

import { Plus, Users, BookOpen, Calendar } from "lucide-react"
import { observer } from "mobx-react"
import { useState, useEffect, useCallback } from "react"
import { BasicTeacherClassroomData } from "@bluedotrobots/common-ts"
import { cn } from "../../lib/shadcn/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/ui/card"
import teacherClass from "../../classes/teacher-class"
import { TactileButton } from "../shadcn/ui/tactile-button"
import CreateClassroomDialog from "./create-classroom-dialog"
import RenameClassroomDialog from "./rename-classroom-dialog"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import retrieveTeacherClassrooms from "../../utils/teacher/retrieve-teacher-classrooms"
import SingleClassCard from "./single-class-card"

// eslint-disable-next-line max-lines-per-function
function ClassManagerPage(): React.ReactNode {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
	const [selectedClassroom, setSelectedClassroom] = useState<BasicTeacherClassroomData | null>(null)
	const [newClassroomName, setNewClassroomName] = useState("")

	const colors = getDuolingoColors("humpback")

	// Fetch classroom data on component mount
	useEffect((): void => {
		retrieveTeacherClassrooms()
	}, [])

	const handleCreateClick = useCallback((): void => {
		setIsCreateDialogOpen(true)
	}, [])

	const handleRenameClick = useCallback((e: React.MouseEvent, classroom: BasicTeacherClassroomData): void => {
		e.stopPropagation()
		setSelectedClassroom(classroom)
		setNewClassroomName(classroom.classroomName)
		setIsRenameDialogOpen(true)
	}, [])

	if (teacherClass.isRetrievingClassroomData) {
		return (
			<div className="p-6">
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="text-lg text-eel">Loading your classrooms...</div>
				</div>
			</div>
		)
	}

	const totalClasses = teacherClass.classroomData.length
	const activeClasses = totalClasses // All classes are considered active for now

	return (
		<div className="p-6 max-w-7xl mx-auto">
			{/* Page Title */}
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-wolf mb-2">Class Manager</h1>
				<p className="text-eel text-lg">Create and manage your robotics classrooms</p>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<Card className="border-2 border-swan bg-standardBackground">
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center gap-2 text-lg">
							<BookOpen className="h-5 w-5 text-pipTheme" />
							Total Classes
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-wolf">
							{totalClasses}
						</div>
						<p className="text-sm text-eel mt-1">classrooms created</p>
					</CardContent>
				</Card>

				<Card className="border-2 border-swan bg-standardBackground">
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center gap-2 text-lg">
							<Users className="h-5 w-5 text-pipTheme" />
							Active Classes
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-wolf">
							{activeClasses}
						</div>
						<p className="text-sm text-eel mt-1">currently running</p>
					</CardContent>
				</Card>

				<Card className="border-2 border-swan bg-standardBackground">
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center gap-2 text-lg">
							<Calendar className="h-5 w-5 text-pipTheme" />
							Quick Actions
						</CardTitle>
					</CardHeader>
					<CardContent>
						<TactileButton
							onClick={handleCreateClick}
							className={cn("w-full h-10 text-white rounded-xl", colors.bg)}
							shadowHeight={4}
							shadowClass={colors.shadow2}
						>
							<Plus className="h-4 w-4" />
							New Class
						</TactileButton>
					</CardContent>
				</Card>
			</div>

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
						<TactileButton
							onClick={handleCreateClick}
							className={cn("text-white rounded-xl", colors.bg)}
							shadowHeight={4}
							shadowClass={colors.shadow2}
						>
							<Plus className="h-4 w-4" />
							Create Class
						</TactileButton>
					</div>
				</CardHeader>
				<CardContent>
					{totalClasses === 0 ? (
						<div className="text-center py-12">
							<BookOpen className="h-12 w-12 text-eel mx-auto mb-4 opacity-50" />
							<h3 className="text-lg font-medium text-wolf mb-2">No classrooms yet</h3>
							<p className="text-eel mb-6">
								Create your first robotics classroom to get started with teaching.
							</p>
							<TactileButton
								onClick={handleCreateClick}
								className={cn("h-12 px-8 rounded-xl text-lg text-white", colors.bg)}
								shadowHeight={4}
								shadowClass={colors.shadow2}
							>
								<div className="flex items-center justify-center">
									<Plus className="h-5 w-5 mr-2" />
									CREATE FIRST CLASS
								</div>
							</TactileButton>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{teacherClass.classroomData.map((classroom): React.ReactNode => (
								<SingleClassCard
									key={classroom.classCode}
									classroom={classroom}
									handleRenameClick={handleRenameClick}
								/>
							))}
						</div>
					)}
				</CardContent>
			</Card>

			{/* Floating Add Button - Only show when there are existing classes */}
			{totalClasses > 0 && (
				<TactileButton
					onClick={handleCreateClick}
					className={cn(
						"fixed bottom-8 right-8 h-14 w-14 rounded-full text-white z-50",
						colors.bg
					)}
					shadowHeight={4}
					shadowClass={colors.shadow2}
				>
					<Plus className="h-6 w-6" />
				</TactileButton>
			)}

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

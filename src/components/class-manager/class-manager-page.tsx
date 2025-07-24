/* eslint-disable max-len */
"use client"

import { Plus } from "lucide-react"
import { observer } from "mobx-react"
import { useState, useEffect, useCallback } from "react"
import { BasicTeacherClassroomData } from "@bluedotrobots/common-ts"
import { cn } from "../../lib/shadcn/utils"
import teacherClass from "../../classes/teacher-class"
import { TactileButton } from "../shadcn/ui/tactile-button"
import CreateClassroomDialog from "./create-classroom-dialog"
import RenameClassroomDialog from "./rename-classroom-dialog"
import { getDuolingoColors } from "../../utils/get-duolingo-colors"
import retrieveTeacherClassrooms from "../../utils/teacher/retrieve-teacher-classrooms"
import SingleClassCard from "./single-class-card"

// eslint-disable-next-line max-lines-per-function
function ClassManagerPage() {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
	const [selectedClassroom, setSelectedClassroom] = useState<BasicTeacherClassroomData | null>(null)
	const [newClassroomName, setNewClassroomName] = useState("")

	const colors = getDuolingoColors("humpback")

	// Fetch classroom data on component mount
	useEffect(() => {
		retrieveTeacherClassrooms()
	}, [])

	const handleCreateClick = useCallback(() => {
		setIsCreateDialogOpen(true)
	}, [])

	const handleRenameClick = useCallback((e: React.MouseEvent, classroom: BasicTeacherClassroomData) => {
		e.stopPropagation()
		setSelectedClassroom(classroom)
		setNewClassroomName(classroom.classroomName)
		setIsRenameDialogOpen(true)
	}, [])

	if (teacherClass.isRetrievingClassroomData) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-lg text-eel">Loading your classrooms...</div>
			</div>
		)
	}

	return (
		<div className="pt-40 pl-5 pr-5 relative">
			{/* Classrooms Grid */}
			{teacherClass.classroomData.length === 0 ? (
				<div className="text-center">
					<div className="text-eel font-light mb-6">
						Add a class to get started
					</div>
					<TactileButton
						onClick={handleCreateClick}
						className={cn("h-12 px-8 rounded-xl text-lg text-white", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow2}
					>
						<div className="flex items-center justify-center">
							<Plus className="h-5 w-5 mr-2" />
							CREATE CLASS
						</div>
					</TactileButton>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{teacherClass.classroomData.map((classroom) => (
							<SingleClassCard
								key={classroom.classCode}
								classroom={classroom}
								handleRenameClick={handleRenameClick}
							/>
						))}
					</div>

					{/* Floating Add Button */}
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
				</>
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

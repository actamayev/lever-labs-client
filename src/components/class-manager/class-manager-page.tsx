"use client"

import { Plus } from "lucide-react"
import { observer } from "mobx-react"
import { useState, useEffect } from "react"
import { ClassCode } from "@bluedotrobots/common-ts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/ui/card"
import { cn } from "../../lib/shadcn/utils"
import teacherClass from "../../classes/teacher-class"
import { TactileButton } from "../shadcn/ui/tactile-button"
import CreateClassroomDialog from "./create-classroom-dialog"
import { getDuolingoColors } from "../../utils/duolingo-utils"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import retrieveTeacherClassrooms from "../../utils/teacher/retrieve-teacher-classrooms"

function ClassManagerPage() {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const colors = getDuolingoColors("humpback")
	const navigate = useTypedNavigate()

	// Fetch classroom data on component mount
	useEffect(() => {
		retrieveTeacherClassrooms()
	}, [])

	const handleClassroomClick = (classCode: ClassCode) => {
		navigate(`/class-manager/${classCode}`)
	}

	if (teacherClass.isRetrievingClassroomData) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-lg text-eel">Loading your classrooms...</div>
			</div>
		)
	}

	return (
		<div className="pt-40">
			{/* Classrooms Grid */}
			{teacherClass.classroomData.length === 0 ? (
				<div className="text-center">
					<div className="text-eel font-light mb-6">
						Add a class to get started
					</div>
					<TactileButton
						onClick={() => setIsCreateDialogOpen(true)}
						className={cn("h-12 px-8 rounded-xl text-lg text-white", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow}
					>
						<div className="flex items-center justify-center">
							<Plus className="h-5 w-5 mr-2" />
							Create class
						</div>
					</TactileButton>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{teacherClass.classroomData.map((classroom) => (
						<Card
							key={classroom.classCode}
							className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-swan bg-polar"
							onClick={() => handleClassroomClick(classroom.classCode)}
						>
							<CardHeader className="pb-3">
								<CardTitle className="text-xl text-wolf line-clamp-2">
									{classroom.classroomName}
								</CardTitle>
								<div className="text-sm text-gray-500 font-mono">
									Code: {classroom.classCode}
								</div>
							</CardHeader>
							{classroom.classroomDescription && (
								<CardContent className="pt-0">
									<CardDescription className="text-eel line-clamp-3">
										{classroom.classroomDescription}
									</CardDescription>
								</CardContent>
							)}
						</Card>
					))}
				</div>
			)}

			{/* Create Classroom Dialog */}
			<CreateClassroomDialog
				isOpen={isCreateDialogOpen}
				onOpenChange={setIsCreateDialogOpen}
			/>
		</div>
	)
}

export default observer(ClassManagerPage)

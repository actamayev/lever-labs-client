"use client"

import { Plus } from "lucide-react"
import { observer } from "mobx-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/ui/card"
import { cn } from "../../lib/shadcn/utils"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { getDuolingoColors } from "../../utils/duolingo-utils"
import teacherClass from "../../classes/teacher-class"
import retrieveTeacherClassrooms from "../../utils/teacher/retrieve-teacher-classrooms"
import CreateClassroomDialog from "./create-classroom-dialog"

function ClassManagerPage() {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
	const router = useRouter()
	const colors = getDuolingoColors("humpback")

	// Fetch classroom data on component mount
	useEffect(() => {
		retrieveTeacherClassrooms()
	}, [])

	const handleClassroomClick = (classCode: string) => {
		router.push(`/c/${classCode}`)
	}

	if (teacherClass.isRetrievingClassroomData) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-lg text-eel">Loading your classrooms...</div>
			</div>
		)
	}

	return (
		<div className="p-6">
			{/* Classrooms Grid */}
			{teacherClass.classroomData.length === 0 ? (
				<div className="text-center py-16">
					<div className="text-xl text-wolf mb-4">No classrooms yet</div>
					<div className="text-eel font-light mb-6">
						Create your first classroom to start managing students and assignments.
					</div>
					<TactileButton
						onClick={() => setIsCreateDialogOpen(true)}
						className={cn("h-12 px-8 rounded-xl text-lg text-white", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow}
					>
						<Plus className="h-5 w-5 mr-2" />
						Create Your First Classroom
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

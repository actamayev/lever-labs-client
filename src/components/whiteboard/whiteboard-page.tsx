/* eslint-disable max-len */
"use client"

import { Plus } from "lucide-react"
import { observer } from "mobx-react"
import { useState, useCallback } from "react"
import { cn } from "../../lib/shadcn/utils"
import studentClass from "../../classes/student-class"
import JoinClassroomDialog from "./join-classroom-dialog"
import { TactileButton } from "../shadcn/ui/tactile-button"
import SingleWhiteboardCard from "./single-whiteboard-card"
import { getDuolingoColors } from "../../utils/get-duolingo-colors"

// eslint-disable-next-line max-lines-per-function
function WhiteboardPage() {
	const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)

	const colors = getDuolingoColors("humpback")

	const handleJoinClick = useCallback(() => {
		setIsJoinDialogOpen(true)
	}, [])

	if (studentClass.isRetrievingStudentData) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-lg text-eel">Loading your classrooms...</div>
			</div>
		)
	}

	return (
		<div className="pt-40 pl-5 pr-5 relative">
			{/* Classrooms Grid */}
			{studentClass.classroomData.length === 0 ? (
				<div className="text-center">
					<div className="text-eel font-light mb-6">
						Add a class to get started
					</div>
					<TactileButton
						onClick={handleJoinClick}
						className={cn("h-12 px-8 rounded-xl text-lg text-white", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow2}
					>
						<div className="flex items-center justify-center">
							<Plus className="h-5 w-5 mr-2" />
							JOIN CLASS
						</div>
					</TactileButton>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{studentClass.classroomData.map((classroom) => (
							<SingleWhiteboardCard
								key={classroom.classCode}
								classroom={classroom}
							/>
						))}
					</div>

					{/* Floating Add Button */}
					<TactileButton
						onClick={handleJoinClick}
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
			<JoinClassroomDialog
				isOpen={isJoinDialogOpen}
				onOpenChange={setIsJoinDialogOpen}
			/>
		</div>
	)
}

export default observer(WhiteboardPage)

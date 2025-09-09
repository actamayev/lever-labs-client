
"use client"

import { observer } from "mobx-react"
import { useState } from "react"
import { BookOpen } from "lucide-react"
import getStudentClass from "../../classes/student-class"
import JoinClassroomDialog from "./join-classroom-dialog"
import SingleWhiteboardCard from "./single-whiteboard-card"
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/ui/card"
import WhiteboardStatsCards from "./whiteboard-stats-cards"

function WhiteboardPage(): React.ReactNode {
	const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)

	if (getStudentClass().isRetrievingStudentData) {
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
				<h1 className="text-4xl font-bold text-wolf mb-2">Whiteboard</h1>
				<p className="text-eel text-lg">Access your robotics classroom whiteboards</p>
			</div>

			<WhiteboardStatsCards setIsJoinDialogOpen={setIsJoinDialogOpen} />

			{/* Classrooms Section */}
			<Card className="border-2 border-swan bg-standardBackground">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="flex items-center gap-2">
							<BookOpen className="h-5 w-5 text-pipTheme" />
							Your Classrooms
						</CardTitle>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{getStudentClass().classroomData.map((classroom): React.ReactNode => (
							<SingleWhiteboardCard
								key={classroom.classCode}
								classroom={classroom}
							/>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Join Classroom Dialog */}
			<JoinClassroomDialog
				isOpen={isJoinDialogOpen}
				onOpenChange={setIsJoinDialogOpen}
			/>
		</div>
	)
}

export default observer(WhiteboardPage)

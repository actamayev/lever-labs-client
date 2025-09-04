
"use client"

import { Plus, Users, BookOpen, Calendar } from "lucide-react"
import { observer } from "mobx-react"
import { useState, useCallback } from "react"
import { cn } from "../../lib/shadcn/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/ui/card"
import studentClass from "../../classes/student-class"
import JoinClassroomDialog from "./join-classroom-dialog"
import { TactileButton } from "../shadcn/ui/tactile-button"
import SingleWhiteboardCard from "./single-whiteboard-card"
import getDuolingoColors from "../../utils/get-duolingo-colors"

// eslint-disable-next-line max-lines-per-function
function WhiteboardPage(): React.ReactNode {
	const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false)

	const colors = getDuolingoColors("humpback")

	const handleJoinClick = useCallback((): void => {
		setIsJoinDialogOpen(true)
	}, [])

	if (studentClass.isRetrievingStudentData) {
		return (
			<div className="p-6">
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="text-lg text-eel">Loading your classrooms...</div>
				</div>
			</div>
		)
	}

	const totalClasses = studentClass.classroomData.length
	const activeClasses = totalClasses // All classes are considered active for now

	return (
		<div className="p-6 max-w-7xl mx-auto">
			{/* Page Title */}
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-wolf mb-2">Whiteboard</h1>
				<p className="text-eel text-lg">Access your robotics classroom whiteboards</p>
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
						<p className="text-sm text-eel mt-1">classroom{totalClasses === 1 ? "" : "s"} joined</p>
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
						<p className="text-sm text-eel mt-1">currently available</p>
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
							onClick={handleJoinClick}
							className={cn("w-full h-10 text-white rounded-xl", colors.bg)}
							shadowHeight={4}
							shadowClass={colors.shadow2}
						>
							<Plus className="h-4 w-4" />
							Join Class
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
								Access whiteboards for your enrolled robotics classrooms
							</CardDescription>
						</div>
						<TactileButton
							onClick={handleJoinClick}
							className={cn("text-white rounded-xl", colors.bg)}
							shadowHeight={4}
							shadowClass={colors.shadow2}
						>
							<Plus className="h-4 w-4" />
							Join Class
						</TactileButton>
					</div>
				</CardHeader>
				<CardContent>
					{totalClasses === 0 ? (
						<div className="text-center py-12">
							<BookOpen className="h-12 w-12 text-eel mx-auto mb-4 opacity-50" />
							<h3 className="text-lg font-medium text-wolf mb-2">No classrooms yet</h3>
							<p className="text-eel mb-6">
								Join a robotics classroom to access its whiteboard.
							</p>
							<TactileButton
								onClick={handleJoinClick}
								className={cn("h-12 px-8 rounded-xl text-lg text-white", colors.bg)}
								shadowHeight={4}
								shadowClass={colors.shadow2}
							>
								<div className="flex items-center justify-center">
									<Plus className="h-5 w-5 mr-2" />
									JOIN FIRST CLASS
								</div>
							</TactileButton>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{studentClass.classroomData.map((classroom): React.ReactNode => (
								<SingleWhiteboardCard
									key={classroom.classCode}
									classroom={classroom}
								/>
							))}
						</div>
					)}
				</CardContent>
			</Card>

			{/* Floating Add Button - Only show when there are existing classes */}
			{totalClasses > 0 && (
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
			)}

			{/* Join Classroom Dialog */}
			<JoinClassroomDialog
				isOpen={isJoinDialogOpen}
				onOpenChange={setIsJoinDialogOpen}
			/>
		</div>
	)
}

export default observer(WhiteboardPage)

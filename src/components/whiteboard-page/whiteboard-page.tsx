"use client"

import { useEffect } from "react"
import { observer } from "mobx-react"
import { ArrowLeft, Users, Hash, BookOpen, Calendar } from "lucide-react"
import { ClassCode } from "@bluedotrobots/common-ts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/ui/card"
import { TactileButton } from "../shadcn/ui/tactile-button"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import studentClass from "../../classes/student-class"

interface ClassroomPageProps {
	classCode: ClassCode
}

// eslint-disable-next-line max-lines-per-function
function SingleWhiteboardPage({ classCode }: ClassroomPageProps): React.ReactNode {
	const navigate = useTypedNavigate()

	const classroomData = studentClass.getClassroomData(classCode)

	useEffect((): void => {
		document.title = `${classroomData?.classroomName} | Blue Dot Robots`
	}, [classroomData?.classroomName])

	const handleBackClick = (): void => navigate("/whiteboard")

	if (studentClass.isRetrievingStudentData) {
		return (
			<div className="p-6">
				<div className="flex items-center gap-4 mb-8">
					<TactileButton
						onClick={handleBackClick}
						className="flex items-center gap-2 h-10 px-4 rounded-xl text-lg bg-polar text-eel border border-swan"
						shadowHeight={2}
						shadowClass="shadow-gray-300"
					>
						<ArrowLeft className="h-4 w-4" />
						Back
					</TactileButton>
				</div>
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="text-lg text-eel">Loading classroom details...</div>
				</div>
			</div>
		)
	}

	return (
		<div className="p-6 max-w-7xl mx-auto">
			{/* Header with back button */}
			<div className="flex items-center gap-4 mb-8">
				<TactileButton
					onClick={handleBackClick}
					className="flex items-center gap-2 h-10 px-4 rounded-xl text-lg bg-polar text-eel border border-swan hover:bg-gray-50"
					shadowHeight={2}
					shadowClass="shadow-gray-300"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Whiteboard
				</TactileButton>
			</div>

			{/* Page Title */}
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-wolf mb-2">
					{classroomData?.classroomName || "Classroom"}
				</h1>
				<p className="text-eel text-lg">Interactive whiteboard for robotics learning</p>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<Card className="border-2 border-swan bg-standardBackground">
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center gap-2 text-lg">
							<Hash className="h-5 w-5 text-pipTheme" />
							Class Code
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-mono font-bold text-wolf bg-polar px-4 py-2 rounded-lg border border-swan">
							{classCode}
						</div>
					</CardContent>
				</Card>

				<Card className="border-2 border-swan bg-standardBackground">
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center gap-2 text-lg">
							<BookOpen className="h-5 w-5 text-pipTheme" />
							Class Status
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-green-600">
							Active
						</div>
						<p className="text-sm text-eel mt-1">whiteboard available</p>
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
							className="w-full h-10 bg-pipTheme text-white hover:bg-pipTheme/90 rounded-xl"
							shadowHeight={2}
							shadowClass="shadow-pipTheme/30"
						>
							Open Whiteboard
						</TactileButton>
					</CardContent>
				</Card>
			</div>

			{/* Whiteboard Section */}
			<Card className="border-2 border-swan bg-standardBackground">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<BookOpen className="h-5 w-5 text-pipTheme" />
						Interactive Whiteboard
					</CardTitle>
					<CardDescription>
						Collaborative whiteboard for classroom activities and robotics projects
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="text-center py-16">
						<BookOpen className="h-16 w-16 text-eel mx-auto mb-6 opacity-50" />
						<h3 className="text-xl font-medium text-wolf mb-3">Whiteboard Coming Soon</h3>
						<p className="text-eel mb-6 max-w-md mx-auto">
							Interactive whiteboard features are currently in development. You'll soon be able to collaborate with your classmates on robotics projects and learning activities.
						</p>
						<TactileButton
							className="bg-pipTheme text-white hover:bg-pipTheme/90 rounded-xl"
							shadowHeight={2}
							shadowClass="shadow-pipTheme/30"
						>
							Get Notified
						</TactileButton>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default observer(SingleWhiteboardPage)

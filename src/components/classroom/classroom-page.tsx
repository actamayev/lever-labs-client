"use client"

import { observer } from "mobx-react"
import { useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { ClassCode } from "@bluedotrobots/common-ts/types/utils"
import { TactileButton } from "../shadcn/ui/tactile-button"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import teacherClass from "../../classes/teacher-class"
import retrieveDetailedClassroomInfo from "../../utils/teacher/retrieve-detailed-classroom-info"
import ClassroomStatsCards from "./classroom-stats-cards"
import ClassroomHubsSection from "./classroom-hubs-section"
import ClassroomScoreboardSection from "./classroom-scoreboard-section"
import StudentsTable from "./students-table"

function ClassroomPage({ classCode }: { classCode: ClassCode }): React.ReactNode {
	const navigate = useTypedNavigate()

	// Fetch detailed classroom data on component mount
	useEffect((): void => {
		retrieveDetailedClassroomInfo(classCode)
	}, [classCode])

	const classroomData = teacherClass.getDetailedClassroomData(classCode)

	useEffect((): void => {
		document.title = `${classroomData?.classroomName} | Blue Dot Robots`
	}, [classroomData?.classroomName])

	const handleBackClick = (): void => navigate("/class-manager")


	if (teacherClass.isRetrievingDetailedData) {
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

	if (!classroomData) {
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
					<div className="text-center">
						<div className="text-lg text-eel mb-2">Classroom not found</div>
						<div className="text-sm text-eel">This classroom may have been deleted or you may not have access to it.</div>
					</div>
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
					className="flex items-center gap-2 h-10 px-4 rounded-xl text-lg bg-polar text-eel
					border border-swan hover:bg-gray-50 dark:hover:bg-swan"
					shadowHeight={4}
					shadowClass="shadow-gray-300"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Class Manager
				</TactileButton>
			</div>

			{/* Page Title */}
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-wolf mb-2">
					{classroomData?.classroomName || "Classroom"}
				</h1>
				<p className="text-eel text-lg">Manage your classroom and view student information</p>
			</div>

			<ClassroomStatsCards classCode={classCode} />

			<ClassroomHubsSection classCode={classCode} />

			<ClassroomScoreboardSection classCode={classCode} />

			{/* Students Table */}
			<StudentsTable classCode={classCode} />
		</div>
	)
}

export default observer(ClassroomPage)

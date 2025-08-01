"use client"

import { useEffect } from "react"
import { observer } from "mobx-react"
import { ArrowLeft } from "lucide-react"
import { ClassCode } from "@bluedotrobots/common-ts"
import teacherClass from "../../classes/teacher-class"
import { TactileButton } from "../shadcn/ui/tactile-button"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import retrieveDetailedClassroomInfo from "../../utils/teacher/retrieve-detailed-classroom-info"

interface ClassroomPageProps {
	classCode: ClassCode
}

function ClassroomPage({ classCode }: ClassroomPageProps) {
	const navigate = useTypedNavigate()

	// Fetch detailed classroom data on component mount
	useEffect(() => {
		retrieveDetailedClassroomInfo(classCode)
	}, [classCode])

	const classroomData = teacherClass.getDetailedClassroomData(classCode)

	useEffect(() => {
		document.title = `${classroomData?.classroomName} | Blue Dot Robots`
	}, [classroomData?.classroomName])

	const handleBackClick = () => navigate("/class-manager")

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

	return (
		<div className="p-6">
			{/* Header with back button */}
			<div className="flex items-center gap-4 mb-8">
				<TactileButton
					onClick={handleBackClick}
					className="flex items-center gap-2 h-10 px-4 rounded-xl text-lg bg-polar text-eel border border-swan hover:bg-gray-50"
					shadowHeight={2}
					shadowClass="shadow-gray-300"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Class Manager
				</TactileButton>
			</div>

			{/* Classroom Info */}
			<div className="max-w-2xl">
				<h1 className="text-3xl font-bold text-wolf mb-4">
					{classroomData?.classroomName || "Classroom"}
				</h1>

				<div className="bg-polar border border-swan rounded-xl p-6 mb-6">
					<h2 className="text-xl font-semibold text-eel mb-4">Classroom Details</h2>
					<div className="space-y-3">
						<div>
							<span className="text-wolf font-medium">Class Code: </span>
							<span className="font-mono text-lg bg-white px-3 py-1 rounded border">
								{classCode}
							</span>
						</div>

						{classroomData?.students && (
							<div>
								<span className="text-wolf font-medium">Students: </span>
								<span className="text-eel">{classroomData.students.length}</span>
							</div>
						)}
					</div>
				</div>

				{/* Placeholder for future features */}
				<div className="text-eel font-light">
					More classroom management features coming soon...
				</div>
			</div>
		</div>
	)
}

export default observer(ClassroomPage)

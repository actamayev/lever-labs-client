"use client"

import { observer } from "mobx-react"
import { StudentClassroomData } from "@bluedotrobots/common-ts"
import { Card, CardHeader, CardTitle } from "../shadcn/ui/card"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"

function SingleWhiteboardCard({ classroom } : { classroom: StudentClassroomData }) {
	const navigate = useTypedNavigate()

	const handleClassroomClick = () => {
		navigate(`/whiteboard/${classroom.classCode}`)
	}

	return (
		<Card
			key={classroom.classCode}
			className="group cursor-pointer duration-0 border-swan bg-standardBackground hover:bg-polar relative overflow-hidden"
			onClick={handleClassroomClick}
		>
			<CardHeader className="relative">
				<div className="flex items-start justify-between">
					<div className="flex-1 min-w-0">
						<CardTitle className="text-xl text-wolf line-clamp-2 pr-8">
							{classroom.classroomName}
						</CardTitle>
					</div>
				</div>
			</CardHeader>
		</Card>
	)
}

export default observer(SingleWhiteboardCard)

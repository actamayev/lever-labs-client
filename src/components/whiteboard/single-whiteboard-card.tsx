"use client"

import { observer } from "mobx-react"
import { StudentClassroomData } from "@lever-labs/common-ts/types/api"
import { Card, CardHeader, CardTitle } from "../ui/card"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"

function SingleWhiteboardCard({ classroom } : { classroom: StudentClassroomData }): React.ReactNode {
	const navigate = useTypedNavigate()

	const handleClassroomClick = (): void => {
		navigate(`/whiteboard/${classroom.classCode}`)
	}

	return (
		<Card
			key={classroom.classCode}
			className="group cursor-pointer duration-0 border-swan bg-standard-background hover:bg-polar relative overflow-hidden"
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

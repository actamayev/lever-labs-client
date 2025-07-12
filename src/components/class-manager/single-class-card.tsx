"use client"

import { observer } from "mobx-react"
import { EllipsisVertical } from "lucide-react"
import { BasicTeacherClassroomData, ClassCode } from "@bluedotrobots/common-ts"
import { Button } from "../shadcn/ui/button"
import { Card, CardHeader, CardTitle } from "../shadcn/ui/card"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"

interface Props {
	classroom: BasicTeacherClassroomData
	handleRenameClick: (e: React.MouseEvent, classroom: BasicTeacherClassroomData) => void
}

function SingleClassCard(props: Props) {
	const { classroom, handleRenameClick } = props
	const navigate = useTypedNavigate()

	const handleClassroomClick = (classCode: ClassCode) => {
		navigate(`/class-manager/${classCode}`)
	}

	return (
		<Card
			key={classroom.classCode}
			className="group cursor-pointer duration-200 border-swan bg-polar hover:border-gray-300 relative overflow-hidden"
			onClick={() => handleClassroomClick(classroom.classCode)}
		>
			<CardHeader className="pb-3 relative">
				<div className="flex items-start justify-between">
					<div className="flex-1 min-w-0">
						<CardTitle className="text-xl text-wolf line-clamp-2 pr-8">
							{classroom.classroomName}
						</CardTitle>
					</div>
					<Button
						variant="ghost"
						size="sm"
						// eslint-disable-next-line max-len
						className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100"
						onClick={(e) => handleRenameClick(e, classroom)}
					>
						<EllipsisVertical className="h-4 w-4 text-gray-500" />
					</Button>
				</div>
			</CardHeader>
		</Card>
	)
}

export default observer(SingleClassCard)

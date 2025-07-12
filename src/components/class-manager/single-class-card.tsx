"use client"

import { observer } from "mobx-react"
import { Edit, EllipsisVertical } from "lucide-react"
import { BasicTeacherClassroomData, ClassCode } from "@bluedotrobots/common-ts"
import { Card, CardHeader, CardTitle } from "../shadcn/ui/card"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../shadcn/ui/dropdown-menu"

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
			className="group cursor-pointer duration-0 border-swan bg-standardBackground hover:bg-polar relative overflow-hidden"
			onClick={() => handleClassroomClick(classroom.classCode)}
		>
			<CardHeader className="pb-3 relative">
				<div className="flex items-start justify-between">
					<div className="flex-1 min-w-0">
						<CardTitle className="text-xl text-wolf line-clamp-2 pr-8">
							{classroom.classroomName}
						</CardTitle>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
							<div className="p-1 transition-none rounded hover:bg-swan">
								<EllipsisVertical
									className="text-wolf cursor-pointer"
									size={20}
								/>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-40 bg-standardBackground shadow-none">
							<DropdownMenuItem
								onClick={(e) => handleRenameClick(e, classroom)}
								className="cursor-pointer text-lg hover:!bg-polar"
							>
								<Edit className="mr-2 !size-5" strokeWidth={2.5}/>
									Rename
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardHeader>
		</Card>
	)
}

export default observer(SingleClassCard)

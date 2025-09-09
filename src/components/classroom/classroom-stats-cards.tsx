
"use client"

import { observer } from "mobx-react"
import { Dispatch, SetStateAction, useState } from "react"
import { Users, Hash, Rocket, Plus } from "lucide-react"
import { ClassCode } from "@bluedotrobots/common-ts/types/utils"
import { TeacherViewHubData } from "@bluedotrobots/common-ts/types/hub"
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/ui/card"
import { cn } from "../../lib/shadcn/utils"
import CreateHubDialog from "./create-hub-dialog"
import DeleteHubDialog from "./delete-hub-dialog"
import getTeacherClass from "../../classes/teacher-class"
import { TactileButton } from "../shadcn/ui/tactile-button"
import getDuolingoColors from "../../utils/get-duolingo-colors"

interface ClassroomStatsCardsProps {
	classCode: ClassCode
	hubToDelete: TeacherViewHubData | null
	isDeleteDialogOpen: boolean
	setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>
}

function ClassroomStatsCards(props: ClassroomStatsCardsProps): React.ReactNode {
	const { classCode, hubToDelete, isDeleteDialogOpen, setIsDeleteDialogOpen } = props
	const [isCreateHubDialogOpen, setIsCreateHubDialogOpen] = useState(false)

	const colors = getDuolingoColors("humpback")

	const handleCreateHub = (): void => {
		setIsCreateHubDialogOpen(true)
	}

	const classroomData = getTeacherClass().getDetailedClassroomData(classCode)

	return (
		<div>

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
							<Users className="h-5 w-5 text-pipTheme" />
							Total Students
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-wolf">
							{classroomData?.students?.length || 0}
						</div>
					</CardContent>
				</Card>

				<Card className="border-2 border-swan bg-standardBackground">
					<CardHeader className="pb-3">
						<CardTitle className="flex items-center gap-2 text-lg">
							<Rocket className="h-5 w-5 text-pipTheme" />
							Create Hub
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-eel mb-3">Start a new learning activity for your students</p>
						<TactileButton
							onClick={handleCreateHub}
							className={cn("w-full h-10 rounded-xl text-lg text-white", colors.bg)}
							shadowHeight={4}
							shadowClass={colors.shadow2}
						>
							<Plus className="h-4 w-4 mr-2" />
							Create New Hub
						</TactileButton>
					</CardContent>
				</Card>
			</div>

			{/* Create Hub Dialog */}
			<CreateHubDialog
				classCode={classCode}
				isCreateHubDialogOpen={isCreateHubDialogOpen}
				setIsCreateHubDialogOpen={setIsCreateHubDialogOpen}
			/>

			{/* Delete Hub Dialog */}
			{hubToDelete && (
				<DeleteHubDialog
					classCode={classCode}
					hubToDelete={hubToDelete}
					isDeleteDialogOpen={isDeleteDialogOpen}
					setIsDeleteDialogOpen={setIsDeleteDialogOpen}
				/>
			)}
		</div>
	)
}

export default observer(ClassroomStatsCards)

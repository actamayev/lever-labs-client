"use client"

import { Plus, Users, BookOpen, Calendar } from "lucide-react"
import { observer } from "mobx-react"
import { cn } from "../../lib/shadcn/utils"
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/ui/card"
import teacherClass from "../../classes/teacher-class"
import { TactileButton } from "../shadcn/ui/tactile-button"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import { Dispatch, SetStateAction } from "react"

interface ClassManagerStatsCardsProps {
	setIsCreateDialogOpen: Dispatch<SetStateAction<boolean>>
}

function ClassManagerStatsCards({ setIsCreateDialogOpen }: ClassManagerStatsCardsProps): React.ReactNode {
	const colors = getDuolingoColors("humpback")

	const totalClasses = teacherClass.classroomData.length
	const activeClasses = totalClasses // All classes are considered active for now

	return (
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
						onClick={(): void => setIsCreateDialogOpen(true)}
						className={cn("w-full h-10 text-white rounded-xl text-lg", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow2}
					>
						<Plus className="h-4 w-4" />
						New Class
					</TactileButton>
				</CardContent>
			</Card>
		</div>
	)
}

export default observer(ClassManagerStatsCards)

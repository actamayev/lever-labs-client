
"use client"

import { observer } from "mobx-react"
import { Dispatch, SetStateAction } from "react"
import { Plus, Users, BookOpen, Calendar } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import studentClass from "../../classes/student-class"
import { TactileButton } from "../shadcn/ui/tactile-button"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/ui/card"

interface WhiteboardStatsCardsProps {
	setIsJoinDialogOpen: Dispatch<SetStateAction<boolean>>
}

function WhiteboardStatsCards({ setIsJoinDialogOpen }: WhiteboardStatsCardsProps): React.ReactNode {
	const colors = getDuolingoColors("humpback")

	const totalClasses = studentClass.classroomData.length
	const activeClasses = totalClasses // All classes are considered active for now

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
			<Card className="border-2 border-swan bg-standard-background">
				<CardHeader className="pb-3">
					<CardTitle className="flex items-center gap-2 text-lg">
						<BookOpen className="h-5 w-5 text-humpback" />
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

			<Card className="border-2 border-swan bg-standard-background">
				<CardHeader className="pb-3">
					<CardTitle className="flex items-center gap-2 text-lg">
						<Users className="h-5 w-5 text-humpback" />
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

			<Card className="border-2 border-swan bg-standard-background">
				<CardHeader className="pb-3">
					<CardTitle className="flex items-center gap-2 text-lg">
						<Calendar className="h-5 w-5 text-humpback" />
						Quick Actions
					</CardTitle>
				</CardHeader>
				<CardContent>
					<TactileButton
						onClick={(): void => setIsJoinDialogOpen(true)}
						className={cn("w-full h-10 text-white rounded-xl text-lg", colors.bg)}
						shadowHeight={4}
						shadowClass={colors.shadow2}
					>
						<Plus className="h-4 w-4" />
						Join Class
					</TactileButton>
				</CardContent>
			</Card>
		</div>
	)
}

export default observer(WhiteboardStatsCards)

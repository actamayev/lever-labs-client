"use client"

import { observer } from "mobx-react"
import { useCallback } from "react"
import { Trophy, Clock, Users, EllipsisVertical, Trash2 } from "lucide-react"
import { ClassCode } from "@lever-labs/common-ts/types/utils"
import { Scoreboard } from "@lever-labs/common-ts/types/scoreboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { TactileButton } from "../ui/tactile-button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import teacherClass from "../../classes/teacher-class"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import { cn } from "../../lib/shadcn/utils"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import deleteScoreboard from "../../utils/teacher/scoreboard/delete-scoreboard"

interface ClassroomScoreboardSectionProps {
	classCode: ClassCode
}

// eslint-disable-next-line max-lines-per-function
function ClassroomScoreboardSection({ classCode }: ClassroomScoreboardSectionProps): React.ReactNode {
	const navigate = useTypedNavigate()

	const handleDeleteScoreboard = useCallback((scoreboard: Scoreboard): void => {
		void deleteScoreboard(classCode, scoreboard.scoreboardId)
	}, [classCode])

	const joinScoreboardHandler = useCallback((scoreboard: Scoreboard): void => {
		navigate(`/scoreboard/${classCode}/${scoreboard.scoreboardId}`)
	}, [navigate, classCode])

	const formatTime = useCallback((seconds: number): string => {
		const mins = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
	}, [])

	// Get detailed classroom data for the current class
	const detailedClassroomData = teacherClass.getDetailedClassroomData(classCode)

	if (!detailedClassroomData?.scoreboards || detailedClassroomData.scoreboards.length === 0) {
		return null
	}

	const colors = getDuolingoColors("humpback")

	return (
		<Card className="border-2 border-swan bg-standard-background mb-8">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Trophy className="h-5 w-5 text-humpback" />
					Scoreboards
				</CardTitle>
				<CardDescription>
					Active scoreboards for competitions and games
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{detailedClassroomData.scoreboards.map((scoreboard): React.ReactNode => (
						<Card key={scoreboard.scoreboardId} className="border border-swan hover:shadow-md transition-shadow relative">
							<CardContent className="p-4">
								<div className="flex items-start gap-3">
									<div className={cn("p-2 rounded-lg", colors.bg)}>
										<Trophy className="h-5 w-5 text-white" />
									</div>
									<div className="flex-1 min-w-0">
										<h3 className="font-semibold text-wolf truncate mb-1 pr-8">
											{scoreboard.scoreboardName}
										</h3>
										<div className="space-y-1 text-sm text-eel">
											<div className="flex items-center gap-2">
												<Clock className="h-3 w-3" />
												<span>{formatTime(scoreboard.timeRemaining)}</span>
											</div>
											<div className="flex items-center gap-2">
												<Users className="h-3 w-3" />
												<span>{scoreboard.team1Stats.teamName} vs {scoreboard.team2Stats.teamName}</span>
											</div>
											<div className="text-xs text-eel">
												{scoreboard.team1Stats.score} - {scoreboard.team2Stats.score}
											</div>
										</div>
									</div>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<div className="p-1 transition-none rounded hover:bg-polar cursor-pointer">
												<EllipsisVertical
													className="text-wolf"
													size={16}
												/>
											</div>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="w-32 bg-standard-background shadow-none">
											<DropdownMenuItem
												onClick={(): void => handleDeleteScoreboard(scoreboard)}
												className="cursor-pointer text-sm hover:bg-polar! text-cardinal hover:text-cardinal!"
											>
												<Trash2 className="mr-2 size-4!" strokeWidth={2.5}/>
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
								<div className="mt-3 flex gap-2">
									<TactileButton
										className={cn("flex-1 h-8 text-sm text-white rounded-xl", colors.bg)}
										shadowHeight={4}
										shadowClass={colors.shadow2}
										onClick={(): void => joinScoreboardHandler(scoreboard)}
									>
										Open Scoreboard
									</TactileButton>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

export default observer(ClassroomScoreboardSection)

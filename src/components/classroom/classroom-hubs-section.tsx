"use client"

import { observer } from "mobx-react"
import { useCallback } from "react"
import { Play, UserCheck, EllipsisVertical, Trash2 } from "lucide-react"
import { ClassCode } from "@bluedotrobots/common-ts/types/utils"
import { TeacherViewHubData } from "@bluedotrobots/common-ts/types/hub"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/ui/card"
import { TactileButton } from "../shadcn/ui/tactile-button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../shadcn/ui/dropdown-menu"
import teacherClass from "../../classes/teacher-class"
import careerQuestClass from "../../classes/career-quest-class"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import { cn } from "../../lib/shadcn/utils"
import { careerData, meetPipData } from "../../utils/constants/career-quest/career-data"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"

interface ClassroomHubsSectionProps {
	classCode: ClassCode
}

// eslint-disable-next-line max-lines-per-function
function ClassroomHubsSection({ classCode }: ClassroomHubsSectionProps): React.ReactNode {
	const navigate = useTypedNavigate()

	const handleDeleteHub = useCallback((hub: TeacherViewHubData): void => {
		teacherClass.setHubToDelete(hub)
		teacherClass.setIsDeleteDialogOpen(true)
	}, [])

	const joinHubHandler = useCallback((hub: TeacherViewHubData): void => {
		if (hub.careerUUID === meetPipData.careerUUID) {
			teacherClass.setIsFocusingStudents({ classCode, hubId: hub.hubId })
			careerQuestClass.resetCareerToBeginning(meetPipData.careerUUID)
			navigate("/career-quest/meet-pip")
			return
		}
		const career = careerData.find((singleCareerData): boolean => singleCareerData.careerUUID === hub.careerUUID)
		if (career) {
			teacherClass.setIsFocusingStudents({ classCode, hubId: hub.hubId })
			careerQuestClass.resetCareerToBeginning(hub.careerUUID)
			navigate(career.careerUrl)
		}
	}, [navigate, classCode])

	// Get detailed classroom data for the current class
	const detailedClassroomData = teacherClass.getDetailedClassroomData(classCode)

	if (!detailedClassroomData?.activeHubs || detailedClassroomData.activeHubs.length === 0) {
		return null
	}

	return (
		<Card className="border-2 border-swan bg-standardBackground mb-8">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Play className="h-5 w-5 text-pipTheme" />
					Active Hubs
				</CardTitle>
				<CardDescription>
					Currently running learning activities in this classroom
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{detailedClassroomData.activeHubs.map((hub): React.ReactNode => {
						// Find career data for this hub
						const careerInfo = hub.careerUUID === meetPipData.careerUUID
							? meetPipData
							: careerData.find((career): boolean => career.careerUUID === hub.careerUUID)

						const CareerIcon = careerInfo?.careerIcon || Play
						const careerColors = getDuolingoColors(careerInfo?.backgroundColor || "humpback")

						return (
							<Card key={hub.hubId} className="border border-swan hover:shadow-md transition-shadow relative">
								<CardContent className="p-4">
									<div className="flex items-start gap-3">
										<div className={cn("p-2 rounded-lg", careerColors.bg)}>
											<CareerIcon className="h-5 w-5 text-white" />
										</div>
										<div className="flex-1 min-w-0">
											<h3 className="font-semibold text-wolf truncate mb-1 pr-8">
												{hub.hubName}
											</h3>
											<p className="text-sm text-eel mb-2">
												{careerInfo?.careerName || "Unknown Career"}
											</p>
											<div className="flex items-center gap-2 text-xs text-eel">
												<UserCheck className="h-3 w-3" />
												<span>{hub.studentsJoined.length} students joined</span>
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
											<DropdownMenuContent className="w-32 bg-standardBackground shadow-none">
												<DropdownMenuItem
													onClick={(): void => handleDeleteHub(hub)}
													className="cursor-pointer text-sm hover:!bg-polar text-cardinal hover:!text-cardinal"
												>
													<Trash2 className="mr-2 !size-4" strokeWidth={2.5}/>
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
									<div className="mt-3 flex gap-2">
										<TactileButton
											className={cn("flex-1 h-8 text-sm text-white rounded-xl", careerColors.bg)}
											shadowHeight={4}
											shadowClass={careerColors.shadow2}
											onClick={(): void => joinHubHandler(hub)}
										>
											Join Hub
										</TactileButton>
									</div>
								</CardContent>
							</Card>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}

export default observer(ClassroomHubsSection)

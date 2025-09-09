"use client"

import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import { ArrowLeft, Users, Rocket, Play, UserCheck, EllipsisVertical, Trash2 } from "lucide-react"
import { ClassCode } from "@bluedotrobots/common-ts/types/utils"
import { TeacherViewHubData } from "@bluedotrobots/common-ts/types/hub"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcn/ui/table"
import { TactileButton } from "../shadcn/ui/tactile-button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../shadcn/ui/dropdown-menu"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import getTeacherClass from "../../classes/teacher-class"
import getCareerQuestClass from "../../classes/career-quest-class"
import retrieveDetailedClassroomInfo from "../../utils/teacher/retrieve-detailed-classroom-info"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import { cn } from "../../lib/shadcn/utils"
import { careerData, meetPipData } from "../../utils/constants/career-quest/career-data"
import ClassroomStatsCards from "./classroom-stats-cards"

// eslint-disable-next-line max-lines-per-function
function ClassroomPage({ classCode }: { classCode: ClassCode }): React.ReactNode {
	const navigate = useTypedNavigate()
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [hubToDelete, setHubToDelete] = useState<TeacherViewHubData | null>(null)

	// Fetch detailed classroom data on component mount
	useEffect((): void => {
		retrieveDetailedClassroomInfo(classCode)
	}, [classCode])

	const classroomData = getTeacherClass().getDetailedClassroomData(classCode)

	useEffect((): void => {
		document.title = `${classroomData?.classroomName} | Blue Dot Robots`
	}, [classroomData?.classroomName])

	const handleBackClick = (): void => navigate("/class-manager")

	const handleDeleteHub = useCallback((hub: TeacherViewHubData): void => {
		setHubToDelete(hub)
		setIsDeleteDialogOpen(true)
	}, [])

	const joinHubHandler = useCallback((hub: TeacherViewHubData): void => {
		if (hub.careerUUID === meetPipData.careerUUID) {
			getTeacherClass().setIsFocusingStudents({ classCode, hubId: hub.hubId })
			getCareerQuestClass().resetCareerToBeginning(meetPipData.careerUUID)
			navigate("/career-quest/meet-pip")
			return
		}
		const career = careerData.find((singleCareerData): boolean => singleCareerData.careerUUID === hub.careerUUID)
		if (career) {
			getTeacherClass().setIsFocusingStudents({ classCode, hubId: hub.hubId })
			getCareerQuestClass().resetCareerToBeginning(hub.careerUUID)
			navigate(career.careerUrl)
		}
	}, [navigate, classCode])

	if (getTeacherClass().isRetrievingDetailedData) {
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
		<div className="p-6 max-w-7xl mx-auto">
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

			{/* Page Title */}
			<div className="mb-8">
				<h1 className="text-4xl font-bold text-wolf mb-2">
					{classroomData?.classroomName || "Classroom"}
				</h1>
				<p className="text-eel text-lg">Manage your classroom and view student information</p>
			</div>

			<ClassroomStatsCards
				classCode={classCode}
				hubToDelete={hubToDelete}
				isDeleteDialogOpen={isDeleteDialogOpen}
				setIsDeleteDialogOpen={setIsDeleteDialogOpen}
			/>

			{/* Active Hubs Section */}
			{classroomData?.activeHubs && classroomData.activeHubs.length > 0 && (
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
							{classroomData.activeHubs.map((hub): React.ReactNode => {
								// Find career data for this hub
								const careerInfo = hub.careerUUID === meetPipData.careerUUID
									? meetPipData
									: careerData.find((career): boolean => career.careerUUID === hub.careerUUID)

								const CareerIcon = careerInfo?.careerIcon || Rocket
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
															// eslint-disable-next-line max-len
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
			)}

			{/* Students Table */}
			<Card className="border-2 border-swan bg-standardBackground">
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="flex items-center gap-2">
								<Users className="h-5 w-5 text-pipTheme" />
								Students
							</CardTitle>
							<CardDescription>
								View all students enrolled in this classroom
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					{classroomData?.students &&  (
						<Table>
							<TableHeader>
								<TableRow className="border-swan">
									<TableHead className="text-wolf font-semibold">#</TableHead>
									<TableHead className="text-wolf font-semibold">Username</TableHead>
									<TableHead className="text-wolf font-semibold">Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{classroomData.students.map((student, index): React.ReactNode => (
									<TableRow key={student.username || index} className="border-swan hover:bg-polar/50">
										<TableCell className="font-medium text-wolf">
											{index + 1}
										</TableCell>
										<TableCell className="font-medium text-wolf">
											{student.username || "Unknown"}
										</TableCell>
										<TableCell>
											<span className="inline-flex items-center px-2.5 py-0.5 rounded-full
											text-xs font-medium bg-green-100 text-green-800">
												Accepted
											</span>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>
		</div>
	)
}

export default observer(ClassroomPage)

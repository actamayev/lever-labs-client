"use client"

import { observer } from "mobx-react"
import { useCallback, useEffect, useState } from "react"
import { ArrowLeft, Users, Hash, Rocket, Plus, Play, UserCheck } from "lucide-react"
import { CareerUUID, ClassCode } from "@bluedotrobots/common-ts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcn/ui/table"
import { TactileButton } from "../shadcn/ui/tactile-button"
import InviteStudentDialog from "./invite-student-dialog"
import CreateHubDialog from "./create-hub-dialog"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import teacherClass from "../../classes/teacher-class"
import retrieveDetailedClassroomInfo from "../../utils/teacher/retrieve-detailed-classroom-info"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import { cn } from "../../lib/shadcn/utils"
import { careerData, meetPipData } from "../../utils/constants/career-quest/career-data"

interface ClassroomPageProps {
	classCode: ClassCode
}

// eslint-disable-next-line max-lines-per-function, complexity
function ClassroomPage({ classCode }: ClassroomPageProps): React.ReactNode {
	const navigate = useTypedNavigate()
	const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
	const [isCreateHubDialogOpen, setIsCreateHubDialogOpen] = useState(false)

	// Fetch detailed classroom data on component mount
	useEffect((): void => {
		retrieveDetailedClassroomInfo(classCode)
	}, [classCode])

	const classroomData = teacherClass.getDetailedClassroomData(classCode)

	useEffect((): void => {
		document.title = `${classroomData?.classroomName} | Blue Dot Robots`
	}, [classroomData?.classroomName])

	const handleBackClick = (): void => navigate("/class-manager")
	const colors = getDuolingoColors("humpback")

	const handleInviteStudent = (): void => {
		setIsInviteDialogOpen(true)
	}

	const handleCreateHub = (): void => {
		setIsCreateHubDialogOpen(true)
	}

	const getStatusBadge = (inviteStatus: "ACCEPTED" | "PENDING" | "DECLINED"): React.ReactNode => {
		if (inviteStatus === "ACCEPTED") {
			return (
				<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
					Accepted
				</span>
			)
		} else {
			return (
				<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
					Pending
				</span>
			)
		}
	}

	const joinHubHandler = useCallback((careerUUID: CareerUUID): void => {
		if (careerUUID === meetPipData.careerUUID) {
			navigate("/career-quest/meet-pip")
			return
		}
		const career = careerData.find((singleCareerData): boolean => singleCareerData.careerUUID === careerUUID)
		if (career) {
			navigate(career.careerUrl)
		}
	}, [navigate])

	if (teacherClass.isRetrievingDetailedData) {
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

			{/* Stats Cards */}
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
						<div className="text-sm text-eel mt-2 space-y-1">
							{((): React.ReactNode => {
								const students = classroomData?.students || []
								const declined = students.filter((s): boolean => s.inviteStatus === "DECLINED").length
								const accepted = students.filter((s): boolean => s.inviteStatus === "ACCEPTED").length
								const pending = students.filter((s): boolean => s.inviteStatus === "PENDING").length
								return (
									<>
										<div className="flex items-center gap-2">
											<span className="w-2 h-2 bg-green-500 rounded-full"></span>
											{accepted} accepted
										</div>
										<div className="flex items-center gap-2">
											<span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
											{pending} pending
										</div>
										<div className="flex items-center gap-2">
											<span className="w-2 h-2 bg-red-500 rounded-full"></span>
											{declined} declined
										</div>
									</>
								)
							})()}
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
									<Card key={hub.hubId} className="border border-swan hover:shadow-md transition-shadow">
										<CardContent className="p-4">
											<div className="flex items-start gap-3">
												<div className={cn("p-2 rounded-lg", careerColors.bg)}>
													<CareerIcon className="h-5 w-5 text-white" />
												</div>
												<div className="flex-1 min-w-0">
													<h3 className="font-semibold text-wolf truncate mb-1">
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
											</div>
											<div className="mt-3 flex gap-2">
												<TactileButton
													className="flex-1 h-8 text-sm bg-polar text-eel border border-swan hover:bg-gray-50"
													shadowHeight={2}
													shadowClass="shadow-gray-300"
												>
													View Details
												</TactileButton>
												<TactileButton
													className={cn("flex-1 h-8 text-sm text-white", careerColors.bg)}
													shadowHeight={2}
													shadowClass={careerColors.shadow2}
													onClick={(): void => joinHubHandler(hub.careerUUID)}
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
						<TactileButton
							onClick={handleInviteStudent}
							className={cn("text-white", colors.bg)}
							shadowHeight={4}
							shadowClass={colors.shadow2}
						>
							<Plus className="h-4 w-4" />
							Invite Student
						</TactileButton>
					</div>
				</CardHeader>
				<CardContent>
					{classroomData?.students && classroomData.students.length > 0 ? (
						<Table>
							<TableHeader>
								<TableRow className="border-swan">
									<TableHead className="text-wolf font-semibold">#</TableHead>
									<TableHead className="text-wolf font-semibold">Username</TableHead>
									<TableHead className="text-wolf font-semibold">Status</TableHead>
									<TableHead className="text-wolf font-semibold">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{classroomData.students
									.filter((student): boolean => student.inviteStatus !== "DECLINED")
									.map((student, index): React.ReactNode => (
										<TableRow key={student.username || index} className="border-swan hover:bg-polar/50">
											<TableCell className="font-medium text-wolf">
												{index + 1}
											</TableCell>
											<TableCell className="font-medium text-wolf">
												{student.username || "Unknown"}
											</TableCell>
											<TableCell>
												{getStatusBadge(student.inviteStatus)}
											</TableCell>
											<TableCell>
												<TactileButton
													className="h-8 px-3 text-sm bg-polar text-eel border border-swan hover:bg-gray-50"
													shadowHeight={2}
													shadowClass="shadow-gray-300"
												>
													View Profile
												</TactileButton>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					) : (
						<div className="text-center py-12">
							<Users className="h-12 w-12 text-eel mx-auto mb-4 opacity-50" />
							<h3 className="text-lg font-medium text-wolf mb-2">No students yet</h3>
							<p className="text-eel mb-4">
								Students will appear here once they join your class using the class code.
							</p>
							<TactileButton
								onClick={handleInviteStudent}
								className={cn("flex-1 h-10 rounded-xl text-lg text-white", colors.bg)}
								shadowHeight={4}
								shadowClass={colors.shadow2}
							>
								<Plus className="h-4 w-4" />
								Invite Students
							</TactileButton>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Invite Student Dialog */}
			<InviteStudentDialog
				classCode={classCode}
				isInviteDialogOpen={isInviteDialogOpen}
				setIsInviteDialogOpen={setIsInviteDialogOpen}
			/>

			{/* Create Hub Dialog */}
			<CreateHubDialog
				classCode={classCode}
				isCreateHubDialogOpen={isCreateHubDialogOpen}
				setIsCreateHubDialogOpen={setIsCreateHubDialogOpen}
			/>
		</div>
	)
}

export default observer(ClassroomPage)

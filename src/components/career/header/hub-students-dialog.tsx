"use client"

import { Dispatch, SetStateAction } from "react"
import { Users, UserCheck } from "lucide-react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose
} from "../../shadcn/ui/dialog"
import { Card, CardContent } from "../../shadcn/ui/card"
import { Avatar, AvatarFallback } from "../../shadcn/ui/avatar"
import { observer } from "mobx-react"
import { isEmpty } from "lodash-es"

interface Props {
	isStudentsDialogOpen: boolean
	setIsStudentsDialogOpen: Dispatch<SetStateAction<boolean>>
	studentsJoined: { username: string; userId: number }[]
	hubName: string
}

function HubStudentsDialog(props: Props): React.ReactNode {
	const { isStudentsDialogOpen, setIsStudentsDialogOpen, studentsJoined, hubName } = props

	return (
		<Dialog open={isStudentsDialogOpen} onOpenChange={setIsStudentsDialogOpen}>
			<DialogContent className="w-96 border-none" onClick={(e): void => e.stopPropagation()}>
				<DialogHeader>
					<DialogTitle className="text-2xl flex items-center gap-2">
						<Users className="h-6 w-6 text-pipTheme" />
						Students in Hub
					</DialogTitle>
					<DialogClose />
				</DialogHeader>
				<div className="space-y-4">
					<div className="bg-polar border border-swan rounded-lg p-3">
						<div className="text-sm text-eel mb-1">Hub Name</div>
						<div className="text-lg font-semibold text-wolf">
							{hubName}
						</div>
					</div>

					{isEmpty(studentsJoined) ? (
						<div className="text-center py-8">
							<Users className="h-12 w-12 text-eel mx-auto mb-3 opacity-50" />
							<p className="text-eel">No students have joined this hub yet</p>
						</div>
					) : (
						<div>
							<div className="text-sm font-medium text-wolf mb-3">
								{studentsJoined.length} {studentsJoined.length === 1 ? "student" : "students"} joined
							</div>
							<div className="space-y-2 max-h-60 overflow-y-auto">
								{studentsJoined.map((student): React.ReactNode => (
									<Card key={student.userId} className="border border-swan">
										<CardContent className="p-3">
											<div className="flex items-center gap-3">
												<Avatar className="h-8 w-8">
													<AvatarFallback className="bg-pipTheme text-white text-sm">
														{student.username.charAt(0).toUpperCase()}
													</AvatarFallback>
												</Avatar>
												<div className="flex-1">
													<div className="font-medium text-wolf">
														{student.username}
													</div>
													<div className="text-xs text-eel flex items-center gap-1">
														<UserCheck className="h-3 w-3 text-green-600" />
														<span>Joined</span>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default observer(HubStudentsDialog)

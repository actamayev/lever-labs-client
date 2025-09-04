"use client"

import { useState } from "react"
import { observer } from "mobx-react"
import { ArrowLeft, Mail, Check, X } from "lucide-react"
import { ClassCode } from "@bluedotrobots/common-ts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/ui/card"
import { TactileButton } from "../shadcn/ui/tactile-button"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import respondToClassroomInvitation from "../../utils/student/respond-to-classroom-invitation"

interface ClassroomInvitationResponseProps {
	classCode: ClassCode
	classroomName: string
}

// eslint-disable-next-line max-lines-per-function
function ClassroomInvitationResponse({ classCode, classroomName }: ClassroomInvitationResponseProps): React.ReactNode {
	const navigate = useTypedNavigate()
	const [isResponding, setIsResponding] = useState(false)

	const handleBackClick = (): void => navigate("/whiteboard")

	const handleResponse = async (response: "accept" | "decline"): Promise<void> => {
		setIsResponding(true)

		const success = await respondToClassroomInvitation(classCode, response)

		if (success) {
			if (response === "accept") {
				// Stay on the page to show the whiteboard content
				// The component will re-render and show the main content
			} else {
				// Navigate back to the whiteboard list since they declined
				navigate("/whiteboard")
			}
		}

		setIsResponding(false)
	}

	return (
		<div className="p-6 max-w-4xl mx-auto">
			{/* Header with back button */}
			<div className="flex items-center gap-4 mb-8">
				<TactileButton
					onClick={handleBackClick}
					className="flex items-center gap-2 h-10 px-4 rounded-xl text-lg bg-polar text-eel border border-swan hover:bg-gray-50"
					shadowHeight={2}
					shadowClass="shadow-gray-300"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Whiteboard
				</TactileButton>
			</div>

			{/* Invitation Card */}
			<div className="flex items-center justify-center min-h-[500px]">
				<Card className="w-full max-w-2xl border-2 border-swan bg-standardBackground">
					<CardHeader className="text-center pb-6">
						<div className="flex justify-center mb-4">
							<div className="p-4 bg-pipTheme/10 rounded-full">
								<Mail className="h-12 w-12 text-pipTheme" />
							</div>
						</div>
						<CardTitle className="text-2xl font-bold text-wolf">
							Classroom Invitation
						</CardTitle>
						<CardDescription className="text-lg">
							You've been invited to join a classroom
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Classroom Info */}
						<div className="text-center space-y-4">
							<div className="p-4 bg-polar rounded-lg border border-swan">
								<h3 className="text-xl font-semibold text-wolf mb-2">
									{classroomName}
								</h3>
								<div className="flex items-center justify-center gap-2">
									<span className="text-eel">Class Code:</span>
									<span className="font-mono font-bold text-wolf bg-white px-3 py-1 rounded border border-swan">
										{classCode}
									</span>
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-4">
							<TactileButton
								onClick={(): Promise<void> => handleResponse("accept")}
								disabled={isResponding}
								className="flex-1 h-12 bg-green-600 text-white hover:bg-green-700 rounded-xl text-lg font-medium"
								shadowHeight={4}
								shadowClass="shadow-green-600/30"
							>
								<Check className="h-5 w-5 mr-2" />
								{isResponding ? "Processing..." : "Accept Invitation"}
							</TactileButton>
							<TactileButton
								onClick={(): Promise<void> => handleResponse("decline")}
								disabled={isResponding}
								className="flex-1 h-12 bg-red-600 text-white hover:bg-red-700 rounded-xl text-lg font-medium"
								shadowHeight={4}
								shadowClass="shadow-red-600/30"
							>
								<X className="h-5 w-5 mr-2" />
								{isResponding ? "Processing..." : "Decline Invitation"}
							</TactileButton>
						</div>

						{/* Additional Info */}
						<div className="text-center text-sm text-eel bg-polar p-4 rounded-lg border border-swan">
							<p>
								By accepting this invitation, you'll gain access to the classroom whiteboard
								and be able to participate in collaborative robotics activities.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default observer(ClassroomInvitationResponse)

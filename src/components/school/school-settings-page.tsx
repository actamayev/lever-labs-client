"use client"
import { observer } from "mobx-react"
import JoinClassroom from "./join-classroom"
import ProfileLayout from "../profile/profile-layout"
import RequestTeacherAccess from "./request-teacher-access"

function SchoolSettingsPage(): React.ReactNode {
	return (
		<ProfileLayout>
			<div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 mt-5 max-w-full">
				<div className="font-medium text-2xl md:text-3xl text-eel mb-8 md:mb-14	">
					Lever Labs for Schools
				</div>

				<JoinClassroom />

				<RequestTeacherAccess />
			</div>
		</ProfileLayout>
	)
}

export default observer(SchoolSettingsPage)

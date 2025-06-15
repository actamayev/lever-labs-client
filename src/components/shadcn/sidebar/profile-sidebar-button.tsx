"use client"

import { useMemo } from "react"
import { observer } from "mobx-react"
import { SidebarMenu, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import CustomSidebarButton from "./custom-sidebar-button"
import personalInfoClass from "../../../classes/personal-info-class"
import ShowUserProfileImageOrDefaultImage from "../../show-user-profile-image-or-default-image"

function ProfileSidebarButton() {

	const profilePictureUrl = useMemo(() => {
		return personalInfoClass.profilePictureUrl
	}, [personalInfoClass.profilePictureUrl])

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-start">
				<CustomSidebarButton
					icon={(
						<div className="relative flex items-center justify-center w-full h-full">
							<ShowUserProfileImageOrDefaultImage
								extraClasses="min-w-full min-h-full rounded-full object-cover"
								profileImageUrl={profilePictureUrl}
							/>
						</div>
					)}
					text="PROFILE"
					goTo="/profile"
				/>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(ProfileSidebarButton)

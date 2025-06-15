"use client"

import { observer } from "mobx-react"
import { SidebarMenu, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import CustomSidebarButton from "./custom-sidebar-button"
import ShowUserProfileImageOrDefaultImage from "../../show-user-profile-image-or-default-image"

function ProfileSidebarButton() {
	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-start">
				<CustomSidebarButton
					icon={(
						<div className="relative flex items-center justify-center w-full h-full">
							<ShowUserProfileImageOrDefaultImage extraClasses="min-w-full min-h-full rounded-full object-cover" />
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

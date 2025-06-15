"use client"

import { SidebarMenu, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import CustomSidebarButton from "./custom-sidebar-button"
import ShowUserProfileImageOrDefaultImage from "../../show-user-profile-image-or-default-image"

export default function ProfileSidebarButton() {
	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-start">
				<CustomSidebarButton
					icon={(
						<div className="relative flex items-center justify-center w-full h-full">
							<ShowUserProfileImageOrDefaultImage  />
						</div>
					)}
					text="PROFILE"
					goTo="/profile"
				/>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

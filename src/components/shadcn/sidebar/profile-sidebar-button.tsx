"use client"

import Image from "next/image"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { Avatar, AvatarFallback } from "@/components/shadcn/ui/avatar"
import { SidebarMenu, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import CustomSidebarButton from "./custom-sidebar-button"
import { CustomUserCircle } from "../../../icons/custom-user-circle"
import personalInfoClass from "../../../classes/personal-info-class"

function ProfileSidebarButton(): React.ReactNode {
	const profilePictureUrl = personalInfoClass.profilePictureUrl

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-start">
				<CustomSidebarButton
					icon={(
						<Avatar className="w-full h-full">
							{isNull(profilePictureUrl) ? (
								<AvatarFallback className="bg-standardBackground text-questionText">
									<CustomUserCircle className="w-full h-full" />
								</AvatarFallback>
							) : (
								<Image
									src={profilePictureUrl}
									alt="Your profile"
									width={32}
									height={32}
									className="rounded-full object-cover w-full h-full"
								/>
							)}
						</Avatar>
					)}
					text="PROFILE"
					goTo="/settings/profile"
				/>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(ProfileSidebarButton)

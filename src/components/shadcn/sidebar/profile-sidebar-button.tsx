"use client"

import Image from "next/image"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { Avatar, AvatarFallback } from "@/components/shadcn/ui/avatar"
import { SidebarMenu, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import CustomSidebarButton from "./custom-sidebar-button"
import { CustomUserCircle } from "../../icons/custom-user-circle"
import personalInfoClass from "../../../classes/personal-info-class"

function ProfileSidebarButton() {
	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-start">
				<CustomSidebarButton
					icon={(
						<Avatar className="w-full h-full">
							{isNull(personalInfoClass.profilePictureUrl) ? (
								<AvatarFallback className="bg-gray-500 text-white">
									<CustomUserCircle className="w-6 h-6" />
								</AvatarFallback>
							) : (
								<Image
									src={personalInfoClass.profilePictureUrl}
									alt="Your profile"
									width={32}
									height={32}
									className="rounded-full object-cover w-full h-full"
								/>
							)}
						</Avatar>
					)}
					text="PROFILE"
					goTo="/profile"
				/>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(ProfileSidebarButton)

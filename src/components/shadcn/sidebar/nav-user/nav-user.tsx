"use client"

import { useMemo } from "react"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/shadcn/ui/sidebar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import { Avatar } from "@/components/shadcn/ui/avatar"
import LogoutButton from "./logout-button"
import useUsername from "../../../../hooks/memos/username"
import ThemeTogglerDropdownItem from "./theme-toggler-dropdown-item"
import { usePersonalInfoContext } from "../../../../contexts/personal-info-context"
import ShowUserProfileImageOrDefaultImage from "../../../show-user-profile-image-or-default-image"
import { cn } from "../../../../lib/shadcn/utils"

function NavUser() {
	const { isMobile } = useSidebar()
	const personalInfoClass = usePersonalInfoContext()
	const username = useUsername()

	const profilePictureUrl = useMemo(() => {
		return personalInfoClass.profilePictureUrl
	}, [personalInfoClass.profilePictureUrl])

	if (isNull(username)) return null

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-center">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							className={cn(
								"transition-none !flex items-center justify-start !p-0 !h-[50px]",
								"border-2 border-transparent rounded-xl",
								"hover:!bg-polar",
								"group-data-[collapsible=icon]:!h-[50px] group-data-[collapsible=icon]:!w-[170px]",
							)}
							tooltip={{
								children: "Profile",
								hidden: false
							}}
						>
							<div className="flex items-center justify-center space-x-4">
								<div className="ml-2.5 flex-shrink-0 w-[35px] h-[35px]">
									<Avatar className="!h-[35px] !w-[35px] !min-w-[35px] rounded-lg">
										<ShowUserProfileImageOrDefaultImage
											extraClasses="min-w-full min-h-full rounded-lg object-cover"
											profileImageUrl={profilePictureUrl}
										/>
									</Avatar>
								</div>
								<div className="text-base text-wolf font-medium">
									PROFILE
								</div>
							</div>
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-standardBackground"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="!h-[35px] !w-[35px] !min-w-[35px] rounded-lg">
									<ShowUserProfileImageOrDefaultImage
										extraClasses="min-w-full min-h-full rounded-lg object-cover"
										profileImageUrl={profilePictureUrl}
									/>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">{username}</span>
									<span className="truncate text-xs">{personalInfoClass.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<ThemeTogglerDropdownItem />
						{/* <AddAnotherPipButton /> */}
						{/* <NavigateToSettingsPage /> */}
						<DropdownMenuSeparator />
						<LogoutButton />
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(NavUser)

import _ from "lodash"
import { LogOut } from "lucide-react"
import { observer } from "mobx-react"
import { useMemo, useState } from "react"

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/shadcn/ui/sidebar"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu"
import useUsername from "../../hooks/memos/username"
import { Avatar } from "@/components/shadcn/ui/avatar"
import useHandleLogout from "../../hooks/auth/handle-logout"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import ShowUserProfileImageOrDefaultImage from "../show-user-profile-image-or-default-image"

function NavUser() {
	const { isMobile } = useSidebar()
	const [logoutDisabled, setLogoutDisabled] = useState(false)
	const personalInfoClass = usePersonalInfoContext()
	const username = useUsername()

	const profilePictureUrl = useMemo(() => {
		return personalInfoClass.profilePictureUrl
	}, [personalInfoClass.profilePictureUrl])

	const handleLogout = useHandleLogout(setLogoutDisabled)

	if (_.isNull(username)) return null

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="relative flex w-full items-center justify-center
							data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground md:h-8 md:p-0"
						>
							<Avatar className="h-6 w-6 rounded-lg">
								<ShowUserProfileImageOrDefaultImage
									extraClasses="min-w-full min-h-full rounded-lg object-cover"
									profileImageUrl={profilePictureUrl}
								/>
							</Avatar>
							<div className="absolute left-full ml-2 hidden grid-cols-1 text-left text-sm leading-tight lg:grid">
								<span className="truncate font-semibold">{username}</span>
								<span className="truncate text-xs">{personalInfoClass.email}</span>
							</div>
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
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
						<DropdownMenuItem
							onClick={handleLogout}
							disabled={logoutDisabled}
							className={`hover:cursor-pointer ${logoutDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
						>
							<LogOut className="mr-2 size-4" />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(NavUser)

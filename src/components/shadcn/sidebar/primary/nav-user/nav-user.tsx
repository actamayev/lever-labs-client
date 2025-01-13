import _ from "lodash"
import { useMemo } from "react"
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
import NavigateToSettingsPage from "./navigate-to-settings-page"
import ThemeTogglerDropdownMenu from "./theme-toggler-dropdown-menu"
import useUsername from "../../../../../hooks/memos/username"
import { usePersonalInfoContext } from "../../../../../contexts/personal-info-context"
import ShowUserProfileImageOrDefaultImage from "../../../../show-user-profile-image-or-default-image"

function NavUser() {
	const { isMobile } = useSidebar()
	const personalInfoClass = usePersonalInfoContext()
	const username = useUsername()

	const profilePictureUrl = useMemo(() => {
		return personalInfoClass.profilePictureUrl
	}, [personalInfoClass.profilePictureUrl])

	if (_.isNull(username)) return null

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-center">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							className="!flex !h-[54px] !w-[54px] !min-w-[54px] relative items-center justify-center
                            group-data-[collapsible=icon]:!h-[54px] group-data-[collapsible=icon]:!w-[54px]
                            data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground !p-0"
						>
							<Avatar className="!h-[35px] !w-[35px] !min-w-[35px] rounded-lg">
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
						<ThemeTogglerDropdownMenu />
						<NavigateToSettingsPage />
						<DropdownMenuSeparator />
						<LogoutButton />
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(NavUser)

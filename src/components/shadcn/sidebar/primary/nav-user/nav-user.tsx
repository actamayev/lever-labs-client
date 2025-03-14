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
import { cn } from "../../../../../lib/shadcn/utils"
// import AddAnotherPipButton from "./add-another-pip-button"
import useUsername from "../../../../../hooks/memos/username"
// import NavigateToSettingsPage from "./navigate-to-settings-page"
import ThemeTogglerDropdownItem from "./theme-toggler-dropdown-item"
import { usePersonalInfoContext } from "../../../../../contexts/personal-info-context"
import ShowUserProfileImageOrDefaultImage from "../../../../show-user-profile-image-or-default-image"

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
			<SidebarMenuItem className="flex justify-start">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							className={cn(
								// Base styles (matching CustomSidebarButton)
								"transition-none !flex items-center justify-start !p-0",
								"border-2 border-transparent",
								"hover:!bg-sidebarButtonHover",
								// Size and dimensions specific to this button
								// "!h-[55px] !w-[55px] !min-w-[55px] relative",
								"group-data-[collapsible=icon]:!h-[50px] group-data-[collapsible=icon]:!w-[170px]",
								// Open state
								// "data-[state=open]:bg-sidebarButtonHover data-[state=open]:text-sidebar-accent-foreground"
							)}
							// tooltip={{
							// 	children: "Profile",
							// 	hidden: false
							// }}
						>
							<div className="flex items-center justify-center space-x-4">
								<div>
									<Avatar className="!h-[35px] !w-[35px] !min-w-[35px] rounded-lg">
										<ShowUserProfileImageOrDefaultImage
											extraClasses="min-w-full min-h-full rounded-lg object-cover"
											profileImageUrl={profilePictureUrl}
										/>
									</Avatar>
								</div>
								<div className="text-base text-lightLandingPageText">
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

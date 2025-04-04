"use client"

import { useMemo } from "react"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { SidebarMenu, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import { cn } from "../../../lib/shadcn/utils"
import CustomSidebarButton from "./custom-sidebar-button"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"
import ShowUserProfileImageOrDefaultImage from "../../show-user-profile-image-or-default-image"

function ProfileSidebarButton() {
	const pathname = usePathname()
	const navigate = useTypedNavigate()
	const isActive = pathname === "/profile"
	const personalInfoClass = usePersonalInfoContext()

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
								extraClasses="min-w-full min-h-full rounded-lg object-cover"
								profileImageUrl={profilePictureUrl}
							/>
						</div>
					)}
					text="PROFILE"
					isActive={isActive}
					onClick={() => navigate("/profile")}
					customStyles={cn(
						isActive && "!border-selectedSidebarButtonBorder"
					)}
				/>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(ProfileSidebarButton)

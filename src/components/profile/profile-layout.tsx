"use client"

import { ReactNode } from "react"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import ProfileSidebar from "./profile-sidebar"
import authClass from "../../classes/auth-class"
import personalInfoClass from "../../classes/personal-info-class"

interface SidebarLayoutProps {
	children: ReactNode
}

function ProfileLayout({ children }: SidebarLayoutProps): React.ReactNode {
	const isLoggedIn = (
		!isNull(personalInfoClass.username) ||
		authClass.isLoggingOut  // ADD
	)

	return (
		<div className="relative">
			<div className={isLoggedIn ? "pr-[350px]" : ""}>
				{children}
			</div>
			{isLoggedIn && <ProfileSidebar />}
		</div>
	)
}

export default observer(ProfileLayout)

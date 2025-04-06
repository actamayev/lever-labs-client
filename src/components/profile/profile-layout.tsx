"use client"

import { ReactNode } from "react"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import ProfileSidebar from "./profile-sidebar"
import useUsername from "../../hooks/memos/username"

interface SidebarLayoutProps {
  children: ReactNode;
}

function ProfileLayout({ children }: SidebarLayoutProps) {
	const username = useUsername()
	const isLoggedIn = !isNull(username)

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

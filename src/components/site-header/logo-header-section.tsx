"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import authClass from "../../classes/auth-class"
import { PageToNavigateAfterLogin } from "../../utils/constants"
import personalInfoClass from "../../classes/personal-info-class"

function LogoHeaderSection({ isScrolled } : { isScrolled: boolean}) {
	const pathname = usePathname()

	const whereToNavigate = useMemo(() => {
		if (
			pathname === "/register-username" ||
			(authClass.isLoggedIn && isNull(personalInfoClass.username))
		) return "/register-username"
		if (authClass.isFinishedWithSignup) return PageToNavigateAfterLogin
		return "/"
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, authClass.isFinishedWithSignup, authClass.isLoggedIn, personalInfoClass.username])

	return (
		<div
			className={`inline-flex items-center flex-grow-0 flex-shrink-0 z-10 ${
				!isScrolled ? "justify-center" : ""
			}`}
		>
			<Link
				href={whereToNavigate}
				className="flex items-center font-semibold text-3xl sm:text-3xl flex-shrink-0 text-pipThemeText duration-0"
			>
				<Image
					src="/favicon.svg"
					alt="Logo"
					className="h-8 sm:h-10"
					style={{ verticalAlign: "middle", width: "auto" }}
					width={32}
					height={32}
				/>
				{/* Text visibility: always show on mobile when not scrolled, hidden on mobile when scrolled */}
				<span className={`ml-2 ${isScrolled ? "hidden sm:inline" : "inline"}`}>
					Blue Dot Robots
				</span>
			</Link>
		</div>
	)
}

export default observer(LogoHeaderSection)

"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import authClass from "../../classes/auth-class"
import { PageToNavigateAfterLogin } from "../../utils/constants/page-constants"
import personalInfoClass from "../../classes/personal-info-class"

function LogoHeaderSection(): React.ReactNode {
	const pathname = usePathname()

	const whereToNavigate = useMemo((): PageNames => {
		if (
			pathname === "/register-google" ||
			(authClass.isLoggedIn && isNull(personalInfoClass.username))
		) return "/register-google"
		if (authClass.isFinishedWithSignup) return PageToNavigateAfterLogin
		return "/"
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, authClass.isFinishedWithSignup, authClass.isLoggedIn, personalInfoClass.username])

	return (
		<div
			className={"inline-flex items-center grow-0 shrink-0 z-10"}
		>
			<Link
				href={whereToNavigate}
				className="flex items-center font-semibold text-3xl sm:text-3xl shrink-0 duration-0"
			>
				<Image
					src="/favicon.svg"
					alt="Logo"
					className="size-16"
					style={{ verticalAlign: "middle", width: "auto" }}
					width={32}
					height={32}
				/>
			</Link>
		</div>
	)
}

export default observer(LogoHeaderSection)

"use client"

import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import ClassicLayout from "./classic-layout"
import InternalPagesLayout from "./internal-pages-layout"
import { PrivatePageNames, OpenPages } from "../../utils/constants/page-constants"
import personalInfoClass from "../../classes/personal-info-class"

function ConditionalLayout({ children } : { children: React.ReactNode }) {
	const pathname = usePathname()

	const isPrivatePage = PrivatePageNames.some(privatePath =>
		pathname.startsWith(privatePath)
	)

	const isOpenPage = OpenPages.some(openPath =>
		pathname.startsWith(openPath)
	)

	// If user is logged in (has username) AND the page is either private or open
	if (!isNull(personalInfoClass.username) && (isPrivatePage || isOpenPage)) {
		return (
			<InternalPagesLayout>
				{children}
			</InternalPagesLayout>
		)
	}

	// Otherwise use ClassicLayout (not logged in, or not a private/open page)
	let extraClasses = undefined
	if (
		pathname === "/" ||
		pathname === "/community-guidelines" ||
		pathname === "/privacy" ||
		pathname === "/terms"
	) extraClasses = ""

	return (
		<ClassicLayout extraClasses={extraClasses}>
			{children}
		</ClassicLayout>
	)
}

export default observer(ConditionalLayout)

"use client"

import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import ClassicLayout from "./classic-layout"
import InternalPagesLayout from "./internal-pages-layout"
import personalInfoClass from "../../classes/personal-info-class"
import { PrivatePageNames, OpenPages } from "../../utils/constants/page-constants"
import authClass from "../../classes/auth-class"

function ConditionalLayout({ children } : { children: React.ReactNode }) {
	const pathname = usePathname()
	const isPrivatePage = PrivatePageNames.some(path => pathname.startsWith(path))
	const isOpenPage = OpenPages.some(path => pathname.startsWith(path))

	const shouldShowInternalLayout = (
		!isNull(personalInfoClass.username) ||
		authClass.isLoggingOut ||      // ADD
		authClass.isAuthenticating     // ADD
	) && (isPrivatePage || isOpenPage)

	if (shouldShowInternalLayout) {
		return <InternalPagesLayout>{children}</InternalPagesLayout>
	}

	return <ClassicLayout>{children}</ClassicLayout>
}

export default observer(ConditionalLayout)

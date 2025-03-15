"use client"

import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import ClassicLayout from "./classic-layout"
import useUsername from "../../hooks/memos/username"
import InternalPagesLayout from "./internal-pages-layout"
import { PrivatePageNames } from "../../utils/constants"

function ConditionalLayout({ children } : { children: React.ReactNode }) {
	const pathName = usePathname()
	const username = useUsername()

	const isPrivatePage = PrivatePageNames.some(privatePath =>
		pathName.startsWith(privatePath)
	)

	if (!isPrivatePage || isNull(username)) {
		let extraClasses = undefined
		if (pathName === "/") extraClasses = ""

		return (
			<ClassicLayout extraClasses={extraClasses}>
				{children}
			</ClassicLayout>
		)
	}

	return (
		<InternalPagesLayout>
			{children}
		</InternalPagesLayout>
	)
}

export default observer(ConditionalLayout)

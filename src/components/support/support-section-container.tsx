"use client"

import { isNull } from "lodash-es"
import useUsername from "../../hooks/memos/username"

export default function SupportSectionContainer({ children } : { children: React.ReactNode }) {
	const username = useUsername()

	let parentClasses = "px-8 sm:px-8 md:px-16 lg:px-72 mt-12"
	let childClasses = ""
	if (!isNull(username)) {
		parentClasses = "px-8 sm:px-8 md:px-16 lg:px-32 mt-5"
		childClasses = "max-w-xl"
	}

	return (
		<div className={parentClasses}>
			<div className="font-medium text-3xl text-questionText">
				About Us
			</div>
			<div className={childClasses}>
				{children}
			</div>
		</div>
	)
}

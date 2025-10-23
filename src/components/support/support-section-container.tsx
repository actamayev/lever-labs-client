"use client"

import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import personalInfoClass from "../../classes/personal-info-class"

interface Props {
	children: React.ReactNode
	title?: string
}

function SupportSectionContainer(props: Props): React.ReactNode {
	const { children, title = "About Us"} = props

	let parentClasses = "px-8 sm:px-8 md:px-16 lg:px-72 mt-12"
	let childClasses = ""
	if (!isNull(personalInfoClass.username)) {
		parentClasses = "px-8 sm:px-8 md:px-16 lg:px-32 mt-5"
		childClasses = "max-w-xl"
	}

	return (
		<div className={parentClasses}>
			<div className="font-medium text-3xl text-question-text">
				{title}
			</div>
			<div className={childClasses}>
				{children}
			</div>
		</div>
	)
}

export default observer(SupportSectionContainer)

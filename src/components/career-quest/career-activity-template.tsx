"use client"

import CareerQuestActivityHeader from "./career-header"

interface Props {
	children: React.ReactNode
}

export default function CareerActivityTemplate(props: Props) {
	const { children } = props

	return (
		<div className="flex flex-col h-screen min-h-0">
			<CareerQuestActivityHeader />

			<div className="flex-1 min-h-0 pt-20">
				{children}
			</div>
			{/* <ActivityFooter
				nextPageLink={nextPageLink}
				nextPageActivity={nextPageActivity}
				nextPageTooltip={nextPageTooltip}
			/> */}
		</div>
	)
}

"use client"

import { cn } from "../../lib/utils"

interface Props {
	sectionTitle: string
	children: React.ReactNode
	extraClasses?: string
}

export default function SupportSection(props: Props): React.ReactNode {
	const { sectionTitle, children, extraClasses = "" } = props

	return (
		<div className={cn("mb-10", extraClasses)}>
			<div className="text-question-text font-medium text-xl">
				{sectionTitle}
			</div>
			<div className="text-wolf mt-6" style={{ fontWeight: 350 }}>
				{children}
			</div>
		</div>
	)
}

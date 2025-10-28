"use client"

import Link from "next/link"
import { cn } from "../../lib/utils"

interface Props {
	linkTo: StaticPageNames
	linkTitle: string
	extraClasses?: string
}

export default function FooterLink(props: Props): React.ReactNode {
	const { linkTo, linkTitle, extraClasses } = props

	return (
		<div className="text-sm">
			<Link
				href={linkTo}
				className={cn(
					"text-question-text hover:underline duration-0 whitespace-nowrap",
					extraClasses
				)}
			>
				{linkTitle}
			</Link>
		</div>
	)
}

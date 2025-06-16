"use client"

import Link from "next/link"
import { cn } from "../../lib/shadcn/utils"

interface Props {
	linkTo: StaticPageNames
	linkTitle: string
	extraClasses?: string
}

// Use: https://www.shadcnblocks.com/block/footer7
export default function FooterLink(props: Props) {
	const { linkTo, linkTitle, extraClasses } = props

	return (
		<div className="text-sm">
			<Link
				href={linkTo}
				className={cn(
					"text-questionText hover:underline duration-0 whitespace-nowrap",
					extraClasses
				)}
			>
				{linkTitle}
			</Link>
		</div>
	)
}

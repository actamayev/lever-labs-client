"use client"

import Link from "next/link"
import toUpper from "lodash-es/toUpper"
import { usePathname } from "next/navigation"
import { cn } from "../../lib/shadcn/utils"

export function SupportBorder() {
	return (
		<div className="container mx-auto w-full">
			<div className="border-b-2 border-swan rounded-xl"></div>
		</div>
	)
}
function SupportLink({ page } : { page: "mission" | "contact" }) {
	const pathname = usePathname()
	const active = pathname === page

	return (
		<li className="relative flex flex-col items-center group">
			<Link
				href={page}
				className={cn(
					"text-disabledLilypadIcon hover:!text-pipThemeText duration-0 text-base px-4 py-2 flex flex-col items-center",
					active ? "!text-pipThemeText" : ""
				)}
			>
				<span>{toUpper(page)}</span>
				<div
					className={cn(
						"absolute -bottom-0.5 w-full h-1 duration-0 cursor-pointer",
						active ? "bg-pipThemeText" : "group-hover:bg-pipThemeText"
					)}
				/>
			</Link>
		</li>
	)
}

export default function SupportHeader () {
	return (
		<header className="py-6">
			<nav className="container">
				<ul className="flex justify-start items-center space-x-0 text-lg font-medium">
					<SupportLink page="mission" />
					<SupportLink page="contact" />
				</ul>
			</nav>
			<SupportBorder />
		</header>
	)
}

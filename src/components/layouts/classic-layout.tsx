"use client"

import { cn } from "../../lib/shadcn/utils"
import Footer from "../footer/footer"
import HeaderNav from "../site-header/header-nav"

interface Props {
	extraClasses?: string
	children: React.ReactNode
}

function ClassicLayout(props: Props): React.ReactNode {
	const { extraClasses = "px-14", children } = props

	return (
		<div className="min-h-screen bg-standardBackground flex flex-col duration-0">
			<HeaderNav />
			<main className={cn(
				"flex-1 w-full overflow-y-auto pt-14",
				extraClasses
			)}>
				{children}
			</main>
			<Footer />
		</div>
	)
}

export default function PublicOnlyPage({ children }: { children: React.ReactNode }): React.ReactNode {
	return (
		<ClassicLayout>
			{children}
		</ClassicLayout>
	)
}

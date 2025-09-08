"use client"

import { cn } from "../../lib/shadcn/utils"
import Footer from "../footer/footer"
import HeaderNav from "../site-header/header-nav"

interface Props {
	extraClasses?: string
	children: React.ReactNode
	isIncompleteSignup?: boolean // Add this
}

function ClassicLayout(props: Props): React.ReactNode {
	const { extraClasses = "px-14", children, isIncompleteSignup = false } = props

	return (
		<div className="min-h-screen bg-standardBackground flex flex-col duration-0">
			<HeaderNav isIncompleteSignup={isIncompleteSignup} />
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

export default function PublicOnlyPage({ children, isIncompleteSignup = false }: { children: React.ReactNode, isIncompleteSignup?: boolean }): React.ReactNode {
	return (
		<ClassicLayout isIncompleteSignup={isIncompleteSignup}>
			{children}
		</ClassicLayout>
	)
}

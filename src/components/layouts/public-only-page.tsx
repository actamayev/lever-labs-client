"use client"

import Footer from "../footer/footer"
import HeaderNav from "../site-header/header-nav"
import { cn } from "../../lib/shadcn/utils"

interface PublicOnlyPageProps {
	extraClasses?: string
	children: React.ReactNode
	isIncompleteSignup?: boolean
}

export default function PublicOnlyPage(props: PublicOnlyPageProps): React.ReactNode {
	const { extraClasses , children, isIncompleteSignup = false } = props

	return (
		<div className="min-h-screen bg-standardBackground flex flex-col duration-0">
			{/* <HeaderNav isIncompleteSignup={isIncompleteSignup} /> */}
			<main className={cn(!extraClasses ? "flex-1 w-full overflow-y-auto pt-14 px-14" : extraClasses)}>
				{children}
			</main>
			<Footer />
		</div>
	)
}

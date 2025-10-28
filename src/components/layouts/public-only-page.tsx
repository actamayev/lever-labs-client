"use client"

import { cn } from "../../lib/utils"
import Footer from "../footer/footer"
import { usePathname } from "next/navigation"
import HeaderNav from "../site-header/header-nav"
import { OpenPages } from "../../utils/constants/page-constants"

interface PublicOnlyPageProps {
	extraClasses?: string
	children: React.ReactNode
}

export default function PublicOnlyPage(props: PublicOnlyPageProps): React.ReactNode {
	const { extraClasses, children } = props
	const pathname = usePathname()

	const isOpenPage = OpenPages.some((path): boolean => pathname.startsWith(path))
	if (!isOpenPage) return children

	return (
		<div className="min-h-screen bg-standardBackground flex flex-col duration-0">
			<HeaderNav />
			<main className={cn(!extraClasses ? "flex-1 w-full overflow-y-auto pt-14 px-14" : extraClasses)}>
				{children}
			</main>
			<Footer />
		</div>
	)
}

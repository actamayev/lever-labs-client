"use client"

import { cn } from "../../lib/shadcn/utils"
import Footer from "../footer/footer"
import HeaderNav from "../site-header/header-nav"

interface PublicOnlyPageProps {
	children: React.ReactNode
	isIncompleteSignup?: boolean
}

interface ClassicLayoutProps extends PublicOnlyPageProps {
	extraClasses?: string
}

function ClassicLayout(props: ClassicLayoutProps): React.ReactNode {
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

export default function PublicOnlyPage({ children, isIncompleteSignup = false }: PublicOnlyPageProps): React.ReactNode {
	return (
		<ClassicLayout isIncompleteSignup={isIncompleteSignup}>
			{children}
		</ClassicLayout>
	)
}

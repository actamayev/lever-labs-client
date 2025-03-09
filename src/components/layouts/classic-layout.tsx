import { cn } from "../../lib/shadcn/utils"
import Footer from "../footer/footer"
import HeaderNav from "../site-header/header-nav"

interface Props {
	extraClasses?: string
	children: React.ReactNode
}

export default function ClassicLayout(props: Props) {
	const { extraClasses = "px-14", children } = props

	return (
		<div className="min-h-screen bg-standardBackground flex flex-col transition-all duration-300">
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

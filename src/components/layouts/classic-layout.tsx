import { cn } from "../../lib/shadcn/utils"
import Footer from "../footer/footer"
import HeaderNav from "../site-header/header-nav"

interface Props {
	extraClasses?: string
	children: React.ReactNode
}

export default function ClassicLayout(props: Props) {
	const { extraClasses = "px-14", children } = props  // Remove py-6 mt-14 from default

	return (
		<div className="min-h-screen bg-white dark:bg-black flex flex-col">
			<HeaderNav />
			<main className={cn(
				"flex-1 w-full overflow-y-auto pt-14", // Add pt-14 here instead
				extraClasses
			)}>
				{children}
			</main>
			<Footer />
		</div>
	)
}

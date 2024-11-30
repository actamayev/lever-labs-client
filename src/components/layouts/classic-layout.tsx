import Footer from "../footer/footer"
import HeaderNav from "../site-header/header-nav"

interface Props {
	extraClasses?: string
	children: React.ReactNode
}

export default function ClassicLayout (props: Props) {
	const { extraClasses = "px-14 py-6 mt-14", children } = props

	return (
		<div className="min-h-screen bg-blue-50 dark:bg-black flex flex-col">
			<HeaderNav />
			<div className={`flex-1 w-full overflow-y-auto ${extraClasses}`}>
				{children}
			</div>
			<Footer />
		</div>
	)
}

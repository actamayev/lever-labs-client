import Footer from "./footer/footer"
import NotificationBox from "./notification-box"
import HeaderNav from "./site-header/header-nav"

interface Props {
	children: React.ReactNode
}

export default function Layout (props: Props) {
	const { children } = props

	return (
		<div className="min-h-screen bg-zinc-200 dark:bg-zinc-900 flex flex-col">
			<HeaderNav />
			<div className="flex-1 w-full overflow-y-auto px-14 py-6 mt-14">
				{children}
			</div>
			<Footer />
			<NotificationBox />
		</div>
	)
}

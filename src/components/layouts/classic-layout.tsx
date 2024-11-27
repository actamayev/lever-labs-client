import Footer from "../footer/footer"
import HeaderNav from "../site-header/header-nav"

export default function ClassicLayout ({ children } : {children: React.ReactNode}) {
	return (
		<div className="min-h-screen bg-zinc-200 dark:bg-zinc-900 flex flex-col">
			<HeaderNav />
			<div className="flex-1 w-full overflow-y-auto px-14 py-6 mt-14">
				{children}
			</div>
			<Footer />
		</div>
	)
}

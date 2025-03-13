import { useCallback } from "react"
import toUpper from "lodash-es/toUpper"
import { Link, useLocation } from "react-router"
import { cn } from "../../lib/shadcn/utils"

function SupportLink({ page } : { page: "mission" | "contact" }) {
	const location = useLocation()

	const isActive = useCallback((route: PageNames) => {
		return location.pathname === route
	}, [location.pathname])

	return (
		<li>
			<Link
				to={`/${page}`}
				className={cn(
					"text-gray-800 dark:text-gray-200 hover:!text-pipThemeText duration-0",
					isActive(`/${page}`) ? "!text-pipThemeText" : ""
				)}
			>
				{toUpper(page)}
			</Link>
		</li>
	)
}

export default function SupportHeader () {


	return (
		<header className="w-full py-6">
			<nav className="container">
				<ul className="flex justify-start items-center space-x-12 text-lg font-medium">
					<SupportLink page="mission" />
					<SupportLink page="contact" />
				</ul>
			</nav>
			<div className="container mx-auto mt-4">
				<div className="border-b-2 border-gray-200 dark:border-gray-700 rounded-xl"></div>
			</div>
		</header>
	)
}

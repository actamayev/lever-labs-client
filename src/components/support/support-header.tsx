import { useCallback } from "react"
import { Link, useLocation } from "react-router"
import { cn } from "../../lib/shadcn/utils"

export default function SupportHeader () {
	const location = useLocation()

	const isActive = useCallback((route: PageNames) => {
		return location.pathname === route
	}, [location.pathname])

	return (
		<header className="w-full py-6">
			<nav className="container">
				<ul className="flex justify-start space-x-12 text-lg font-medium">
					<li>
						<Link
							to="/about"
							className={cn(
								"text-gray-800 dark:text-gray-200 hover:text-pipThemeText duration-0",
								isActive("/about") ? "!text-pipThemeText" : ""
							)}
						>
							About Us
						</Link>
					</li>
					<li>
						<Link
							to="/mission"
							className={cn(
								"text-gray-800 dark:text-gray-200 hover:text-pipThemeText duration-0",
								isActive("/mission") ? "!text-pipThemeText" : ""
							)}
						>
							Mission
						</Link>
					</li>
					<li>
						<Link
							to="/contact"
							className={cn(
								"text-gray-800 dark:text-gray-200 hover:text-pipThemeText duration-0",
								isActive("/contact") ? "!text-pipThemeText" : ""
							)}
						>
							Contact Us
						</Link>
					</li>
				</ul>
			</nav>
			<div className="container mx-auto mt-4">
				<div className="border-b-2 border-gray-200 dark:border-gray-700 rounded-xl"></div>
			</div>
		</header>
	)
}

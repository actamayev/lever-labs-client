import toUpper from "lodash-es/toUpper"
import { Link, useLocation } from "react-router"
import { cn } from "../../lib/shadcn/utils"

function SupportLink({ page } : { page: "mission" | "contact" }) {
	const location = useLocation()
	const active = location.pathname === `/${page}`

	return (
		<li className="relative flex flex-col items-center group">
			<Link
				to={`/${page}`}
				className={cn(
					"text-disabledLilypadIcon hover:!text-pipThemeText duration-0 text-base px-4 py-2 flex flex-col items-center",
					active ? "!text-pipThemeText" : ""
				)}
			>
				<span>{toUpper(page)}</span>
				<div
					className={cn(
						"absolute -bottom-0.5 w-full h-1 duration-0 cursor-pointer",
						active ? "bg-pipThemeText" : "group-hover:bg-pipThemeText"
					)}
				/>
			</Link>
		</li>
	)
}

export default function SupportHeader () {
	return (
		<header className="py-6">
			<nav className="container">
				<ul className="flex justify-start items-center space-x-0 text-lg font-medium">
					<SupportLink page="mission" />
					<SupportLink page="contact" />
				</ul>
			</nav>
			<div className="container mx-auto w-full">
				<div className="border-b-2 border-gray-200 dark:border-gray-700 rounded-xl"></div>
			</div>
		</header>
	)
}

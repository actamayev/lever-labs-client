import { Link, useLocation } from "react-router-dom"

function BlueDotRobots() {
	const location = useLocation()
	if (
		location.pathname === "/garage" ||
		location.pathname === "/lab" ||
		location.pathname === "/sandbox" ||
		location.pathname === "/account"
	) return null

	return (
		<span className="ml-2">Blue Dot Robots</span>
	)
}

export default function LogoHeaderSection() {
	return (
		<div className="inline-flex items-center flex-grow-0 flex-shrink-0 z-10">
			<Link
				to="/"
				className="flex items-center font-semibold text-3xl flex-shrink-0
				text-slate-950 hover:text-pipTheme dark:text-white dark:hover:text-slate-200"
			>
				<img
					src="/favicon.svg"
					alt="Logo"
					className="ml-1"
					style={{ height: "40px", verticalAlign: "middle" }}
				/>
				<BlueDotRobots />
			</Link>
		</div>
	)
}

import { Link } from "react-router"

export default function LogoHeaderSection() {
	return (
		<div className="inline-flex items-center flex-grow-0 flex-shrink-0 z-10">
			<Link
				to="/"
				className="flex items-center font-semibold text-xl sm:text-3xl flex-shrink-0
		text-gray-950 hover:text-pipThemeText dark:text-white dark:hover:text-gray-200 duration-0"
			>
				<img
					src="/favicon.svg"
					alt="Logo"
					className="ml-1 h-8 sm:h-10"
					style={{ verticalAlign: "middle" }}
				/>
				<span className="ml-2">Blue Dot Robots</span>
			</Link>
		</div>
	)
}

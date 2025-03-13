import { Link } from "react-router"

export default function LogoHeaderSection({ isScrolled } : { isScrolled: boolean}) {
	return (
		<div
			className={`inline-flex items-center flex-grow-0 flex-shrink-0 z-10 ${
				!isScrolled ? "justify-center" : ""
			}`}
		>
			<Link
				to="/"
				className="flex items-center font-semibold text-3xl sm:text-3xl flex-shrink-0 text-pipThemeText duration-0"
			>
				<img
					src="/favicon.svg"
					alt="Logo"
					className="h-8 sm:h-10"
					style={{ verticalAlign: "middle" }}
				/>
				{/* Text visibility: always show on mobile when not scrolled, hidden on mobile when scrolled */}
				<span
					className={`ml-2 ${isScrolled ? "hidden sm:inline" : "inline"}`}
				>
					Blue Dot Robots
				</span>
			</Link>
		</div>
	)
}

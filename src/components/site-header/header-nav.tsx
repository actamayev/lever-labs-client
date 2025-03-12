import { useState, useEffect } from "react"
import GoToLabButton from "./go-to-lab-button"
import LogoHeaderSection from "./logo-header-section"
import LoginLogoutHeaderItem from "../auth/login-logout-header-item"

export default function HeaderNav() {
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<nav
			id="header"
			className={`fixed top-0 left-0 w-full z-20 transition-all duration-300 border-b-2 backdrop-blur-sm ${
				isScrolled
					? "bg-standardBackground/70 border-gray-200 dark:border-gray-800"
					: "bg-standardBackground/50 border-transparent"
			}`}
		>
			<div
				className="flex flex-col sm:flex-row justify-between items-center w-full px-52 relative py-2 sm:py-0 sm:h-14"
				style={{ paddingLeft: "256px", paddingRight: "256px" }}
			>
				<LogoHeaderSection />
				<div className="flex items-center z-10 mt-2 sm:mt-0">
					<GoToLabButton />
					<LoginLogoutHeaderItem />
				</div>
			</div>
		</nav>
	)
}

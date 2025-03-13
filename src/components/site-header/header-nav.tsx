import { useState, useEffect } from "react"
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
			className={`fixed top-0 left-0 w-full z-20 transition-all duration-300 border-b backdrop-blur-sm ${
				isScrolled
					? "bg-standardBackground/70 border-gray-200 dark:border-gray-800"
					: "bg-standardBackground/50 border-transparent"
			}`}
		>
			<div
				className={`flex flex-row items-center w-full px-4 sm:px-8 md:px-16 lg:px-60 relative py-2 sm:py-0 sm:h-14 ${
					!isScrolled ? "justify-center sm:justify-between" : "justify-between"
				}`}
			>
				{/* Logo section */}
				<LogoHeaderSection isScrolled={isScrolled} />

				{/* Right section with buttons */}
				<div
					className={`flex items-center z-10 ${
						!isScrolled ? "hidden sm:flex" : "flex"
					}`}
				>
					<LoginLogoutHeaderItem />
				</div>
			</div>
		</nav>
	)
}

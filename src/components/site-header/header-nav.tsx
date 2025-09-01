"use client"

import { useState, useEffect } from "react"
import { cn } from "../../lib/shadcn/utils"
import LogoHeaderSection from "./logo-header-section"
import LoginLogoutHeaderItem from "../auth/login-logout-header-item"

export default function HeaderNav(): React.ReactNode {
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
			className={`fixed top-0 left-0 w-full z-20 duration-0 border-b backdrop-blur-sm ${
				isScrolled
					? "bg-standardBackground/70 border-landingOuterBorder"
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
					className={cn(
						"flex items-center z-10",
						isScrolled ? "flex" : "hidden sm:flex"
					)}
				>
					<LoginLogoutHeaderItem />
				</div>
			</div>
		</nav>
	)
}

"use client"

import { useState, useEffect } from "react"
import LogoHeaderSection from "./logo-header-section"

export default function HeaderNav(): React.ReactNode {
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect((): () => void => {
		const handleScroll = (): void => {
			setIsScrolled(window.scrollY > 0)
		}

		window.addEventListener("scroll", handleScroll)
		return (): void => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<nav
			id="header"
			className={`fixed top-0 left-0 w-full z-20 duration-0 backdrop-blur-xs ${
				isScrolled
					? "bg-standard-background/70"
					: "bg-standard-background/50"
			}`}
		>
			<div
				className={`flex flex-row items-center w-full px-4 sm:px-8 md:px-16 lg:px-60 relative py-2 sm:py-0 sm:h-14 ${
					!isScrolled ? "justify-center sm:justify-between" : "justify-between"
				}`}
			>
				{/* Logo section */}
				<LogoHeaderSection />
			</div>
		</nav>
	)
}

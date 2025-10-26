"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import LogoHeaderSection from "../site-header/logo-header-section"

export default function LandingNavigation(): React.ReactNode {
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		let ticking = false

		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					setIsScrolled(window.scrollY > 0)
					ticking = false
				})
				ticking = true
			}
		}

		window.addEventListener("scroll", handleScroll, { passive: true })
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled ? "bg-standardBackground/70 backdrop-blur-sm" : "bg-transparent"
			}`}
		>
			<div className="px-8 md:px-20 xl:px-32 max-w-9xl mx-auto">
				<div className="flex items-center justify-between h-16 sm:h-20">
					{/* Logo */}
					<LogoHeaderSection />

					{/* Navigation buttons */}
					<div className="flex items-center gap-3">
						<Link href="/login">
							<Button variant="ghost" className="rounded-full">
								Log in
							</Button>
						</Link>
						<Link href="/preorder">
							<Button variant="default" className="rounded-full">
								Pre-order now
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	)
}

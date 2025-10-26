"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import LogoHeaderSection from "../site-header/logo-header-section"

export default function LandingNavigation(): React.ReactNode {
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
			className={`fixed top-0 left-0 right-0 z-50 duration-0 transition-all ${
				isScrolled && "bg-standardBackground/70 backdrop-blur-sm"
			}`}
		>
			<div className="px-8 md:px-20 xl:px-32 max-w-9xl mx-auto">
				<div className="flex items-center justify-between h-16 sm:h-20">
					{/* Logo */}
					<LogoHeaderSection isScrolled={isScrolled} />

					{/* Navigation buttons */}
					<div className="flex items-center gap-3">
						<Link href="/login">
							<Button variant="ghost" className="rounded-full">
								Log in
							</Button>
						</Link>
						<Link href="/preorder">
							<Button variant="default" className="rounded-full">
								Buy now
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	)
}

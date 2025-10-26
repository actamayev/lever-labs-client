"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import LogoHeaderSection from "../site-header/logo-header-section"

export default function LandingNavigation(): React.ReactNode {
	const navRef = useRef<HTMLElement>(null)

	useEffect((): () => void => {
		let ticking = false
		let isScrolled = false

		const handleScroll = (): void => {
			if (ticking) return
			window.requestAnimationFrame((): void => {
				const scrolled = window.scrollY > 0

				if (scrolled !== isScrolled) {
					isScrolled = scrolled
					if (navRef.current) {
						if (scrolled) {
							navRef.current.classList.add("bg-standardBackground/70", "backdrop-blur-sm")
							navRef.current.classList.remove("bg-transparent")
						} else {
							navRef.current.classList.remove("bg-standardBackground/70", "backdrop-blur-sm")
							navRef.current.classList.add("bg-transparent")
						}
					}
				}
				ticking = false
			})
			ticking = true
		}

		window.addEventListener("scroll", handleScroll, { passive: true })
		return (): void => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<nav
			ref={navRef}
			className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
		>
			<div className="px-8 md:px-20 xl:px-32 max-w-9xl mx-auto">
				<div className="flex items-center justify-between h-16 sm:h-20">
					<LogoHeaderSection />
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

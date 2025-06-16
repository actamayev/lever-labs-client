"use client"

import { usePathname } from "next/navigation"
import FooterLink from "./footer-link"
import FooterThemeToggle from "./footer-theme-toggle"
import FooterSocialSection from "./footer-social-section"

export default function Footer() {
	const pathname = usePathname() // This returns the current path as a string
	if (
		pathname !== "/" &&
		pathname !== "/terms" &&
		pathname !== "/privacy" &&
		pathname !== "/mission" &&
		pathname !== "/contact" &&
		pathname !== "/schools" &&
		pathname !== "/community-guidelines"
	) return null

	return (
		<footer id="footer" className="bg-standardBackground/70 w-full pb-3 md:py-3 z-20 duration-0">
			<div className="flex justify-center w-full px-4 sm:px-60">
				<div className="w-full max-w-screen-2xl">
					{/* Mobile: Stack vertically, Desktop: 3 columns */}
					<div className="flex flex-col items-center space-y-6 md:space-y-0 md:grid md:grid-cols-3 w-full">
						{/* Left section - Social links (desktop) */}
						<div className="hidden md:flex md:items-center md:justify-start">
							<FooterSocialSection />
							<FooterLink
								linkTo="/terms"
								linkTitle="Terms"
								extraClasses="ml-6"
							/>
							<FooterLink
								linkTo="/privacy"
								linkTitle="Privacy"
								extraClasses="ml-6"
							/>
							<FooterLink
								linkTo="/community-guidelines"
								linkTitle="Community Guidelines"
								extraClasses="ml-6"
							/>
						</div>

						{/* Center section - Company name */}
						<div className="flex items-center justify-center">
							<FooterLink
								linkTo="/"
								linkTitle="Blue Dot Robots"
								extraClasses="font-bold text-base"
							/>
						</div>

						{/* Right section - About, Contact, Theme (desktop) */}
						<div className="hidden md:flex md:items-center md:justify-end md:gap-6">
							<FooterLink
								linkTo="/mission"
								linkTitle="About Us"
							/>
							<FooterLink
								linkTo="/contact"
								linkTitle="Contact Us"
							/>
							<FooterLink
								linkTo="/schools"
								linkTitle="Schools"
							/>
							<FooterThemeToggle />
						</div>

						{/* Mobile-only stacked sections */}
						<div className="flex flex-col items-center space-y-6 md:hidden w-full">
							{/* Contact Us and About Us on same line */}
							<div className="flex items-center justify-center space-x-6">
								<FooterLink
									linkTo="/mission"
									linkTitle="About Us"
								/>
								<FooterLink
									linkTo="/contact"
									linkTitle="Contact Us"
								/>
								<FooterLink
									linkTo="/schools"
									linkTitle="Schools"
								/>
							</div>

							{/* Social Links and Theme Toggle combined */}
							<div className="flex items-center justify-center space-x-6 mb-4 md:mb-0">
								<FooterSocialSection />
								<FooterThemeToggle />
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

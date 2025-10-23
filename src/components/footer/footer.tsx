
"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import FooterLink from "./footer-link"
import FooterThemeToggle from "./footer-theme-toggle"
import FooterSocialSection from "./footer-social-section"

// eslint-disable-next-line max-lines-per-function
export default function Footer(): React.ReactNode {
	const pathname = usePathname()
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
		<footer id="footer" className="bg-standard-background py-6 md:py-8 z-20 border-t border-landing-outer-border">
			<div className="container max-w-(--breakpoint-2xl) mx-auto px-4 sm:px-60">
				{/* Main footer content */}
				<div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
					{/* Logo and company section */}
					<div className="col-span-3 lg:mb-0 space-y-4">
						<Link
							href="/"
							className="inline-flex items-center font-semibold text-3xl sm:text-3xl shrink-0 duration-0"
						>
							<Image
								src="/favicon.svg"
								alt="Logo"
								className="h-8 sm:h-10 -ml-0.5"
								style={{ verticalAlign: "middle", width: "auto" }}
								width={32}
								height={32}
							/>
							<span className="ml-2 inline">
								Lever Labs
							</span>
						</Link>
						<FooterSocialSection />
						<FooterThemeToggle />
					</div>

					{/* Navigation sections */}
					<div className="col-span-1">
						<h3 className="mb-4 font-bold text-sm">Company</h3>
						<ul className="space-y-3 text-sm">
							<li className="text-muted-foreground hover:text-primary">
								<FooterLink
									linkTo="/mission"
									linkTitle="About Us"
									extraClasses="font-medium hover:text-primary"
								/>
							</li>
							<li className="text-muted-foreground hover:text-primary">
								<FooterLink
									linkTo="/contact"
									linkTitle="Contact Us"
									extraClasses="font-medium hover:text-primary"
								/>
							</li>
							<li className="text-muted-foreground hover:text-primary">
								<FooterLink
									linkTo="/schools"
									linkTitle="Schools"
									extraClasses="font-medium hover:text-primary"
								/>
							</li>
						</ul>
					</div>

					<div className="col-span-1">
						<h3 className="mb-4 font-bold text-sm">Privacy and Terms</h3>
						<ul className="space-y-3 text-sm">
							<li className="text-muted-foreground hover:text-primary">
								<FooterLink
									linkTo="/terms"
									linkTitle="Terms"
									extraClasses="font-medium hover:text-primary"
								/>
							</li>
							<li className="text-muted-foreground hover:text-primary">
								<FooterLink
									linkTo="/privacy"
									linkTitle="Privacy"
									extraClasses="font-medium hover:text-primary"
								/>
							</li>
							<li className="text-muted-foreground hover:text-primary">
								<FooterLink
									linkTo="/community-guidelines"
									linkTitle="Community Guidelines"
									extraClasses="font-medium hover:text-primary"
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	)
}

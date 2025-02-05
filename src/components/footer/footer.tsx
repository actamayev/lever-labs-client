import FooterLink from "./footer-link"
import FooterThemeToggle from "./footer-theme-toggle"
import LinkToExternalSite from "./link-to-external-site"
import FooterSocialSection from "./footer-social-section"

export default function Footer() {
	return (
		<footer id="footer" className="bg-white dark:bg-black w-full md:py-3 z-20 transition-all duration-300">
			<div className="flex justify-center w-full px-4">
				<div className="w-full max-w-screen-2xl">
					{/* Mobile: Stack vertically, Desktop: 3 columns */}
					<div className="flex flex-col items-center space-y-6 md:space-y-0 md:grid md:grid-cols-3 w-full">
						{/* Left section - Social links (desktop) */}
						<div className="hidden md:flex md:items-center md:justify-start">
							<FooterSocialSection />
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
							<LinkToExternalSite
								title="About Us"
								link="https://help.bluedotrobots.com/bdr"
							/>
							<FooterLink
								linkTo="/contact"
								linkTitle="Contact Us"
							/>
							<FooterThemeToggle />
						</div>

						{/* Mobile-only stacked sections */}
						<div className="flex flex-col items-center space-y-6 md:hidden w-full">
							{/* Contact Us */}
							<div>
								<FooterLink
									linkTo="/contact"
									linkTitle="Contact Us"
								/>
							</div>

							{/* About Us */}
							<div>
								<LinkToExternalSite
									title="About Us"
									link="https://help.bluedotrobots.com/bdr"
								/>
							</div>

							{/* Social Links and Theme Toggle combined */}
							<div className="flex items-center justify-center space-x-6">
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

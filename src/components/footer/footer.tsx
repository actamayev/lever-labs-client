import FooterLink from "./footer-link"
import FooterSocialSection from "./footer-social-section"
import FooterSupportSection from "./footer-support-section"
import FooterThemeToggle from "./footer-theme-toggle"

export default function Footer() {
	return (
		<footer id="footer" className="bg-white dark:bg-black w-full py-3 z-20 transition-all duration-300">
			<div className="flex justify-center w-full">
				<div className="grid grid-cols-3 w-full max-w-screen-xl">
					<div className="flex items-center justify-start">
						<FooterSocialSection />
					</div>
					<div className="flex items-center justify-center">
						<FooterLink
							linkTo="/"
							linkTitle="Blue Dot Robots"
							extraClasses="font-bold text-base"
						/>
					</div>
					<div className="flex items-center justify-end gap-10">
						<FooterSupportSection />
						<FooterThemeToggle />
					</div>
				</div>
			</div>
		</footer>
	)
}

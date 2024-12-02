import FooterLink from "./footer-link"
import FooterSocialSection from "./footer-social-section"
import FooterSupportSection from "./footer-support-section"

export default function Footer() {
	return (
		<footer id="footer" className="bg-white dark:bg-black w-full py-3">
			<div className="flex justify-center w-full">
				<div className="flex flex-row w-full max-w-screen-xl justify-between">
					<div className="flex items-center">
						<FooterSocialSection />
					</div>
					<div className="flex items-center">
						<FooterLink
							linkTo="/"
							linkTitle="Blue Dot Robots"
							extraClasses="font-bold text-base"
						/>
					</div>
					<div className="flex items-center">
						<FooterSupportSection />
					</div>
				</div>
			</div>
		</footer>
	)
}

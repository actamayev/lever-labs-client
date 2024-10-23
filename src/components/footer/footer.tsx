import FooterLink from "./footer-link"
import FooterSocialSection from "./footer-social-section"
import FooterSupportSection from "./footer-support-section"

export default function Footer() {
	return (
		<footer id="footer" className="bg-zinc-100 dark:bg-zinc-800 w-full py-3">
			<div className="flex justify-center w-full">
				<div className="flex flex-row w-full max-w-screen-xl justify-between">
					<div className="flex items-center">
						<FooterSocialSection />
					</div>
					<div className="flex items-center text-zinc-950 dark:text-zinc-50 font-normal text-base">
						<FooterLink linkTo="/" linkTitle="Blue Dot Robots" />
					</div>
					<div className="flex items-center">
						<FooterSupportSection />
					</div>
				</div>
			</div>
		</footer>
	)
}

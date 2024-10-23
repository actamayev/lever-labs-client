import FooterLink from "./footer-link"
import XLink from "../social-links/x-link"
import LinkedinLink from "../social-links/linkedin-link"

export default function FooterSocialSection() {
	return (
		<div className="flex items-center">
			<XLink />
			<div className="ml-3 mr-7">
				<LinkedinLink />
			</div>
			<FooterLink linkTo="/contact" linkTitle="Contact Us" />
		</div>
	)
}

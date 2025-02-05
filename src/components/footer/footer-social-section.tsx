import XLink from "../social-links/x-link"
import LinkedinLink from "../social-links/linkedin-link"

export default function FooterSocialSection() {
	return (
		<div className="flex items-center space-x-3">
			<XLink />
			<LinkedinLink />
		</div>
	)
}

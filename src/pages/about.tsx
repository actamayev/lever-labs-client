import PageHelmet from "../components/helmet/page-helmet"
import SupportHeader from "../components/support/support-header"
import SupportSectionContainer from "../components/support/support-section-container"

export default function About() {
	return (
		<div>
			<PageHelmet pageTitle="/about" />
			<SupportSectionContainer>
				<SupportHeader />
				About
			</SupportSectionContainer>
		</div>
	)
}

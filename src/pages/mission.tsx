import PageHelmet from "../components/helmet/page-helmet"
import SupportHeader from "../components/support/support-header"
import SupportSectionContainer from "../components/support/support-section-container"

export default function Mission() {
	return (
		<div>
			<PageHelmet pageTitle="/mission" />
			<SupportSectionContainer>
				<SupportHeader />
				Mission
			</SupportSectionContainer>
		</div>
	)
}

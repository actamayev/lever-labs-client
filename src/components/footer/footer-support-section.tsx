import LinkToExternalSite from "./link-to-external-site"

export default function FooterSupportSection() {
	return (
		<div className="flex space-x-6 flex-row">
			{/* <LinkToExternalSite
				title="Privacy"
				link="https://help.bluedotrobots.com/legal/privacy-policy"
			/> */}
			<LinkToExternalSite
				title="About Us"
				link="https://help.bluedotrobots.com"
			/>
			{/* <LinkToExternalSite
				title="FAQ"
				link="https://help.bluedotrobots.com/frequently-asked-questions"
			/> */}
		</div>
	)
}

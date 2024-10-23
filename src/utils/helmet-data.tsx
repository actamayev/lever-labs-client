import React from "react"
import BasicHelmet from "../components/helmet/basic-helmet"

interface HelmetData {
	[key: string]: React.ReactNode
}

const helmetData: HelmetData = {
	"/": (
		<BasicHelmet
			pageTitleData="Blue Dot Robots | []"
			description="Blue Dot Robots Description"
			url="https://www.bluedotrobots.com"
			needsBlueDotSuffix={false}
		/>
	),
	"/contact": (
		<BasicHelmet
			pageTitleData="Contact Us"
			description="Get in touch with the BlueDot team."
			url="https://www.bluedotrobots.com/contact"
		/>
	)
}

export default helmetData

import React from "react"
import BasicHelmet from "../components/helmet/basic-helmet"

interface HelmetData {
	[key: string]: React.ReactNode
}

const helmetData: HelmetData = {
	"/": (
		<BasicHelmet
			pageTitleData="Blue Dot Robots | Coming Soon"
			description="Explore Pip, the educational robot designed to make learning robotics fun and accessible.
			From coding basics to advanced control algorithms, start your robotics journey today."
			url="https://www.bluedotrobots.com"
			needsBlueDotSuffix={false}
		/>
	),
	"/contact": (
		<BasicHelmet
			pageTitleData="Contact Us"
			description="Get in touch with the Blue Dot Robots team."
			url="https://www.bluedotrobots.com/contact"
		/>
	)
}

export default helmetData

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
	)
}

export default helmetData

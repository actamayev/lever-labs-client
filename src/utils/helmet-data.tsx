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
	"/login": (
		<BasicHelmet
			pageTitleData="Login"
			description="Login to your Blue Dot account to start building with Pip."
			url="https://www.bluedotrobots.com/login"
		/>
	),
	"/register": (
		<BasicHelmet
			pageTitleData="Register"
			description="Create an account on Blue Dot to start building with Pip."
			url="https://www.bluedotrobots.com/register"
		/>
	),
	"/register-username": (
		<BasicHelmet
			pageTitleData="Register Username"
			description="Choose a username for your Blue Dot account."
			url="https://www.bluedotrobots.com/register-username"
		/>
	),
	"/the-lab": (
		<BasicHelmet
			pageTitleData="The Lab"
			description="Write code to control your Pip in The Lab."
			url="https://www.bluedotrobots.com/the-lab"
		/>
	),
	"/contact": (
		<BasicHelmet
			pageTitleData="Contact Us"
			description="Get in touch with the Blue Dot team."
			url="https://www.bluedotrobots.com/contact"
		/>
	)
}

export default helmetData

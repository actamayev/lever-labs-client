/* eslint-disable max-len */
import labHelmetData from "./lab-helmet-data"
import BasicHelmet from "../../components/helmet/basic-helmet"

const allHelmetData: HelmetData = {
	"/": (
		<BasicHelmet
			pageTitleData="Blue Dot Robots | The best way to learn robotics is with Pip"
			description="Explore Pip, the educational robot designed to make learning robotics fun and seamless.
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
	"/add-pip": (
		<BasicHelmet
			pageTitleData="Add Pip"
			description="Add your Pip to your account. Get it connected to the Wi-Fi in under a minute to start hands-on experimentation."
			url="https://www.bluedotrobots.com/add-pip"
		/>
	),
	// "/garage": (
	// 	<BasicHelmet
	// 		pageTitleData="Garage"
	// 		description="Log in to view your connected robots, manage connections, and navigate to the Lab or Sandbox for further exploration."
	// 		url="https://www.bluedotrobots.com/garage"
	// 	/>
	// ),
	"/sandbox": (
		<BasicHelmet
			pageTitleData="Sandbox"
			description="Freely control your robot with coding block primitives for open-ended exploration and experimentation."
			url="https://www.bluedotrobots.com/sandbox"
		/>
	),
	"/settings": (
		<BasicHelmet
			pageTitleData="Settings"
			description="View and edit your personal information, profile picture, and login/security settings."
			url="https://www.bluedotrobots.com/settings"
		/>
	),
	"/contact": (
		<BasicHelmet
			pageTitleData="Contact Us"
			description="Get in touch with the Blue Dot team."
			url="https://www.bluedotrobots.com/contact"
		/>
	),
	...labHelmetData
}

export default allHelmetData

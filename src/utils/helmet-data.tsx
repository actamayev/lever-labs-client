/* eslint-disable max-len */
import React from "react"
import BasicHelmet from "../components/helmet/basic-helmet"

interface HelmetData {
	[key: string]: React.ReactNode
}

// TODO: Put a helmet for each of the lab pages
const helmetData: HelmetData = {
	"/": (
		<BasicHelmet
			pageTitleData="Blue Dot Robots | Coming Soon"
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
	"/garage": (
		<BasicHelmet
			pageTitleData="Garage"
			description="Log in to view your connected robots, manage connections, and navigate to the Lab or Sandbox for further exploration."
			url="https://www.bluedotrobots.com/garage"
		/>
	),
	"/lab": (
		<BasicHelmet
			pageTitleData="Lab"
			description="Explore guided tutorials, videos, and challenges to learn about robot sensors and control in a structured learning environment."
			url="https://www.bluedotrobots.com/lab"
		/>
	),
	"/lab/welcome": (
		<BasicHelmet
			pageTitleData="Lab Welcome"
			description="Welcome to the Lab! This is where the magic happens. Where you'll learn the same fundamental skills you need to land rockets, design self-driving cars, and build robotics that can walk (and talk)."
			url="https://www.bluedotrobots.com/lab/welcome"
		/>
	),
	"/sandbox": (
		<BasicHelmet
			pageTitleData="Sandbox"
			description="Freely control your robot with coding block primitives for open-ended exploration and experimentation."
			url="https://www.bluedotrobots.com/sandbox"
		/>
	),
	"/account": (
		<BasicHelmet
			pageTitleData="My Account"
			description="View and edit your personal information, profile picture, and login/security settings."
			url="https://www.bluedotrobots.com/account"
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

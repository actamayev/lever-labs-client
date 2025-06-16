"use client"

import { observer } from "mobx-react"
import { Oval } from "react-loader-spinner"
import personalInfoClass from "../classes/personal-info-class"

function LoadingOval() {
	return (
		<Oval
			height="22"
			width="22"
			color={personalInfoClass.defaultSiteTheme === "light" ? "#FFFFFF" : "#000000"}
			ariaLabel="oval-loading"
			wrapperStyle={{ cursor: "default" }} // Add the cursor style here
			wrapperClass=""
			strokeWidth={6} // Adjust this value to make the spinner thicker
			strokeWidthSecondary={6} // Adjust this value for the secondary stroke width
		/>
	)
}

export default observer(LoadingOval)

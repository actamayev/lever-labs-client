import { useState } from "react"
import Login from "./auth/login"
import Register from "./auth/register"

interface Props {
	whereToNavigate: PageNames
	customStyles?: object
}

export default function ShowAuthToNullUser(props: Props) {
	const { whereToNavigate, customStyles } = props
	const [loginOrRegister, setLoginOrRegister] = useState<LoginOrRegister>("Register")

	if (loginOrRegister === "Register") {
		return (
			<Register
				whereToNavigate={whereToNavigate}
				setLoginOrRegister={setLoginOrRegister}
				customStyles={customStyles}
			/>
		)
	}
	return (
		<Login
			whereToNavigate={whereToNavigate}
			setLoginOrRegister={setLoginOrRegister}
			customStyles={customStyles}
		/>
	)
}

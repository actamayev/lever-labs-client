import { observer } from "mobx-react"
import { FaVideo } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import { useAuthContext } from "../../contexts/auth-context"
import HoverOutlineComponent from "../hover-outline-component"

function CreateContentHeaderButton() {
	const location = useLocation()
	const authClass = useAuthContext()

	if (
		authClass.isLoggedIn === false ||
		location.pathname === "/register-username" ||
		location.pathname === "/creator/create-content"
	) return null

	return (
		<HoverOutlineComponent classes="relative flex items-center justify-center inline-flex flex-grow flex-shrink">
			<Link to="/creator/create-content" className="w-full">
				<div className="rounded h-9 flex items-center justify-center text-black dark:text-white">
					<FaVideo />
				</div>
			</Link>
		</HoverOutlineComponent>
	)
}

export default observer(CreateContentHeaderButton)

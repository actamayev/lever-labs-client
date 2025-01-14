import { observer } from "mobx-react"
import { useLocation, Link } from "react-router"
import { Button } from "./shadcn/ui/button"
import AuthHeaderLinks from "./auth/auth-header-links"
import { useAuthContext } from "../contexts/auth-context"

function NullUserNavLink() {
	const location = useLocation()
	const authClass = useAuthContext()

	if (location.pathname === "/login" || location.pathname === "/") {
		return (
			<Button
				variant="default"
				size="sm"
				className="bg-blue-600 hover:bg-blue-700 text-primary-foreground text-base
				dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300 font-normal transition-all duration-300"
				asChild
			>
				<Link to="/register">
					SIGN UP
				</Link>
			</Button>
		)
	} else if (location.pathname === "/register") {
		return (
			<Button
				variant="default"
				size="sm"
				className="bg-blue-600 hover:bg-blue-700 text-primary-foreground text-base
				dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300 font-normal transition-all duration-300"
				asChild
			>
				<Link to="/login">
					LOG IN
				</Link>
			</Button>
		)
	} else if (authClass.showLoginOrRegister === "Login") {
		return (
			<Button
				variant="default"
				size="sm"
				className="bg-blue-600 hover:bg-blue-700 text-primary-foreground text-base
			dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300 font-normal transition-all duration-300"
				onClick={() => authClass.setShowLoginOrRegister("Login")}
			>
				LOG IN
			</Button>
		)
	}
	return (
		<Button
			variant="default"
			size="sm"
			className="bg-blue-600 hover:bg-blue-700 text-primary-foreground text-base
            dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300 font-normal transition-all duration-300"
			// Remove asChild since we're just using text
			onClick={() => authClass.setShowLoginOrRegister("Register")}
		>
			SIGN UP
		</Button>
	)
}

export default observer(NullUserNavLink)

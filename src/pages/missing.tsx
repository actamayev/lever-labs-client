import { useCallback } from "react"
import { observer } from "mobx-react"
// TODO: Search for all cases of flask and code sandbox and replace
import { FlaskConical, Home } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import { useAuthContext } from "../contexts/auth-context"
import useTypedNavigate from "../hooks/navigate/typed-navigate"

function Missing() {
	const authClass = useAuthContext()
	const navigate = useTypedNavigate()

	const conditionalNavigation = useCallback(() => {
		if (authClass.isLoggedIn) return navigate("/lab")
		return navigate("/")
	}, [authClass.isLoggedIn, navigate])

	const conditionalText = () => {
		if (authClass.isLoggedIn) {
			return (
				<>
					Return to the Lab
					<FlaskConical className="ml-2 !h-7 !w-7" />
				</>
			)
		}
		return (
			<>
				Return home
				<Home className="ml-2 !h-7 !w-7" />
			</>
		)
	}
	return (
		<div className="flex flex-col items-center gap-8 pt-16">
			<h1 className="text-2xl font-semibold">
				Page Not Found
			</h1>
			<Button
				variant="tactile"
				onClick={conditionalNavigation}
				className="transition-none text-2xl p-5"
			>
				{conditionalText()}
			</Button>
		</div>
	)
}

export default observer(Missing)

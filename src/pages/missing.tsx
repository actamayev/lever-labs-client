import { useCallback } from "react"
import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import useTypedNavigate from "../hooks/navigate/typed-navigate"
import { CustomBeaker } from "../components/icons/custom-beaker"
import { CustomHouse } from "../components/icons/custom-house"
import { TactileButton } from "../components/shadcn/ui/tactile-button"

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
					<CustomBeaker className="ml-2 !h-7 !w-7" />
				</>
			)
		}
		return (
			<>
				Return home
				<CustomHouse className="ml-2 !h-7 !w-7" />
			</>
		)
	}
	return (
		<div className="flex flex-col items-center gap-8 pt-16">
			<h1 className="text-2xl font-semibold">
				Page Not Found
			</h1>
			<TactileButton
				onClick={conditionalNavigation}
				className="transition-none text-2xl p-5"
				shadowColor="black"
				shadowHeight={4}
			>
				{conditionalText()}
			</TactileButton>
		</div>
	)
}

export default observer(Missing)

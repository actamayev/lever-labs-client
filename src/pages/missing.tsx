import { useCallback } from "react"
import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import useTypedNavigate from "../hooks/navigate/typed-navigate"
import { CustomBeaker } from "../components/icons/custom-beaker"
import { CustomHouse } from "../components/icons/custom-house"
import { BlackWhiteTactileButton } from "../components/tactile-buttons"

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
					RETURN TO THE LAB
					<CustomBeaker className="ml-2 !h-7 !w-7" />
				</>
			)
		}
		return (
			<>
				RETURN HOME
				<CustomHouse className="ml-2 !h-7 !w-7" />
			</>
		)
	}
	return (
		<div className="flex flex-col items-center gap-8 pt-16">
			<h1 className="text-2xl font-semibold">
				Page Not Found
			</h1>
			<BlackWhiteTactileButton
				onClick={conditionalNavigation}
				className="text-2xl p-5"
				shadowHeight={4}
			>
				{conditionalText()}
			</BlackWhiteTactileButton>
		</div>
	)
}

export default observer(Missing)

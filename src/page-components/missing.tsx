"use client"

import { useCallback } from "react"
import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import useTypedNavigate from "../hooks/navigate/typed-navigate"
import { CustomHouse } from "../components/icons/custom-house"
import { BlackWhiteTactileButton } from "../components/buttons/tactile-buttons"
import { CustomBriefcase } from "../components/icons/custom-briefcase"

function Missing() {
	const authClass = useAuthContext()
	const navigate = useTypedNavigate()

	const conditionalNavigation = useCallback(() => {
		if (authClass.isLoggedIn) return navigate("/career-quest")
		return navigate("/")
	}, [authClass.isLoggedIn, navigate])

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
				{authClass.isLoggedIn ? (
					<>
						RETURN TO CAREER QUEST
						<CustomBriefcase className="ml-2 !h-7 !w-7" />
					</>
				) : (
					<>
						RETURN HOME
						<CustomHouse className="ml-2 !h-7 !w-7" />
					</>
				)}
			</BlackWhiteTactileButton>
		</div>
	)
}

export default observer(Missing)

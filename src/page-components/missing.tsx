"use client"

import Link from "next/link"
import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import { CustomHouse } from "../components/icons/custom-house"
import { CustomBriefcase } from "../components/icons/custom-briefcase"
import { BlackWhiteTactileButton } from "../components/buttons/tactile-buttons"

function Missing() {
	const authClass = useAuthContext()
	const destination = authClass.isLoggedIn ? "/career-quest" : "/"

	return (
		<div className="flex flex-col items-center gap-8 pt-16">
			<h1 className="text-2xl font-semibold">
				Page Not Found
			</h1>
			<Link href={destination}>
				<BlackWhiteTactileButton
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
			</Link>
		</div>
	)
}

export default observer(Missing)

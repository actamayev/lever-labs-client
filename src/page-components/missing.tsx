"use client"

import Link from "next/link"
import { observer } from "mobx-react"
import authClass from "../classes/auth-class"
import { CustomHouse } from "../icons/custom-house"
import { CustomGarage } from "../icons/custom-garage"
import { PageToNavigateAfterLogin } from "../utils/constants/page-constants"
import { BlackWhiteTactileButton } from "../components/buttons/tactile-buttons"

function Missing(): React.ReactNode {
	const destination = authClass.isFinishedWithSignup ? PageToNavigateAfterLogin : "/"

	return (
		<div className="flex flex-col items-center gap-8 pt-16">
			<h1 className="text-2xl font-semibold">
				Page Not Found
			</h1>
			<Link href={destination}>
				<BlackWhiteTactileButton className="text-2xl p-5">
					{authClass.isFinishedWithSignup ? (
						<>
							RETURN TO GARAGE
							<CustomGarage className="ml-2 !h-7 !w-7" />
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

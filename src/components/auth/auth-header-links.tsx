"use client"

import Link from "next/link"
import { observer } from "mobx-react"
import getAuthClass from "../../classes/auth-class"
import { BlueTactileButton } from "../buttons/tactile-buttons"

interface LinkAuthHeaderProps {
	title: string
	linkTo: PageNames
}

export function LinkAuthHeaderButton(props: LinkAuthHeaderProps): React.ReactNode {
	const { title, linkTo } = props

	return (
		<Link href={linkTo}>
			<BlueTactileButton className="text-xs sm:text-sm font-normal px-3 sm:px-4">
				{title}
			</BlueTactileButton>
		</Link>
	)
}

interface SetLoginOrRegisterAuthHeaderProps {
	title: string
	setShowLoginOrRegister: LoginOrRegister
}

function SetLoginOrRegisterAuthHeaderButton(props: SetLoginOrRegisterAuthHeaderProps): React.ReactNode {
	const { title, setShowLoginOrRegister } = props

	return (
		<BlueTactileButton
			className="text-sm font-normal"
			onClick={(): void => getAuthClass().setShowLoginOrRegister(setShowLoginOrRegister)}
		>
			{title}
		</BlueTactileButton>
	)
}

export default observer(SetLoginOrRegisterAuthHeaderButton)

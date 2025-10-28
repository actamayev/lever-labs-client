"use client"

import Link from "next/link"
import { observer } from "mobx-react"
import authClass from "../../classes/auth-class"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"

interface LinkAuthHeaderProps {
	title: string
	linkTo: PageNames
	className?: string
}

export function LinkAuthHeaderButton(props: LinkAuthHeaderProps): React.ReactNode {
	const { title, linkTo, className } = props

	return (
		<Link href={linkTo}>
			<Button
				variant="ghost"
				className={cn("text-xs sm:text-sm font-normal px-3 sm:px-4 hover:bg-polar rounded-full", className)}
			>
				{title}
			</Button>
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
		<Button
			variant="ghost"
			className="text-sm font-normal hover:bg-polar"
			onClick={(): void => authClass.setShowLoginOrRegister(setShowLoginOrRegister)}
		>
			{title}
		</Button>
	)
}

export default observer(SetLoginOrRegisterAuthHeaderButton)

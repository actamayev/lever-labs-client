"use client"

import { observer } from "mobx-react"
import { BlueTactileButton } from "./tactile-buttons"
import authClass from "../../classes/auth-context"

interface Props {
	loading?: boolean
	title: string
}

function AuthButton(props: Props) {
	const { loading, title } = props

	return (
		<BlueTactileButton
			type="submit"
			disabled={loading || authClass.isAuthenticating}
			className="w-full h-12 my-2"
		>
			{title}
		</BlueTactileButton>
	)
}

export default observer(AuthButton)

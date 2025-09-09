"use client"

import { observer } from "mobx-react"
import { BlueTactileButton } from "./tactile-buttons"
import getAuthClass from "../../classes/auth-class"

interface Props {
	loading?: boolean
	title: string
}

function AuthButton(props: Props): React.ReactNode {
	const { loading, title } = props

	return (
		<BlueTactileButton
			type="submit"
			disabled={loading || getAuthClass().isAuthenticating}
			className="w-full h-12 my-2"
		>
			{title}
		</BlueTactileButton>
	)
}

export default observer(AuthButton)

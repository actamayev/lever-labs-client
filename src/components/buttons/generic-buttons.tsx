"use client"

import { observer } from "mobx-react"
import { BlueTactileButton } from "./tactile-buttons"
import { useAuthContext } from "../../contexts/auth-context"

interface Props {
	loading?: boolean
	title: string
}

function AuthButton(props: Props) {
	const { loading, title } = props
	const authClass = useAuthContext()

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

import { Link } from "react-router"
import { observer } from "mobx-react"
import { BlueTactileButton } from "../buttons/tactile-buttons"
import { useAuthContext } from "../../contexts/auth-context"

interface LinkAuthHeaderProps {
	title: string
	linkTo: PageNames
}

export function LinkAuthHeaderButton(props: LinkAuthHeaderProps) {
	const { title, linkTo } = props

	return (
		<Link to={linkTo}>
			<BlueTactileButton
				shadowHeight={2}
				className="text-sm font-normal"
			>
				{title}
			</BlueTactileButton>
		</Link>
	)
}

interface SetLoginOrRegisterAuthHeaderProps {
	title: string
	setShowLoginOrRegister: LoginOrRegister
}

function SetLoginOrRegisterAuthHeaderButton(props: SetLoginOrRegisterAuthHeaderProps) {
	const { title, setShowLoginOrRegister } = props
	const authClass = useAuthContext()

	return (
		<BlueTactileButton
			shadowHeight={2}
			className="text-sm font-normal"
			onClick={() => authClass.setShowLoginOrRegister(setShowLoginOrRegister)}
		>
			{title}
		</BlueTactileButton>
	)
}

export default observer(SetLoginOrRegisterAuthHeaderButton)

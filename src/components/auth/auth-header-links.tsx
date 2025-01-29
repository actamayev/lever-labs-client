import { Link } from "react-router"
import { observer } from "mobx-react"
import { Button } from "@/components/shadcn/ui/button"
import { useAuthContext } from "../../contexts/auth-context"
import { TactileButton } from "../shadcn/ui/tactile-button"

interface LinkAuthHeaderProps {
	title: string
	linkTo: PageNames
}

export function LinkAuthHeaderButton(props: LinkAuthHeaderProps) {
	const { title, linkTo } = props

	return (
		<Link to={linkTo}>
			<TactileButton
				className="bg-blue-700 hover:bg-blue-600 text-primary-foreground text-sm rounded-xl transition-none
				dark:bg-pipThemeOffWhite dark:text-black dark:hover:bg-pipThemeOffWhiteHover font-normal"
			>
				{title}
			</TactileButton>
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
		<TactileButton
			className="bg-blue-700 hover:bg-blue-600 text-primary-foreground text-sm rounded-xl transition-none
			dark:bg-pipThemeOffWhite dark:text-black dark:hover:bg-pipThemeOffWhiteHover font-normal"
			onClick={() => authClass.setShowLoginOrRegister(setShowLoginOrRegister)}
		>
			{title}
		</TactileButton>
	)
}

export default observer(SetLoginOrRegisterAuthHeaderButton)

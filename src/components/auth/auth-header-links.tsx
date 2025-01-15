import { Link } from "react-router"
import { observer } from "mobx-react"
import { Button } from "@/components/shadcn/ui/button"
import { useAuthContext } from "../../contexts/auth-context"

interface LinkAuthHeaderProps {
	title: string
	linkTo: PageNames
}

// TODO: Transition all buttons to be tactile.
export function LinkAuthHeaderButton(props: LinkAuthHeaderProps) {
	const { title, linkTo } = props

	return (
		<Button
			variant="tactile"
			className="bg-blue-700 hover:bg-blue-600 text-primary-foreground text-sm rounded-xl transition-none
			dark:bg-pipThemeOffWhite dark:text-black dark:hover:bg-pipThemeOffWhiteHover font-normal"
			asChild
		>
			<Link to={linkTo}>
				{title}
			</Link>
		</Button>
	)
}

interface SetLoginOrRegisterAuthHeaderProps {
	title: string
	loginOrRegister: LoginOrRegister
}

function SetLoginOrRegisterAuthHeaderButton(props: SetLoginOrRegisterAuthHeaderProps) {
	const { title, loginOrRegister } = props
	const authClass = useAuthContext()

	return (
		<Button
			variant="tactile"
			className="bg-blue-700 hover:bg-blue-600 text-primary-foreground text-sm rounded-xl transition-none
			dark:bg-pipThemeOffWhite dark:text-black dark:hover:bg-pipThemeOffWhiteHover font-normal"
			onClick={() => authClass.setShowLoginOrRegister(loginOrRegister)}
		>
			{title}
		</Button>
	)
}

export default observer(SetLoginOrRegisterAuthHeaderButton)

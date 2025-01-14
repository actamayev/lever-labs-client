import { Link } from "react-router"
import { observer } from "mobx-react"
import { Button } from "@/components/shadcn/ui/button"
import { useAuthContext } from "../../contexts/auth-context"

interface LinkAuthHeaderProps {
	title: string
	linkTo: PageNames
}

export function LinkAuthHeaderButton(props: LinkAuthHeaderProps) {
	const { title, linkTo } = props

	return (
		<Button
			variant="default"
			size="sm"
			className="bg-blue-600 hover:bg-blue-700 text-primary-foreground text-sm rounded-xl
		dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300 font-normal transition-all duration-300"
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
			variant="default"
			size="sm"
			className="bg-blue-600 hover:bg-blue-700 text-primary-foreground text-base
			dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300 font-normal transition-all duration-300"
			onClick={() => authClass.setShowLoginOrRegister(loginOrRegister)}
		>
			{title}
		</Button>
	)
}

export default observer(SetLoginOrRegisterAuthHeaderButton)

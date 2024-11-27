import { Link } from "react-router-dom"
import { Button } from "@/components/shadcn/ui/button"

interface Props {
	setLoginOrRegister?: React.Dispatch<React.SetStateAction<LoginOrRegister>>
}

export default function SubLoginInfo(props: Props) {
	const { setLoginOrRegister } = props

	if (!setLoginOrRegister) {
		return (
			<div className="text-center text-sm text-foreground/60">
				Don&apos;t have an account?{" "}
				<Link to="/register" className="underline hover:text-foreground">
					Sign up
				</Link>
			</div>
		)
	}

	return (
		<div className="text-center text-sm text-foreground/60">
			Don&apos;t have an account?{" "}
			<Button
				variant="link"
				className="p-0 h-auto"
				onClick={() => setLoginOrRegister("Register")}
			>
				Sign up
			</Button>
		</div>
	)
}

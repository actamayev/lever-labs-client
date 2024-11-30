import { Link } from "react-router"
import { Button } from "@/components/shadcn/ui/button"

interface Props {
	setLoginOrRegister?: React.Dispatch<React.SetStateAction<LoginOrRegister>>
}

export default function SubRegisterInfo(props: Props) {
	const { setLoginOrRegister } = props

	if (!setLoginOrRegister) {
		return (
			<div className="text-center text-sm text-foreground/60">
				Already have an account?{" "}
				<Link to="/login" className="underline hover:text-foreground">
					Login
				</Link>
			</div>
		)
	}

	return (
		<div className="text-center text-sm text-foreground/60">
			Already have an account?{" "}
			<Button
				variant="link"
				className="p-0 h-auto"
				onClick={() => setLoginOrRegister("Login")}
			>
				Login
			</Button>
		</div>
	)
}

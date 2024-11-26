import _ from "lodash"
import { Link } from "react-router-dom"
import { Button } from "@/components/shadcn/ui/button"

interface Props {
  setLoginOrRegister?: React.Dispatch<React.SetStateAction<LoginOrRegister>>
}

export default function SubRegisterInfo(props: Props) {
	const { setLoginOrRegister } = props

	if (_.isUndefined(setLoginOrRegister)) {
		return (
			<div className="flex items-center justify-center gap-1 text-sm text-foreground">
				<span>Already have an account?</span>
				<Link to="/login">
					<Button variant="link" className="p-0 h-auto font-semibold">
						Login
					</Button>
				</Link>
			</div>
		)
	}

	return (
		<div className="flex items-center justify-center gap-1 text-sm text-foreground">
			<span>Already have an account?</span>
			<Button
				variant="link"
				className="p-0 h-auto font-semibold"
				onClick={() => setLoginOrRegister("Login")}
			>
				Login
			</Button>
		</div>
	)
}

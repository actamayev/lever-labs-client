import _ from "lodash"
import { Link } from "react-router-dom"
import { Button } from "@/components/shadcn/ui/button"

interface Props {
  setLoginOrRegister?: React.Dispatch<React.SetStateAction<LoginOrRegister>>
}

export default function SubLoginInfo(props: Props) {
	const { setLoginOrRegister } = props

	if (_.isUndefined(setLoginOrRegister)) {
		return (
			<div className="flex items-center justify-center gap-1 text-sm text-foreground">
				<span>Need an account?</span>
				<Link to="/register">
					<Button variant="link" className="p-0 h-auto font-semibold">
						Register
					</Button>
				</Link>
			</div>
		)
	}

	return (
		<div className="flex items-center justify-center gap-1 text-sm text-foreground">
			<span>Need an account?</span>
			<Button
				variant="link"
				className="p-0 h-auto font-semibold"
				onClick={() => setLoginOrRegister("Register")}
			>
				Register
			</Button>
		</div>
	)
}

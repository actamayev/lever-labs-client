import _ from "lodash"
import { Link } from "react-router-dom"

interface Props {
	setLoginOrRegister?: React.Dispatch<React.SetStateAction<LoginOrRegister>>
}

export default function SubRegisterInfo(props: Props) {
	const { setLoginOrRegister } = props

	if (_.isUndefined(setLoginOrRegister)) {
		return (
			<div className="text-zinc-950 dark:text-zinc-200 flex items-center">
				<span>
					Already have an account?&nbsp;
				</span>
				<Link to="/login" className="hover:underline font-semibold">
					Login
				</Link>
			</div>
		)
	}

	return (
		<div className="text-zinc-950 dark:text-zinc-200 flex items-center">
			<span>
				Already have an account?&nbsp;
			</span>
			<span
				className="hover:underline cursor-pointer font-semibold"
				onClick={() => setLoginOrRegister("Login")}
			>
				Login
			</span>
		</div>
	)
}


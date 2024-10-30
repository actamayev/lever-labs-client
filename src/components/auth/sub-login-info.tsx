import _ from "lodash"
import { Link } from "react-router-dom"

interface Props {
	setLoginOrRegister?: React.Dispatch<React.SetStateAction<LoginOrRegister>>
}

export default function SubLoginInfo(props: Props) {
	const { setLoginOrRegister } = props

	if (_.isUndefined(setLoginOrRegister)) {
		return (
			<div className="text-zinc-950 dark:text-zinc-200 flex items-center">
				<span>
					Need an account?&nbsp;
				</span>
				<Link to="/register" className="hover:underline font-semibold">
					Register
				</Link>
			</div>
		)
	}

	return (
		<div className="text-zinc-950 dark:text-zinc-200 flex items-center">
			<span>
				Need an account?&nbsp;
			</span>
			<div
				className="hover:underline cursor-pointer font-semibold"
				onClick={() => setLoginOrRegister("Register")}
			>
				Register
			</div>
		</div>
	)
}

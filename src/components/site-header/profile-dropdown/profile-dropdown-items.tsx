import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import { useMemo, useState } from "react"
import { IoWallet } from "react-icons/io5"
import { FaShoppingBag } from "react-icons/fa"
import { RiLogoutBoxRLine } from "react-icons/ri"
import { BsFillCollectionPlayFill } from "react-icons/bs"
import useHandleLogout from "../../../hooks/auth/handle-logout"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

const useDropdownItemClasses = () => {
	const baseClass = "px-4 py-2 flex items-center hover:bg-zinc-200 dark:hover:bg-zinc-800"
	return {
		bottom: `${baseClass} rounded-b-md`,
		middle: baseClass
	}
}

function ProfileDropdownItems() {
	const personalInfoClass = usePersonalInfoContext()
	const [logoutDisabled, setLogoutDisabled] = useState(false)
	const handleLogout = useHandleLogout(setLogoutDisabled)
	const classes = useDropdownItemClasses()

	const username = useMemo(() => {
		return personalInfoClass.username
	}, [personalInfoClass.username])

	return (
		<div className="text-base text-zinc-950 dark:text-zinc-200">
			<div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-700 font-medium">
				@{username || ""}
			</div>

			<Link to="/ownership" className={classes.middle}>
				<FaShoppingBag className="mr-2" size={17} />
				Ownership
			</Link>
			<Link to="/wallet" className={classes.middle}>
				<IoWallet className="mr-2" size={17} />
				Wallet
			</Link>
			<Link to="/creator/studio" className={classes.middle}>
				<BsFillCollectionPlayFill className="mr-2" size={17} />
				Studio
			</Link>
			<div className="block">
				<button
					onClick={handleLogout}
					className={`${classes.bottom} w-full text-left`}
					disabled={logoutDisabled}
				>
					<RiLogoutBoxRLine className="mr-2" size={17} />
					Sign out
				</button>
			</div>
		</div>
	)
}

export default observer(ProfileDropdownItems)

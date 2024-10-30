import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import { useMemo, useState } from "react"
import { HiBeaker } from "react-icons/hi"
import { RiLogoutBoxRLine } from "react-icons/ri"
import useHandleLogout from "../../../hooks/auth/handle-logout"
import { usePersonalInfoContext } from "../../../contexts/personal-info-context"

const useDropdownItemClasses = () => {
	const baseClass = "px-4 py-2 flex items-center hover:bg-slate-200 dark:hover:bg-slate-800"
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
		<div className="text-base text-slate-950 dark:text-slate-200">
			<div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 font-medium">
				@{username || ""}
			</div>

			<Link to="/the-lab" className={classes.middle}>
				<HiBeaker className="mr-2" size={17} />
				The Lab
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

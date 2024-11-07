import { useState } from "react"
import { Link } from "react-router-dom"
import { HiBeaker } from "react-icons/hi"
import { GiTinker } from "react-icons/gi"
import { TbSandbox } from "react-icons/tb"
import { FaUserCircle } from "react-icons/fa"
import { RiLogoutBoxRLine } from "react-icons/ri"
import useHandleLogout from "../../../hooks/auth/handle-logout"

const useDropdownItemClasses = () => {
	const baseClass = "px-3 py-2 flex items-center hover:bg-slate-200 dark:hover:bg-slate-800"
	return {
		bottom: `${baseClass} rounded-b-md`,
		middle: baseClass
	}
}

export default function ProfileDropdownItems() {
	const [logoutDisabled, setLogoutDisabled] = useState(false)
	const handleLogout = useHandleLogout(setLogoutDisabled)
	const classes = useDropdownItemClasses()

	return (
		<div className="text-base text-slate-950 dark:text-slate-200">
			<Link to="/the-garage" className={classes.middle}>
				<GiTinker className="mr-2" size={20} />
				The Garage
			</Link>
			<Link to="/the-lab" className={classes.middle}>
				<HiBeaker className="mr-2" size={20} />
				The Lab
			</Link>
			<Link to="/the-sandbox" className={classes.middle}>
				<TbSandbox className="mr-2" size={20} />
				The Sandbox
			</Link>
			<Link to="/my-account" className={classes.middle}>
				<FaUserCircle className="mr-2" size={20} />
				My Account
			</Link>
			<div className="block border-t border-slate-200 dark:border-slate-800">
				<button
					onClick={handleLogout}
					className={`${classes.bottom} w-full text-left`}
					disabled={logoutDisabled}
				>
					<RiLogoutBoxRLine className="mr-2" size={20} />
					Log out
				</button>
			</div>
		</div>
	)
}

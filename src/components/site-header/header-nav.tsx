import PipUUIDs from "./pip-uuids/pip-uuids"
import ChooseSiteTheme from "../choose-site-theme"
import LogoHeaderSection from "./logo-header-section"
import LoginLogoutHeaderItem from "./login-logout-header-item"

export default function HeaderNav() {
	return (
		<nav id="header" className="bg-white dark:bg-zinc-800 fixed top-0 left-0 w-full z-20 pt-0.5">
			<div className="flex justify-between items-center w-full px-2 relative h-14">
				<LogoHeaderSection />
				<div className="flex items-center z-10">
					<PipUUIDs />
					<ChooseSiteTheme />
					<LoginLogoutHeaderItem />
				</div>
			</div>
		</nav>
	)
}

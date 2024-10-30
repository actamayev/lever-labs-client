import ChooseSiteTheme from "../choose-site-theme"
import LogoHeaderSection from "./logo-header-section"
// import HeaderSearchBar from "../search-bars/header-search-bar"
import LoginLogoutHeaderItem from "./login-logout-header-item"
import CreateContentHeaderButton from "./create-content-header-button"

export default function HeaderNav() {
	return (
		<nav id="header" className="bg-white dark:bg-neutral-900 fixed top-0 left-0 w-full z-20 pt-0.5">
			<div className="flex justify-between items-center w-full px-2 relative h-14">
				<LogoHeaderSection />
				<div className="flex items-center z-10">
					<CreateContentHeaderButton />
					<ChooseSiteTheme />
					<LoginLogoutHeaderItem />
				</div>
			</div>
		</nav>
	)
}

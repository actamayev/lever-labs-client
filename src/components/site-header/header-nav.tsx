import GoToLabButton from "./go-to-lab-button"
import LogoHeaderSection from "./logo-header-section"
import LoginLogoutHeaderItem from "../auth/login-logout-header-item"

export default function HeaderNav() {
	return (
		<nav id="header" className="bg-white dark:bg-black fixed top-0 left-0 w-full z-20 transition-all duration-300">
			<div className="flex flex-col sm:flex-row justify-between items-center w-full px-4 sm:px-6 relative py-2 sm:py-0 sm:h-14">
				<LogoHeaderSection />
				<div className="flex items-center z-10 mt-2 sm:mt-0">
					<GoToLabButton />
					<LoginLogoutHeaderItem />
				</div>
			</div>
		</nav>
	)
}

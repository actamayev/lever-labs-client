import LogoHeaderSection from "./logo-header-section"
import GoToSandboxButton from "./go-to-sandbox-button"
import LoginLogoutHeaderItem from "../login-logout-header-item"

// TODO: If on home screen, make the header bg color change adapting to the background
export default function HeaderNav() {
	return (
		<nav id="header" className="bg-white dark:bg-black fixed top-0 left-0 w-full z-20 transition-all duration-300">
			<div className="flex justify-between items-center w-full px-2 relative h-14">
				<LogoHeaderSection />
				<div className="flex items-center z-10">
					<GoToSandboxButton />
					<LoginLogoutHeaderItem />
				</div>
			</div>
		</nav>
	)
}

import GoToSandboxButton from "./go-to-sandbox-button"
import LogoHeaderSection from "./logo-header-section"

export default function HeaderNav() {
	return (
		<nav id="header" className="bg-white dark:bg-zinc-800 fixed top-0 left-0 w-full z-20 pt-0.5">
			<div className="flex justify-between items-center w-full px-2 relative h-14">
				<LogoHeaderSection />
				<div className="flex items-center z-10">
					<GoToSandboxButton />
				</div>
			</div>
		</nav>
	)
}

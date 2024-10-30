import AuthHeaderLinks from "./auth/auth-header-links"

export default function NullUserNavLink() {
	return (
		<>
			<AuthHeaderLinks
				title="Log in"
				className="bg-inherit hover:bg-slate-200 dark:text-slate-100 dark:hover:bg-slate-800 text-slate-950 mx-2"
				linkTo="/login"
			/>
			<AuthHeaderLinks
				title="Sign up"
				className="bg-pipTheme hover:bg-pipThemeHover
				dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950"
				linkTo="/register"
			/>
		</>
	)
}

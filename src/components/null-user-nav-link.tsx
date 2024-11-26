import AuthHeaderLinks from "./auth/auth-header-links"

export default function NullUserNavLink() {
	return (
		<>
			<AuthHeaderLinks
				title="Log in"
				className="bg-inherit hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-zinc-700 text-zinc-950 mx-2"
				linkTo="/login"
			/>
			<AuthHeaderLinks
				title="Sign up"
				className="bg-pipTheme hover:bg-pipThemeHover
				dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950"
				linkTo="/register"
			/>
		</>
	)
}

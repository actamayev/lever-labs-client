import AuthHeaderLinks from "./auth/auth-header-links"

export default function NullUserNavLink() {
	return (
		<>
			<AuthHeaderLinks
				title="Log in"
				className="bg-inherit hover:bg-zinc-200 dark:text-zinc-100 dark:hover:bg-zinc-800 text-zinc-950 mx-2"
				linkTo="/login"
			/>
			<AuthHeaderLinks
				title="Sign up"
				className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 text-white dark:text-zinc-950"
				linkTo="/register"
			/>
		</>
	)
}

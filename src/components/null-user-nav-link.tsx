import AuthHeaderLinks from "./auth/auth-header-links"

export default function NullUserNavLink() {
	return (
		<>
			<AuthHeaderLinks
				title="Log in"
				variant="ghost"
				className="dark:hover:bg-zinc-600 text-black dark:text-white
				hover:text-zinc-900 dark:hover:text-white text-base font-medium"
				linkTo="/login"
			/>
			<AuthHeaderLinks
				title="Sign up"
				variant="default"
				className="bg-blue-600 hover:bg-blue-700 text-primary-foreground ml-2 text-base
				dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300 font-medium
				transition-colors"
				linkTo="/register"
			/>
		</>
	)
}

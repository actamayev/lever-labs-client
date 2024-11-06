declare global {
	interface LoginCredentials {
		contact: string
		password: string
	}

	interface RegisterCredentialsToSend {
		email: string
		password: string
		username: string
		siteTheme: SiteThemes
	}

	interface RegisterCredentials {
		email: string
		password: string
		username: string
		passwordConfirmation: string
	}

	type LoginOrRegister = "Login" | "Register"
}

export {}

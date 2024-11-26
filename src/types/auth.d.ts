import { z } from "zod"
import { loginSchema } from "../utils/auth/auth-schemas"

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

	type LoginFormValues = z.infer<typeof loginSchema>
	type RegisterUsernameFormValues = z.infer<typeof registerUsernameSchema>
	type RegisterFormValues = z.infer<typeof registerSchema>
}

export {}

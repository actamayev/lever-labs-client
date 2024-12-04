import { z } from "zod"
import { emailUpdatesSchema, loginSchema, registerSchema, registerUsernameSchema } from "../utils/auth/auth-schemas"

declare global {
	interface RegisterCredentialsToSend {
		email: string
		password: string
		username: string
		siteTheme: SiteThemes
	}

	type LoginOrRegister = "Login" | "Register"

	type LoginFormValues = z.infer<typeof loginSchema>
	type RegisterUsernameFormValues = z.infer<typeof registerUsernameSchema>
	type RegisterFormValues = z.infer<typeof registerSchema>
	type EmailUpdatesFormValues = z.infer<typeof emailUpdatesSchema>
}

export {}

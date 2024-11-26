import { z } from "zod"

export const loginSchema = z.object({
	contact: z.string()
		.min(1, "Username or email is required")
		.max(100, "Contact cannot exceed 100 characters"),
	password: z.string()
		.min(1, "Password is required")
		.max(100, "Password cannot exceed 100 characters")
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const registerSchema = z.object({
	email: z.string()
		.min(1, "Email is required")
		.max(100, "Email cannot exceed 100 characters"),
	username: z.string()
		.min(3, "Username is required")
		.max(100, "Username cannot exceed 100 characters"),
	password: z.string()
		.min(1, "Password is required")
		.max(100, "Password cannot exceed 100 characters"),
	passwordConfirmation: z.string()
		.min(1, "Password confirmation is required")
		.max(100, "Password confrimatino cannot exceed 100 characters")
})

export type RegisterFormValues = z.infer<typeof registerSchema>

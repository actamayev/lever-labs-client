import { z } from "zod"

export const loginSchema = z.object({
	contact: z.string()
		.min(3, "Username or email is required")
		.max(100, "Contact cannot exceed 100 characters"),
	password: z.string()
		.min(6, "Password is required")
		.max(100, "Password cannot exceed 100 characters")
})

export const registerUsernameSchema = z.object({
	username: z.string()
		.min(3, "Username is required")
		.max(100, "Username cannot exceed 100 characters"),
})

export const emailUpdatesSchema = z.object({
	email: z.string()
		.min(3, "Email is required")
		.max(100, "Email cannot exceed 100 characters")
		.email("Invalid email format")  // Add this line
})

export const registerSchema = z.object({
	email: z.string()
		.min(3, "Email is required")
		.max(100, "Email cannot exceed 100 characters")
		.email("Invalid email format"),
	username: z.string()
		.min(3, "Username is required")
		.max(100, "Username cannot exceed 100 characters"),
	password: z.string()
		.min(6, "Password is required")
		.max(100, "Password cannot exceed 100 characters"),
	passwordConfirmation: z.string()
		.min(6, "Password confirmation is required")
		.max(100, "Password confrimatino cannot exceed 100 characters")
})

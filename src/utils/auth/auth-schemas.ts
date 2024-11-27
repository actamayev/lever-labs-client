import { z } from "zod"
// TODO: Ajust the validation to be correct (ie password should be 6 ormore chars)

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

export const registerSchema = z.object({
	email: z.string()
		.min(3, "Email is required")
		.max(100, "Email cannot exceed 100 characters"),
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

export const addPipSchema = z.object({
	pipName: z.union([
		z.string()
			.min(3, "Username must be at least 3 characters")
			.max(20, "Username cannot exceed 100 characters"),
		z.string().length(0),  // Allow empty string
	]).optional(),
	pipUUID: z.string()
		.min(5, "Pip ID must be 5 alphanumeric characters")
		.max(5, "Pip ID must be 5 alphanumeric characters"),
	shouldAutoConnect: z.boolean()
})

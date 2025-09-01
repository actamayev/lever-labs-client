"use client"

import { z } from "zod"

export const loginSchema = z.object({
	contact: z.string()
		.min(3, "Please enter your username or email (at least 3 characters)")
		.max(100, "That's a bit long for a username or email - could you check it?"),
	password: z.string()
		.min(6, "Please enter your password (at least 6 characters)")
		.max(100, "That's an unusually long password - could you verify it?")
})

export const registerUsernameSchema = z.object({
	username: z.string()
		.min(3, "Choose a username that's at least 3 characters")
		.max(100, "Could you pick a shorter username?"),
	age: z.number({
		required_error: "Please enter your age",
		invalid_type_error: "Age must be a number",
	})
		.max(120, "Please enter a valid age")
		.nullable()
		.refine((val): boolean => val !== null, {
			message: "Please enter your age",
		}),
})

export const emailUpdatesSchema = z.object({
	email: z.string()
		.min(3, "Please enter your email to stay updated")
		.max(100, "That's a bit long for an email - could you check it?")
		.email("Hmm, that email format doesn't look quite right")
})

export const registerSchema = z.object({
	age: z.number({
		required_error: "Please enter your age",
		invalid_type_error: "Age must be a number",
	})
		.max(120, "Please enter a valid age")
		.nullable()
		.refine((val): boolean => val !== null, {
			message: "Please enter your age",
		}),
	email: z.string()
		.min(3, "Please enter your email to create your account")
		.max(100, "That's a bit long for an email - could you check it?")
		.email("Hmm, that email format doesn't look quite right"),
	username: z.string()
		.min(3, "Choose a username that's at least 3 characters")
		.max(100, "Could you pick a shorter username?"),
	password: z.string()
		.min(6, "For security, use at least 6 characters for your password")
		.max(100, "That's an unusually long password - could you verify it?"),
})

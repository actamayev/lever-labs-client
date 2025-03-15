"use client"

import { z } from "zod"

export default function isEmailValid(input: string): EmailOrUnknown {
	const emailSchema = z.string().email()
	const result = emailSchema.safeParse(input)

	return result.success ? "Email" : "Unknown"
}

"use client"

import { z } from "zod"

export const addPipSchema = z.object({
	pipUUID: z.string()
		.min(5, "Your Pip ID should be exactly 5 characters")
		.max(5, "Your Pip ID should be exactly 5 characters"),
	shouldAutoConnect: z.boolean(),
	pipName: z.union([
		z.string()
			.min(3, "Let's make your Pip's name at least 3 characters long")
			.max(20, "Could you shorten your Pip's name to 20 characters?"),
		z.string().length(0),  // Allow empty string
	]).optional(),
	wifiSSID: z.union([
		z.string()
			.min(1, "Please enter your Wi-Fi network name")
			.max(50, "That's a long network name! Can you check if it's correct?"),
		z.string().length(0),  // Allow empty string
	]).optional(),
	wifiPassword: z.union([
		z.string()
			.max(200, "That's an unusually long Wi-Fi password - could you verify it?"),
		z.string().length(0),  // Allow empty string
	]).optional(),
})

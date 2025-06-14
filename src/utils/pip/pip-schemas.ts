"use client"

import { z } from "zod"

export const addPipSchema = z.object({
	selectedWiFiNetworkName: z.string()
		.min(1, "Please enter your Wi-Fi network name")
		.max(50, "That's a long network name! Can you check if it's correct?"),
	selectedWiFiPassword: z.string()
		.max(200, "That's an unusually long Wi-Fi password - could you verify it?"),
	manualWiFiNetworkName: z.string()
		.min(1, "Please enter your Wi-Fi network name")
		.max(50, "That's a long network name! Can you check if it's correct?")
		.optional(),
	manualWiFiPassword: z.string()
		.max(200, "That's an unusually long Wi-Fi password - could you verify it?")
		.optional(),
	pipName: z.string()
		.min(3, "Let's make the name a bit longer - at least 3 characters")
		.max(20, "That's a bit long! Could you shorten it to 20 characters?"),
	pipUUID: z.string().nullable()
})

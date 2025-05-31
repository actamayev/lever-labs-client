"use client"

import { z } from "zod"

export const addPipSchema = z.object({
	wiFiNetworkName: z.string()
		.min(1, "Please enter your Wi-Fi network name")
		.max(50, "That's a long network name! Can you check if it's correct?"),
	wiFiPassword: z.string()
		.max(200, "That's an unusually long Wi-Fi password - could you verify it?"),
})

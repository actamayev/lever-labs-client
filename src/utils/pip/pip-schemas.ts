"use client"

import { z } from "zod"
import { PipUUID } from "@bluedotrobots/common-ts/types/utils"

export const addPipSchema = z.object({
	selectedWiFiNetworkName: z.string().optional(),
	selectedWiFiPassword: z.string()
		.max(200, "That's an unusually long Wi-Fi password - could you verify it?")
		.optional(),
	manualWiFiNetworkName: z.string()
		.max(50, "That's a long network name! Can you check if it's correct?")
		.optional(),
	manualWiFiPassword: z.string()
		.max(200, "That's an unusually long Wi-Fi password - could you verify it?")
		.optional(),
	pipName: z.string()
		.min(3, "Let's make the name a bit longer - at least 3 characters")
		.max(20, "That's a bit long! Could you shorten it to 20 characters?"),
	pipUUID: z.custom<PipUUID>().nullable()
})

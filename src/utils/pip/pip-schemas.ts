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
	pipUUID: z.custom<PipUUID>().nullable()
})

import { z } from "zod"

export const addPipSchema = z.object({
	pipUUID: z.string()
		.min(5, "Pip ID must be 5 alphanumeric characters")
		.max(5, "Pip ID must be 5 alphanumeric characters"),
	shouldAutoConnect: z.boolean(), // TODO: Should auto-connect should only show up if pip is online
	pipName: z.union([
		z.string()
			.min(3, "Pip's name must be at least 3 characters")
			.max(20, "Pip's name cannot exceed 20 characters"),
		z.string().length(0),  // Allow empty string
	]).optional(),
	wifiSSID: z.union([
		z.string()
			.min(1, "Wifi network name must be at least 1 character")
			.max(50, "Wifi network name cannot exceed 50 characters"),
		z.string().length(0),  // Allow empty string
	]).optional(),
	wifiPassword: z.union([
		z.string()
			.max(200, "Wifi password cannot exceed 200 characters"),
		z.string().length(0),  // Allow empty string
	]).optional(),
})

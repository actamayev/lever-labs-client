import { BlocklyJson } from "@bluedotrobots/common-ts"

// eslint-disable-next-line complexity
export default function normalizeSandboxJson (sandboxJson: unknown): BlocklyJson {
	// If it's already a proper object, return it
	if (typeof sandboxJson === "object" && sandboxJson !== null && !Array.isArray(sandboxJson)) {
		return sandboxJson as BlocklyJson
	}

	// If it's a string, try to parse it
	if (typeof sandboxJson === "string") {
		// Handle empty strings or just "{}"
		if (!sandboxJson.trim() || sandboxJson.trim() === "{}") {
			return { blocks: { languageVersion: 0, blocks: [] } }
		}

		try {
			// Remove surrounding quotes if they exist (handle triple quotes and double quotes)
			let cleanedJson = sandboxJson.trim()

			// Remove surrounding triple quotes
			if (cleanedJson.startsWith("\"\"\"") && cleanedJson.endsWith("\"\"\"")) {
				cleanedJson = cleanedJson.slice(3, -3)
			}

			// Remove surrounding double quotes and unescape
			if (cleanedJson.startsWith("\"") && cleanedJson.endsWith("\"")) {
				cleanedJson = cleanedJson.slice(1, -1)
			}

			// Unescape the JSON string
			cleanedJson = cleanedJson.replace(/\\"/g, "\"")

			const parsed = JSON.parse(cleanedJson)
			return parsed as BlocklyJson
		} catch (error) {
			console.warn("Failed to parse sandboxJson string:", sandboxJson, error)
			// Return empty blocks structure if parsing fails
			return { blocks: { languageVersion: 0, blocks: [] } }
		}
	}

	// Fallback for any other data type
	console.warn("Unexpected sandboxJson format:", typeof sandboxJson, sandboxJson)
	return { blocks: { languageVersion: 0, blocks: [] } }
}

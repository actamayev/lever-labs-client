declare global {
	type ProjectUUID = `${string}-${string}-${string}-${string}-${string}`

	interface SandboxProject {
		sandboxXml: string
		projectUUID: ProjectUUID
		isStarred: boolean
		projectName: string | null
		createdAt: Date
		updatedAt: Date
		projectNotes: string | null
	}

	type HexColor = string & { readonly __brand: unique symbol }
}

export {}

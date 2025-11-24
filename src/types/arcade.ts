import { ReactNode } from "react"

declare global {
	interface ArcadeGameMetadata {
		title: string
		instructions: ReactNode
		startScreenTitle: string
		startScreenDescription: string
	}
}

export {}

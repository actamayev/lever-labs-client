import { ReactNode } from "react"
import { ArcadeGameType } from "@lever-labs/common-ts/types/arcade"

declare global {
	interface ArcadeGameMetadata {
		title: string
		instructions: ReactNode
		startScreenTitle: string
		startScreenDescription: string
	}

	interface GameData {
		backgroundImage: string
		gameIcon: React.ReactNode
		gameName: string
		description: string
		href: PageNames
		gameType: ArcadeGameType
	}
}

export {}

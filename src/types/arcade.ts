import { ReactNode } from "react"

declare global {
	interface ArcadeGameState {
		score: number
		gameOver: boolean
		gameStarted: boolean
		highScore: number
	}

	type ArcadeGameType = "flappy" | "cityDriver" | "turret"

	interface ArcadeGameMetadata {
		title: string
		instructions: ReactNode
		startScreenTitle: string
		startScreenDescription: string
		localStorageKey: string
	}
}

export {}

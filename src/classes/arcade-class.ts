"use client"

import { action, makeAutoObservable } from "mobx"
import { arcadeGamesMap } from "../utils/constants/arcade-games-map"

interface GameState {
	score: number
	gameOver: boolean
	gameStarted: boolean
	highScore: number
}

class ArcadeClass {
	public currentGame: ArcadeGameType | null = null
	private gameStates: Map<ArcadeGameType, GameState> = new Map()

	constructor() {
		makeAutoObservable(this)
		this.initializeGameStates()
	}

	private initializeGameStates(): void {
		// Initialize all game states with high scores from localStorage
		(Object.keys(arcadeGamesMap) as ArcadeGameType[]).forEach((gameType): void => {
			const metadata = arcadeGamesMap[gameType]
			const highScore = typeof window !== "undefined"
				? parseInt(localStorage.getItem(metadata.localStorageKey) || "0", 10)
				: 0

			this.gameStates.set(gameType, {
				score: 0,
				gameOver: false,
				gameStarted: false,
				highScore
			})
		})
	}

	public setCurrentGame = action((gameType: ArcadeGameType | null): void => {
		this.currentGame = gameType
	})

	public getCurrentGameMetadata(): ArcadeGameMetadata | null {
		if (!this.currentGame) return null
		return arcadeGamesMap[this.currentGame]
	}

	public getGameState(gameType: ArcadeGameType): GameState {
		return this.gameStates.get(gameType) || {
			score: 0,
			gameOver: false,
			gameStarted: false,
			highScore: 0
		}
	}

	public getCurrentGameState(): GameState | null {
		if (!this.currentGame) return null
		return this.getGameState(this.currentGame)
	}

	public setScore = action((gameType: ArcadeGameType, score: number): void => {
		const state = this.gameStates.get(gameType)
		if (state) {
			state.score = score
		}
	})

	public setGameOver = action((gameType: ArcadeGameType, gameOver: boolean): void => {
		const state = this.gameStates.get(gameType)
		if (state) {
			state.gameOver = gameOver
		}
	})

	public setGameStarted = action((gameType: ArcadeGameType, gameStarted: boolean): void => {
		const state = this.gameStates.get(gameType)
		if (state) {
			state.gameStarted = gameStarted
		}
	})

	public startGame = action((gameType: ArcadeGameType): void => {
		const state = this.gameStates.get(gameType)
		if (state) {
			state.gameStarted = true
			state.gameOver = false
		}
	})

	public resetGame = action((gameType: ArcadeGameType): void => {
		const state = this.gameStates.get(gameType)
		if (state) {
			const newHighScore = Math.max(state.score, state.highScore)
			state.score = 0
			state.gameOver = false
			state.gameStarted = false

			// Update high score if needed
			if (newHighScore > state.highScore) {
				state.highScore = newHighScore
				if (typeof window !== "undefined") {
					const metadata = arcadeGamesMap[gameType]
					localStorage.setItem(metadata.localStorageKey, newHighScore.toString())
				}
			}
		}
	})

	public resetAndStartGame = action((gameType: ArcadeGameType): void => {
		this.resetGame(gameType)
		this.startGame(gameType)
	})

	public logout(): void {
		this.currentGame = null
		// Reset all game states but keep high scores
		this.gameStates.forEach((state): void => {
			state.score = 0
			state.gameOver = false
			state.gameStarted = false
		})
	}
}

const arcadeClass = new ArcadeClass()

export default arcadeClass


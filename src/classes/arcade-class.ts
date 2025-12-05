"use client"

import { action, makeAutoObservable } from "mobx"
import { arcadeGamesMap } from "../utils/constants/arcade-games-map"
import { ArcadeGameType, ArcadeScore } from "@lever-labs/common-ts/types/arcade"
import personalInfoClass from "./personal-info-class"
import { ArcadeScoreUpdateAllPeers } from "@lever-labs/common-ts/types/socket"
import addArcadeScore from "../utils/arcade/add-arcade-score"
import { isEmpty } from "lodash-es"

interface GameState {
	score: number
	gameOver: boolean
	gameStarted: boolean
}

interface LocalArcadeScore {
	score: number
	username: string
	timestamp: Date
	isOwn: boolean
}

class ArcadeClass {
	public currentGame: ArcadeGameType | null = null
	private gameStates: Map<ArcadeGameType, GameState> = new Map()
	// Store high scores per game type: Map<gameType, Array<ArcadeScore>>
	public highScores: Map<ArcadeGameType, LocalArcadeScore[]> = new Map()
	public isRetrievingAllArcadeScores = false
	public hasRetrievedAllArcadeScores = false

	constructor() {
		makeAutoObservable(this)
		this.initializeGameStates()
		this.initializeHighScores()
	}

	private initializeGameStates(): void {
		// Initialize all game states
		(Object.keys(arcadeGamesMap) as ArcadeGameType[]).forEach((gameType): void => {
			this.gameStates.set(gameType, {
				score: 0,
				gameOver: false,
				gameStarted: false
			})
		})
	}

	private initializeHighScores(): void {
		// Initialize empty arrays for each game type
		(Object.keys(arcadeGamesMap) as ArcadeGameType[]).forEach((gameType): void => {
			this.highScores.set(gameType, [])
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
			gameStarted: false
		}
	}

	// Get personal best high score for a game (derived from own scores)
	public getPersonalBest(gameType: ArcadeGameType): number {
		const ownScores = this.getOwnHighScores(gameType)
		if (isEmpty(ownScores)) return 0
		return ownScores[0].score || 0
	}

	public getCurrentGameState(): GameState | null {
		if (!this.currentGame) return null
		return this.getGameState(this.currentGame)
	}

	public setScore = action((gameType: ArcadeGameType, score: number): void => {
		const state = this.gameStates.get(gameType)
		if (!state) return
		state.score = score
	})

	public setGameOver = action((gameType: ArcadeGameType): void => {
		const state = this.gameStates.get(gameType)
		if (!state) return

		// If game is ending (gameOver is being set to true), send score to API and update local high scores
		if (!state.gameOver && state.score > 0) {
			void addArcadeScore(gameType, state.score)
			this.addOwnHighScore(gameType, state.score)
		}

		state.gameOver = true
	})

	public startGame = action((gameType: ArcadeGameType): void => {
		const state = this.gameStates.get(gameType)
		if (!state) return
		state.gameStarted = true
		state.gameOver = false
	})

	private resetGame = action((gameType: ArcadeGameType): void => {
		const state = this.gameStates.get(gameType)
		if (!state) return

		// Reset game state
		state.score = 0
		state.gameOver = false
		state.gameStarted = false
	})

	public resetAndStartGame = action((gameType: ArcadeGameType): void => {
		this.resetGame(gameType)
		this.startGame(gameType)
	})

	// Add a high score from the current user (local)
	public addOwnHighScore = action((gameType: ArcadeGameType, score: number): void => {
		const username = personalInfoClass.username || ""
		const scores = this.highScores.get(gameType) || []

		// Check if this score already exists (avoid duplicates)
		const existingScore = scores.find((s): boolean =>
			s.score === score && s.username === username && s.isOwn
		)

		if (existingScore) return
		scores.push({
			score,
			username,
			timestamp: new Date(),
			isOwn: true
		})
		// Sort descending by score
		scores.sort((a, b): number => b.score - a.score)
	})

	// Add a high score from websocket (other users)
	public addPeerHighScore = action((payload: ArcadeScoreUpdateAllPeers): void => {
		const scores = this.highScores.get(payload.arcadeGameName) || []

		// Find existing score for this user
		const existingScoreIndex = scores.findIndex((s): boolean =>
			s.username === payload.username && !s.isOwn
		)

		if (existingScoreIndex !== -1) {
			// Replace if new score is greater
			const existingScore = scores[existingScoreIndex]
			if (payload.score > existingScore.score) {
				scores[existingScoreIndex] = {
					score: payload.score,
					username: payload.username,
					timestamp: new Date(),
					isOwn: false
				}
				// Sort descending by score
				scores.sort((a, b): number => b.score - a.score)
			}
		} else {
			// Add new score if user doesn't have one yet
			scores.push({
				score: payload.score,
				username: payload.username,
				timestamp: new Date(),
				isOwn: false
			})
			// Sort descending by score
			scores.sort((a, b): number => b.score - a.score)
		}
	})

	// Get sorted high scores for a specific game
	public getSortedHighScores(gameType: ArcadeGameType): LocalArcadeScore[] {
		const scores = this.highScores.get(gameType) || []
		return [...scores].sort((a, b): number => {
			// Sort by score descending, then by timestamp ascending (newer scores first if tied)
			if (b.score !== a.score) {
				return b.score - a.score
			}
			return a.timestamp.getTime() - b.timestamp.getTime()
		})
	}

	// Get only own scores for a specific game
	public getOwnHighScores(gameType: ArcadeGameType): LocalArcadeScore[] {
		return this.getSortedHighScores(gameType).filter((score): boolean => score.isOwn)
	}

	// Get only peer scores for a specific game
	public getPeerHighScores(gameType: ArcadeGameType): LocalArcadeScore[] {
		return this.getSortedHighScores(gameType).filter((score): boolean => !score.isOwn)
	}

	public setIsRetrievingAllArcadeScores = action((isRetrieving: boolean): void => {
		this.isRetrievingAllArcadeScores = isRetrieving
	})

	public setHasRetrievedAllArcadeScores = action((hasRetrieved: boolean): void => {
		this.hasRetrievedAllArcadeScores = hasRetrieved
	})

	public setArcadeScores = action((apiScores: ArcadeScore[]): void => {
		// Clear existing scores
		this.highScores.forEach((scores): void => {
			scores.length = 0
		})

		// Group scores by game type and convert to internal format
		apiScores.forEach((apiScore): void => {
			const scores = this.highScores.get(apiScore.arcadeGameName) || []
			scores.push({
				score: apiScore.score,
				username: apiScore.username,
				timestamp: new Date(apiScore.createdAt),
				isOwn: apiScore.isMyScore
			})
			// Sort descending by score
			scores.sort((a, b): number => b.score - a.score)
		})

		this.setHasRetrievedAllArcadeScores(true)
		this.setIsRetrievingAllArcadeScores(false)
	})

	public logout(): void {
		this.currentGame = null
		// Reset all game states but keep high scores
		this.gameStates.forEach((state): void => {
			state.score = 0
			state.gameOver = false
			state.gameStarted = false
		})
		// Clear all high scores on logout
		this.highScores.forEach((scores): void => {
			scores.length = 0
		})
		this.hasRetrievedAllArcadeScores = false
	}
}

const arcadeClass = new ArcadeClass()

export default arcadeClass


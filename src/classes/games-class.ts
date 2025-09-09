import { action, makeAutoObservable } from "mobx"
import getPersonalInfoClass from "./personal-info-class"

interface DinoScore {
	score: number
	timestamp: Date
	username: string
}

class GamesClass {
	public dinoScore: DinoScore[] = []

	constructor() {
		makeAutoObservable(this)
	}

	public addDinoScore = action((score: number, username?: string): void => {
		if (!username) {
			username = getPersonalInfoClass().username || ""
		}
		this.dinoScore.push({
			score,
			timestamp: new Date(),
			username
		})
	})

	public get sortedDinoScores(): DinoScore[] {
		return [...this.dinoScore].sort((a, b): number => b.score - a.score)
	}

	public get highScore(): number {
		if (this.dinoScore.length === 0) return 0
		return Math.max(...this.dinoScore.map((score): number => score.score))
	}

	public logout(): void {
		this.dinoScore = []
	}
}

let gamesClassInstance: GamesClass | null = null

export const getGamesClass = (): GamesClass => {
	if (!gamesClassInstance) {
		gamesClassInstance = new GamesClass()
	}
	return gamesClassInstance
}

export default getGamesClass

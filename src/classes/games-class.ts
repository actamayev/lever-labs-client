import { action, makeAutoObservable } from "mobx"

interface DinoScore {
	score: number
	timestamp: Date
}

class GamesClass {
	public dinoScore: DinoScore[] = []

	constructor() {
		makeAutoObservable(this)
	}

	public addDinoScore = action(({ score }: { score: number }): void => {
		this.dinoScore.push({
			score,
			timestamp: new Date()
		})
	})

	public get sortedDinoScores(): DinoScore[] {
		return [...this.dinoScore].sort((a, b) => b.score - a.score)
	}

	public get highScore(): number {
		if (this.dinoScore.length === 0) return 0
		return Math.max(...this.dinoScore.map(score => score.score))
	}

	public logout(): void {
		this.dinoScore = []
	}
}

const gamesClass = new GamesClass()

export default gamesClass

class SoundManager {
	private correctSound: HTMLAudioElement | null = null
	private wrongSound: HTMLAudioElement | null = null
	private initialized = false

	public initialize(): void {
		if (this.initialized) return

		this.correctSound = new Audio("/sounds/correct.mp3")
		this.wrongSound = new Audio("/sounds/wrong.mp3")

		// Preload the audio
		this.correctSound.preload = "auto"
		this.wrongSound.preload = "auto"

		this.initialized = true
	}

	public playCorrect(): void {
		this.correctSound?.play()
	}

	public playWrong(): void {
		this.wrongSound?.play()
	}

	public cleanup(): void {
		this.correctSound = null
		this.wrongSound = null
		this.initialized = false
	}
}

export const soundManager = new SoundManager()

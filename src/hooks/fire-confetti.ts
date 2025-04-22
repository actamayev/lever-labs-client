import confetti, { Shape } from "canvas-confetti"

export default function fireConfetti(
	event: React.MouseEvent<HTMLButtonElement>,
	confettiOptions?: {
		origin?: {
			x?: number;
			y?: number;
		};
		particleCount?: number;
		spread?: number;
		colors?: string[];
		startVelocity?: number;
		scalar?: number;
		ticks?: number;
		shapes?: Shape[];
		zIndex?: number;
	}
): void {
	try {
		const rect = event.currentTarget.getBoundingClientRect()
		const x = rect.left + rect.width / 2
		const y = rect.top + rect.height / 2

		confetti({
			// Default options
			particleCount: 100,
			spread: 70,
			origin: {
				x: x / window.innerWidth,
				y: y / window.innerHeight,
			},
			// Override with custom options if provided
			...confettiOptions
		})
	} catch (error) {
		console.error("Confetti error:", error)
	}
}

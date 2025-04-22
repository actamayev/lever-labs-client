import confetti from "canvas-confetti"

// eslint-disable-next-line complexity
export default function fireConfetti(
	event: React.MouseEvent<HTMLButtonElement>,
	confettiOptions?: confetti.Options
): void {
	try {
		const rect = event.currentTarget.getBoundingClientRect()
		const x = rect.left + rect.width / 2
		const y = rect.top + rect.height / 2

		// Calculate origin
		const origin = {
			x: x / window.innerWidth,
			y: y / window.innerHeight,
		}

		// Base configuration
		const count = confettiOptions?.particleCount || 200
		const defaults = {
			origin: confettiOptions?.origin || origin,
			colors: confettiOptions?.colors,
			shapes: confettiOptions?.shapes,
			zIndex: confettiOptions?.zIndex,
		}

		// Fire multiple confetti bursts with different settings
		// Wave 1: Quick burst with medium spread
		confetti({
			...defaults,
			particleCount: Math.floor(count * 0.25),
			spread: confettiOptions?.spread || 26,
			startVelocity: confettiOptions?.startVelocity || 55,
		})

		// Wave 2: Medium spread
		confetti({
			...defaults,
			particleCount: Math.floor(count * 0.2),
			spread: confettiOptions?.spread ? confettiOptions.spread * 0.6 : 60,
		})

		// Wave 3: Wide spread with slower decay
		confetti({
			...defaults,
			particleCount: Math.floor(count * 0.35),
			spread: confettiOptions?.spread ? confettiOptions.spread * 1 : 100,
			decay: 0.91,
			scalar: confettiOptions?.scalar || 0.8,
		})

		// Wave 4: Very wide spread, slower velocity
		confetti({
			...defaults,
			particleCount: Math.floor(count * 0.1),
			spread: confettiOptions?.spread ? confettiOptions.spread * 1.2 : 120,
			startVelocity: confettiOptions?.startVelocity ? confettiOptions.startVelocity * 0.5 : 25,
			decay: 0.92,
			scalar: confettiOptions?.scalar ? confettiOptions.scalar * 1.5 : 1.2,
		})

		// Wave 5: Very wide spread, medium velocity
		confetti({
			...defaults,
			particleCount: Math.floor(count * 0.1),
			spread: confettiOptions?.spread ? confettiOptions.spread * 1.2 : 120,
			startVelocity: confettiOptions?.startVelocity ? confettiOptions.startVelocity * 0.8 : 45,
		})

	} catch (error) {
		console.error("Confetti error:", error)
	}
}

"use client"
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useCallback, useEffect, useRef } from "react"
import { observer } from "mobx-react"
import sensorDataClass from "../../classes/sensor-data-class"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import { CareerType, FlappyBirdArcadeTriggerType } from "@lever-labs/common-ts/protocol"
import careerQuestTrigger from "../../utils/career-quest/career-quest-trigger"
import ArcadeGameLayout from "./arcade-game-layout"
import { ARCADE_CANVAS_WIDTH, ARCADE_CANVAS_HEIGHT } from "../../utils/constants/constants"
import arcadeClass from "../../classes/arcade-class"

interface Pipe {
	x: number
	topHeight: number
	bottomY: number
	width: number
	passed: boolean
}

interface Particle {
	x: number
	y: number
	vx: number
	vy: number
	life: number
	maxLife: number
	color: string
	size: number
}

const CANVAS_WIDTH = ARCADE_CANVAS_WIDTH
const CANVAS_HEIGHT = ARCADE_CANVAS_HEIGHT
const BIRD_SIZE = 30
const BIRD_X = 150
const PIPE_WIDTH = 80
const PIPE_GAP = 240 // Gap size - bird size 30, balanced to be challenging but passable
const INITIAL_PIPE_SPEED = 2 // Slower initial speed
const MAX_PIPE_SPEED = 4 // Maximum speed after progression
const INITIAL_PIPE_SPACING = 600 // More time between pipes at start
const MIN_PIPE_SPACING = 400 // Minimum spacing at higher speeds
const MIN_DISTANCE = 0 // Minimum distance sensor reading - bird at bottom
const MAX_DISTANCE = 10 // Maximum distance sensor reading - bird at top
const ERROR_VALUE = -1 // Error value to ignore

// eslint-disable-next-line max-lines-per-function
function FlappyBirdGame(): React.ReactNode {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const gameStateRef = useRef({
		birdY: CANVAS_HEIGHT / 2,
		prevBirdY: CANVAS_HEIGHT / 2,
		pipes: [] as Pipe[],
		particles: [] as Particle[],
		lastPipeTime: 0,
		screenShake: 0,
		currentPipeSpeed: INITIAL_PIPE_SPEED,
		currentPipeSpacing: INITIAL_PIPE_SPACING
	})
	const animationRef = useRef<number>(0)
	const navigate = useTypedNavigate()
	const gameType = "flappy" as const

	// Initialize game on mount
	useEffect((): (() => void) => {
		arcadeClass.setCurrentGame(gameType)
		return (): void => {
			arcadeClass.setCurrentGame(null)
		}
	}, [])

	const createParticles = useCallback((x: number, y: number, color: string, count: number = 8): void => {
		for (let i = 0; i < count; i++) {
			const angle = (Math.PI * 2 * i) / count
			const speed = 2 + Math.random() * 3
			gameStateRef.current.particles.push({
				x,
				y,
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed,
				life: 30,
				maxLife: 30,
				color,
				size: 3 + Math.random() * 3
			})
		}
	}, [])

	const spawnPipe = useCallback((): void => {
		const minTopHeight = 50
		const maxTopHeight = CANVAS_HEIGHT - PIPE_GAP - minTopHeight
		// Randomly position pipes - ensure pipes can block middle area
		// This prevents staying in the middle from being always safe
		const topHeight = minTopHeight + Math.random() * (maxTopHeight - minTopHeight)
		const bottomY = topHeight + PIPE_GAP

		// Ensure the gap doesn't always include the middle (Y=300)
		// If the gap would make middle always safe, adjust it
		const middleY = CANVAS_HEIGHT / 2
		const gapCenter = topHeight + PIPE_GAP / 2
		const distanceFromMiddle = Math.abs(gapCenter - middleY)

		// If gap is too centered, shift it slightly to make middle challenging
		if (distanceFromMiddle < 50) {
			const shift = (50 - distanceFromMiddle) * (Math.random() > 0.5 ? 1 : -1)
			const newTopHeight = Math.max(minTopHeight, Math.min(maxTopHeight, topHeight + shift))
			const newBottomY = newTopHeight + PIPE_GAP

			gameStateRef.current.pipes.push({
				x: CANVAS_WIDTH,
				topHeight: newTopHeight,
				bottomY: newBottomY,
				width: PIPE_WIDTH,
				passed: false
			})
		} else {
			gameStateRef.current.pipes.push({
				x: CANVAS_WIDTH,
				topHeight,
				bottomY,
				width: PIPE_WIDTH,
				passed: false
			})
		}
	}, [])

	const checkCollision = (birdX: number, birdY: number, birdSize: number, pipe: Pipe): boolean => {
		// Check collision with top pipe
		if (
			birdX + birdSize / 2 > pipe.x &&
			birdX - birdSize / 2 < pipe.x + pipe.width &&
			birdY - birdSize / 2 < pipe.topHeight
		) {
			return true
		}

		// Check collision with bottom pipe
		if (
			birdX + birdSize / 2 > pipe.x &&
			birdX - birdSize / 2 < pipe.x + pipe.width &&
			birdY + birdSize / 2 > pipe.bottomY
		) {
			return true
		}

		return false
	}


	// eslint-disable-next-line complexity
	const updateGame = useCallback((timestamp: number): void => {
		const state = gameStateRef.current
		const gameState = arcadeClass.getGameState(gameType)
		if (gameState.gameOver || !gameState.gameStarted) return

		// Gradually increase difficulty based on score
		// Speed increases every 5 points, spacing decreases every 10 points
		const speedIncrease = Math.floor(gameState.score / 5)
		const spacingDecrease = Math.floor(gameState.score / 10)
		state.currentPipeSpeed = Math.min(INITIAL_PIPE_SPEED + speedIncrease * 0.2, MAX_PIPE_SPEED)
		state.currentPipeSpacing = Math.max(INITIAL_PIPE_SPACING - spacingDecrease * 20, MIN_PIPE_SPACING)

		// Spawn pipes
		if (timestamp - state.lastPipeTime > state.currentPipeSpacing) {
			spawnPipe()
			state.lastPipeTime = timestamp
		}

		// Update bird position based on distance sensor - directly tracks sensor position
		const distanceData = sensorDataClass.frontTofDistance
		if (distanceData.length > 0) {
			// Get the latest distance value, skipping error values (-1)
			let latestDistance = -1
			for (let i = distanceData.length - 1; i >= 0; i--) {
				if (distanceData[i] !== ERROR_VALUE) {
					latestDistance = distanceData[i]
					break
				}
			}

			// Only update if we have a valid reading (not -1)
			if (latestDistance !== ERROR_VALUE) {
				// Map distance: 0 = bottom, 10 or more = top
				// Clamp distance to max value (10 or more all map to top)
				const clampedDistance = Math.min(latestDistance, MAX_DISTANCE)
				// Normalize: 0 = 0, 10+ = 1
				const normalizedDistance = Math.max(0, Math.min(1, (clampedDistance - MIN_DISTANCE) / (MAX_DISTANCE - MIN_DISTANCE)))
				// Higher distance = higher bird (lower Y), lower distance = lower bird (higher Y)
				state.prevBirdY = state.birdY
				state.birdY = (1 - normalizedDistance) * (CANVAS_HEIGHT - BIRD_SIZE) + BIRD_SIZE / 2
			}
		}

		// Keep bird in bounds
		if (state.birdY - BIRD_SIZE / 2 < 0) {
			state.birdY = BIRD_SIZE / 2
			arcadeClass.setGameOver(gameType, true)
			createParticles(BIRD_X, state.birdY, "#ff0000", 20)
			state.screenShake = 20
		}
		if (state.birdY + BIRD_SIZE / 2 > CANVAS_HEIGHT) {
			state.birdY = CANVAS_HEIGHT - BIRD_SIZE / 2
			arcadeClass.setGameOver(gameType, true)
			createParticles(BIRD_X, state.birdY, "#ff0000", 20)
			state.screenShake = 20
		}

		// Update pipes
		state.pipes = state.pipes.filter((pipe): boolean => {
			pipe.x -= state.currentPipeSpeed

			// Check collision
			if (checkCollision(BIRD_X, state.birdY, BIRD_SIZE, pipe)) {
				arcadeClass.setGameOver(gameType, true)
				createParticles(BIRD_X, state.birdY, "#ff0000", 20)
				state.screenShake = 20
				return false
			}

			// Score when passing pipe
			if (!pipe.passed && pipe.x + pipe.width < BIRD_X) {
				pipe.passed = true
				const currentScore = arcadeClass.getGameState(gameType).score
				arcadeClass.setScore(gameType, currentScore + 1)
				createParticles(pipe.x + pipe.width / 2, pipe.topHeight + PIPE_GAP / 2, "#00ff00", 10)
			}

			// Remove pipes that are off screen
			return pipe.x + pipe.width > -50
		})

		// Update particles
		state.particles = state.particles.filter((p): boolean => {
			p.x += p.vx
			p.y += p.vy
			p.life--
			p.vy += 0.1 // Gravity
			return p.life > 0
		})

		// Decay screen shake
		if (state.screenShake > 0) {
			state.screenShake *= 0.85
			if (state.screenShake < 0.1) state.screenShake = 0
		}
	}, [spawnPipe, createParticles])


	const draw = useCallback((): void => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		const state = gameStateRef.current

		// Apply screen shake
		ctx.save()
		if (state.screenShake > 0) {
			ctx.translate(
				(Math.random() - 0.5) * state.screenShake,
				(Math.random() - 0.5) * state.screenShake
			)
		}

		// Clear canvas with sky gradient
		const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT)
		gradient.addColorStop(0, "#87CEEB")
		gradient.addColorStop(1, "#E0F6FF")
		ctx.fillStyle = gradient
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

		// Draw clouds
		ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
		const time = Date.now() * 0.0005
		for (let i = 0; i < 5; i++) {
			const x = ((i * 200) + time * 20) % (CANVAS_WIDTH + 100) - 50
			const y = 50 + (i * 30) % 150
			ctx.beginPath()
			ctx.arc(x, y, 30, 0, Math.PI * 2)
			ctx.arc(x + 25, y, 35, 0, Math.PI * 2)
			ctx.arc(x + 50, y, 30, 0, Math.PI * 2)
			ctx.fill()
		}

		// Draw pipes
		state.pipes.forEach((pipe): void => {
			// Top pipe
			ctx.fillStyle = "#228B22"
			ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight)
			ctx.fillStyle = "#32CD32"
			ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, pipe.width + 10, 20)

			// Bottom pipe
			ctx.fillStyle = "#228B22"
			ctx.fillRect(pipe.x, pipe.bottomY, pipe.width, CANVAS_HEIGHT - pipe.bottomY)
			ctx.fillStyle = "#32CD32"
			ctx.fillRect(pipe.x - 5, pipe.bottomY, pipe.width + 10, 20)
		})

		// Draw bird with animation
		const birdY = state.birdY
		// Calculate rotation based on position change (moving up or down)
		const yChange = state.birdY - state.prevBirdY
		const birdRotation = Math.min(Math.PI / 6, Math.max(-Math.PI / 6, yChange * 0.05))

		ctx.save()
		ctx.translate(BIRD_X, birdY)
		ctx.rotate(birdRotation)

		// Bird body with glow
		ctx.shadowBlur = 10
		ctx.shadowColor = "#FFD700"
		ctx.fillStyle = "#FFD700"
		ctx.beginPath()
		ctx.ellipse(0, 0, BIRD_SIZE / 2, BIRD_SIZE / 2, 0, 0, Math.PI * 2)
		ctx.fill()

		// Bird wing
		ctx.shadowBlur = 0
		ctx.fillStyle = "#FFA500"
		ctx.beginPath()
		const wingFlap = Math.sin(Date.now() * 0.01) * 0.3
		ctx.ellipse(-BIRD_SIZE / 4, wingFlap * 5, BIRD_SIZE / 3, BIRD_SIZE / 4, 0, 0, Math.PI * 2)
		ctx.fill()

		// Bird eye
		ctx.fillStyle = "#000000"
		ctx.beginPath()
		ctx.arc(BIRD_SIZE / 6, -BIRD_SIZE / 6, 3, 0, Math.PI * 2)
		ctx.fill()

		ctx.restore()

		// Draw particles
		state.particles.forEach((p): void => {
			const alpha = p.life / p.maxLife
			ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, "0")
			ctx.beginPath()
			ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2)
			ctx.fill()
		})

		ctx.restore()

		// Draw UI
		const gameState = arcadeClass.getGameState(gameType)
		ctx.fillStyle = "#000000"
		ctx.font = "bold 24px Arial"
		ctx.fillText(`Score: ${gameState.score}`, 20, 40)

		// Draw high score
		ctx.fillStyle = "rgba(0, 0, 0, 0.6)"
		ctx.font = "16px Arial"
		ctx.fillText(`High Score: ${gameState.highScore}`, CANVAS_WIDTH - 200, 40)

		// Draw controls hint
		ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
		ctx.font = "14px Arial"
		const controlsText = "Use distance sensor to control bird height"
		ctx.fillText(controlsText, CANVAS_WIDTH / 2 - 150, CANVAS_HEIGHT - 20)
	}, [])

	const gameLoop = useCallback((timestamp: number): void => {
		updateGame(timestamp)
		draw()

		const gameState = arcadeClass.getGameState(gameType)
		if (!gameState.gameOver && gameState.gameStarted) {
			animationRef.current = requestAnimationFrame(gameLoop)
		}
	}, [updateGame, draw, gameType])

	const startGame = useCallback((): void => {
		arcadeClass.startGame(gameType)
		animationRef.current = requestAnimationFrame(gameLoop)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameType])

	const resetGame = useCallback((): void => {
		gameStateRef.current = {
			birdY: CANVAS_HEIGHT / 2,
			prevBirdY: CANVAS_HEIGHT / 2,
			pipes: [],
			particles: [],
			lastPipeTime: 0,
			screenShake: 0,
			currentPipeSpeed: INITIAL_PIPE_SPEED,
			currentPipeSpacing: INITIAL_PIPE_SPACING
		}

		// Reset and start game immediately
		arcadeClass.resetAndStartGame(gameType)
		startGame()
	}, [startGame, gameType])

	useEffect((): (() => void) => {
		const gameState = arcadeClass.getGameState(gameType)
		if (gameState.gameStarted && !gameState.gameOver) {
			animationRef.current = requestAnimationFrame(gameLoop)
		}

		return (): void => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}, [gameLoop, gameType])

	const handleBack = useCallback((): void => {
		void careerQuestTrigger(CareerType.FLAPPY_BIRD_ARCADE, FlappyBirdArcadeTriggerType.EXIT_FLAPPY_BIRD_ARCADE)
		navigate("/arcade")
	}, [navigate])

	return (
		<ArcadeGameLayout
			canvas={
				<canvas
					ref={canvasRef}
					width={CANVAS_WIDTH}
					height={CANVAS_HEIGHT}
					className="border-2 border-[#4a5568] rounded-lg shadow-lg"
				/>
			}
			onBack={handleBack}
			onStart={startGame}
			onPlayAgain={resetGame}
		/>
	)
}

export default observer(FlappyBirdGame)


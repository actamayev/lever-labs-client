"use client"
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useCallback, useEffect, useRef } from "react"
import { observer } from "mobx-react"
import sensorDataClass from "../../classes/sensor-data-class"
import ArcadeGameLayout from "./arcade-game-layout"
import { ARCADE_CANVAS_WIDTH, ARCADE_CANVAS_HEIGHT } from "../../utils/constants/constants"
import arcadeClass from "../../classes/arcade-class"
import { ArcadeGameType } from "@lever-labs/common-ts/types/arcade"
import careerQuestTrigger from "../../utils/career-quest/career-quest-trigger"
import { CareerType, CityDrivingArcadeTriggerType } from "@lever-labs/common-ts/protocol"

interface Obstacle {
	x: number
	y: number
	width: number
	height: number
	type: "car" | "cone" | "barrier"
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
const CAR_WIDTH = 50
const CAR_HEIGHT = 80
const CAR_Y = CANVAS_HEIGHT - 100 // Fixed vertical position
const ROAD_WIDTH = 400
const ROAD_CENTER_X = CANVAS_WIDTH / 2
const INITIAL_SPEED = 2
const MAX_SPEED = 6
const MIN_SPEED = 1

// eslint-disable-next-line max-lines-per-function
function CityDriverGame(): React.ReactNode {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const gameStateRef = useRef({
		carX: ROAD_CENTER_X,
		speed: INITIAL_SPEED,
		obstacles: [] as Obstacle[],
		particles: [] as Particle[],
		lastObstacleTime: 0,
		screenShake: 0,
		lastLeftEncoder: 0,
		lastRightEncoder: 0,
		obstacleSpacing: 400,
		lastEnterTriggerTime: 0
	})
	const animationRef = useRef<number>(0)
	const gameType: ArcadeGameType = "cityDriver"

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

	const spawnObstacle = useCallback((): void => {
		const state = gameStateRef.current
		const types: Array<"car" | "cone" | "barrier"> = ["car", "cone", "barrier"]
		const type = types[Math.floor(Math.random() * types.length)]

		let width = 40
		let height = 60
		if (type === "cone") {
			width = 30
			height = 40
		} else if (type === "barrier") {
			width = 60
			height = 50
		}

		// Spawn obstacle randomly across the entire road width
		const roadLeft = ROAD_CENTER_X - ROAD_WIDTH / 2
		const roadRight = ROAD_CENTER_X + ROAD_WIDTH / 2
		// Random X position within road bounds, ensuring obstacle doesn't go outside road
		const minX = roadLeft
		const maxX = roadRight - width
		const randomX = minX + Math.random() * (maxX - minX)

		state.obstacles.push({
			x: randomX,
			y: -height,
			width,
			height,
			type,
			passed: false
		})
	}, [])

	// eslint-disable-next-line max-params
	const checkCollision = (carX: number, carY: number, carWidth: number, carHeight: number, obstacle: Obstacle): boolean => {
		return (
			carX < obstacle.x + obstacle.width &&
			carX + carWidth > obstacle.x &&
			carY < obstacle.y + obstacle.height &&
			carY + carHeight > obstacle.y
		)
	}

	const updateGame = useCallback((timestamp: number): void => {
		const state = gameStateRef.current
		const gameState = arcadeClass.getGameState(gameType)
		if (gameState.gameOver || !gameState.gameStarted) return

		// Send ENTER trigger every 10 seconds while in game
		const currentTime = Date.now()
		if (currentTime - state.lastEnterTriggerTime > 10000) {
			void careerQuestTrigger(CareerType.CITY_DRIVING_ARCADE, CityDrivingArcadeTriggerType.ENTER_CITY_DRIVING_ARCADE)
			state.lastEnterTriggerTime = currentTime
		}

		// Update car position based on left encoder (delta-based)
		const leftEncoderData = sensorDataClass.leftWheelEncoderPosition
		if (leftEncoderData.length > 0) {
			const latestLeftEncoder = leftEncoderData[leftEncoderData.length - 1]
			// Calculate delta from last reading
			const delta = latestLeftEncoder - state.lastLeftEncoder
			// Update car X position based on delta
			// Negative delta moves left, positive moves right
			state.carX += delta * 0.5 // Scale factor for sensitivity (increased for more responsive steering)
			state.lastLeftEncoder = latestLeftEncoder

			// Keep car within road bounds
			const roadLeft = ROAD_CENTER_X - ROAD_WIDTH / 2
			const roadRight = ROAD_CENTER_X + ROAD_WIDTH / 2
			state.carX = Math.max(roadLeft, Math.min(roadRight - CAR_WIDTH, state.carX))
		}

		// Update speed based on right encoder (throttle)
		const rightEncoderData = sensorDataClass.rightWheelEncoderPosition
		if (rightEncoderData.length > 0) {
			const latestRightEncoder = rightEncoderData[rightEncoderData.length - 1]
			// Calculate delta from last reading
			const delta = latestRightEncoder - state.lastRightEncoder
			// Positive delta increases speed, negative decreases speed
			state.speed += delta * 0.01 // Scale factor for throttle sensitivity
			state.lastRightEncoder = latestRightEncoder

			// Clamp speed
			state.speed = Math.max(MIN_SPEED, Math.min(MAX_SPEED, state.speed))
		}

		// Adjust obstacle spacing based on speed (faster = more obstacles)
		state.obstacleSpacing = Math.max(200, 500 - state.speed * 30)

		// Spawn obstacles
		if (timestamp - state.lastObstacleTime > state.obstacleSpacing) {
			spawnObstacle()
			state.lastObstacleTime = timestamp
		}

		// Update obstacles
		state.obstacles = state.obstacles.filter((obstacle): boolean => {
			obstacle.y += state.speed

			// Check collision
			if (checkCollision(state.carX, CAR_Y, CAR_WIDTH, CAR_HEIGHT, obstacle)) {
				arcadeClass.setGameOver(gameType)
				createParticles(state.carX + CAR_WIDTH / 2, CAR_Y + CAR_HEIGHT / 2, "#ff0000", 30)
				state.screenShake = 20
				return false
			}

			// Score when passing obstacle
			if (!obstacle.passed && obstacle.y > CAR_Y + CAR_HEIGHT) {
				obstacle.passed = true
				const currentScore = arcadeClass.getGameState(gameType).score
				arcadeClass.setScore(gameType, currentScore + 1)
				createParticles(obstacle.x + obstacle.width / 2, obstacle.y + obstacle.height / 2, "#00ff00", 10)
			}

			// Remove obstacles that are off screen
			return obstacle.y < CANVAS_HEIGHT + obstacle.height
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
	}, [spawnObstacle, createParticles])

	// eslint-disable-next-line max-lines-per-function
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
		const skyGradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT / 2)
		skyGradient.addColorStop(0, "#87CEEB")
		skyGradient.addColorStop(1, "#E0F6FF")
		ctx.fillStyle = skyGradient
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT / 2)

		// Draw road
		const roadGradient = ctx.createLinearGradient(0, CANVAS_HEIGHT / 2, 0, CANVAS_HEIGHT)
		roadGradient.addColorStop(0, "#4a4a4a")
		roadGradient.addColorStop(1, "#2a2a2a")
		ctx.fillStyle = roadGradient
		ctx.fillRect(ROAD_CENTER_X - ROAD_WIDTH / 2, CANVAS_HEIGHT / 2, ROAD_WIDTH, CANVAS_HEIGHT / 2)

		// Draw road markings (moving based on speed)
		ctx.strokeStyle = "#ffff00"
		ctx.lineWidth = 4
		const markingSpacing = 50
		const currentGameState = arcadeClass.getGameState(gameType)
		const markingOffset = (currentGameState.score * markingSpacing) % markingSpacing
		for (let y = CANVAS_HEIGHT / 2 + markingOffset; y < CANVAS_HEIGHT; y += markingSpacing) {
			ctx.beginPath()
			ctx.moveTo(ROAD_CENTER_X - 10, y)
			ctx.lineTo(ROAD_CENTER_X + 10, y)
			ctx.stroke()
		}

		// Draw road edges
		ctx.strokeStyle = "#ffffff"
		ctx.lineWidth = 4
		ctx.beginPath()
		ctx.moveTo(ROAD_CENTER_X - ROAD_WIDTH / 2, CANVAS_HEIGHT / 2)
		ctx.lineTo(ROAD_CENTER_X - ROAD_WIDTH / 2, CANVAS_HEIGHT)
		ctx.stroke()
		ctx.beginPath()
		ctx.moveTo(ROAD_CENTER_X + ROAD_WIDTH / 2, CANVAS_HEIGHT / 2)
		ctx.lineTo(ROAD_CENTER_X + ROAD_WIDTH / 2, CANVAS_HEIGHT)
		ctx.stroke()

		// Draw obstacles
		state.obstacles.forEach((obstacle): void => {
			if (obstacle.type === "car") {
				ctx.fillStyle = "#ff0000"
				ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
				// Car windows
				ctx.fillStyle = "#0000ff"
				ctx.fillRect(obstacle.x + 5, obstacle.y + 10, obstacle.width - 10, 15)
			} else if (obstacle.type === "cone") {
				ctx.fillStyle = "#ff8800"
				ctx.beginPath()
				ctx.moveTo(obstacle.x + obstacle.width / 2, obstacle.y)
				ctx.lineTo(obstacle.x, obstacle.y + obstacle.height)
				ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height)
				ctx.closePath()
				ctx.fill()
			} else if (obstacle.type === "barrier") {
				ctx.fillStyle = "#ffff00"
				ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
				// Barrier stripes
				ctx.fillStyle = "#000000"
				for (let i = 0; i < obstacle.height; i += 10) {
					ctx.fillRect(obstacle.x, obstacle.y + i, obstacle.width, 5)
				}
			}
		})

		// Draw car
		ctx.save()
		ctx.translate(state.carX + CAR_WIDTH / 2, CAR_Y + CAR_HEIGHT / 2)

		// Car body
		ctx.fillStyle = "#0066ff"
		ctx.fillRect(-CAR_WIDTH / 2, -CAR_HEIGHT / 2, CAR_WIDTH, CAR_HEIGHT)

		// Car windows
		ctx.fillStyle = "#0000ff"
		ctx.fillRect(-CAR_WIDTH / 2 + 5, -CAR_HEIGHT / 2 + 10, CAR_WIDTH - 10, 20)

		// Car wheels
		ctx.fillStyle = "#000000"
		ctx.fillRect(-CAR_WIDTH / 2 - 5, -CAR_HEIGHT / 2 + 15, 10, 15)
		ctx.fillRect(CAR_WIDTH / 2 - 5, -CAR_HEIGHT / 2 + 15, 10, 15)
		ctx.fillRect(-CAR_WIDTH / 2 - 5, CAR_HEIGHT / 2 - 30, 10, 15)
		ctx.fillRect(CAR_WIDTH / 2 - 5, CAR_HEIGHT / 2 - 30, 10, 15)

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
		const uiGameState = arcadeClass.getGameState(gameType)
		const personalBest = arcadeClass.getPersonalBest(gameType)
		ctx.fillStyle = "#ffffff"
		ctx.font = "bold 24px Arial"
		ctx.fillText(`Score: ${uiGameState.score}`, 20, 40)
		ctx.fillText(`Speed: ${state.speed.toFixed(1)}`, 20, 70)

		// Draw high score
		ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
		ctx.font = "16px Arial"
		ctx.fillText(`High Score: ${personalBest}`, CANVAS_WIDTH - 200, 40)

		// Draw speed indicator
		const speedBarWidth = 200
		const speedBarHeight = 20
		const speedPercent = (state.speed - MIN_SPEED) / (MAX_SPEED - MIN_SPEED)
		ctx.fillStyle = "#333333"
		ctx.fillRect(CANVAS_WIDTH - speedBarWidth - 20, CANVAS_HEIGHT - 40, speedBarWidth, speedBarHeight)
		// eslint-disable-next-line no-nested-ternary
		ctx.fillStyle = speedPercent > 0.7 ? "#ff0000" : speedPercent > 0.4 ? "#ffaa00" : "#00ff00"
		ctx.fillRect(CANVAS_WIDTH - speedBarWidth - 20, CANVAS_HEIGHT - 40, speedBarWidth * speedPercent, speedBarHeight)

		// Draw controls hint
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
		ctx.font = "14px Arial"
		const controlsText = "Left encoder: steer | Right encoder: throttle"
		ctx.fillText(controlsText, CANVAS_WIDTH / 2 - 180, CANVAS_HEIGHT - 20)
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
		// Initialize encoder positions
		const leftEncoderData = sensorDataClass.leftWheelEncoderPosition
		const rightEncoderData = sensorDataClass.rightWheelEncoderPosition
		if (leftEncoderData.length > 0) {
			gameStateRef.current.lastLeftEncoder = leftEncoderData[leftEncoderData.length - 1]
		}
		if (rightEncoderData.length > 0) {
			gameStateRef.current.lastRightEncoder = rightEncoderData[rightEncoderData.length - 1]
		}

		arcadeClass.startGame(gameType)
		animationRef.current = requestAnimationFrame(gameLoop)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameType])

	const resetGame = useCallback((): void => {
		gameStateRef.current = {
			carX: ROAD_CENTER_X,
			speed: INITIAL_SPEED,
			obstacles: [],
			particles: [],
			lastObstacleTime: 0,
			screenShake: 0,
			lastLeftEncoder: 0,
			lastRightEncoder: 0,
			obstacleSpacing: 400,
			lastEnterTriggerTime: 0
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

	return (
		<ArcadeGameLayout
			canvas={
				<canvas
					ref={canvasRef}
					width={CANVAS_WIDTH}
					height={CANVAS_HEIGHT}
					className="border-2 border-[#4a5568] rounded-lg shadow-lg"
					style={{ maxWidth: "100%", height: "auto" }}
				/>
			}
			onStart={startGame}
			onPlayAgain={resetGame}
		/>
	)
}

export default observer(CityDriverGame)


"use client"
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useCallback, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react"
import sensorDataClass from "../../classes/sensor-data-class"
import useTypedNavigate from "../../hooks/navigate/use-typed-navigate"
import careerQuestTrigger from "../../utils/career-quest/career-quest-trigger"
import { CareerType, TurretArcadeTriggerType } from "@lever-labs/common-ts/protocol"
import ArcadeGameLayout from "./arcade-game-layout"

interface Projectile {
	x: number
	y: number
	vx: number
	vy: number
	type: "left" | "right"
	damage: number
}

interface Enemy {
	x: number
	y: number
	vx: number
	vy: number
	type: "basic" | "fast" | "tank"
	health: number
	maxHealth: number
	size: number
	zigzagPhase: number
	zigzagSpeed: number
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

interface MuzzleFlash {
	x: number
	y: number
	angle: number
	life: number
	type: "left" | "right"
}

interface CollisionParams {
	x1: number
	y1: number
	size1: number
	x2: number
	y2: number
	size2: number
}

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const TURRET_X = CANVAS_WIDTH / 2
const TURRET_Y = CANVAS_HEIGHT - 50
const TURRET_LENGTH = 40

// Weapon configurations
const WEAPONS = {
	left: { speed: 3, damage: 3, color: "#00ff00", fireRate: 400 },
	right: { speed: 6, damage: 0.5, color: "#ff0000", fireRate: 200 }
}

// Enemy configurations
const ENEMY_TYPES = {
	basic: { health: 1, speed: 1, size: 20, color: "#ff6b6b", points: 10 },
	fast: { health: 1, speed: 1.5, size: 15, color: "#ffd93d", points: 20 },
	tank: { health: 5, speed: 1, size: 30, color: "#6c5ce7", points: 50 }
}

// eslint-disable-next-line max-lines-per-function
function PipTurretGame (): React.ReactNode {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const gameStateRef = useRef({
		turretAngle: 0,
		projectiles: [] as Projectile[],
		enemies: [] as Enemy[],
		particles: [] as Particle[],
		muzzleFlashes: [] as MuzzleFlash[],
		score: 0,
		gameOver: false,
		gameStarted: false,
		lastSpawnTime: 0,
		difficulty: 1,
		wave: 1,
		enemiesInWave: 0,
		waveEnemiesSpawned: 0,
		lastLeftFire: 0,
		lastRightFire: 0,
		screenShake: 0,
		combo: 0,
		comboTimer: 0,
		lastKillTime: 0,
		lastEnterTriggerTime: 0,
		highScore: parseInt(localStorage.getItem("turretHighScore") || "0", 10)
	})
	const animationRef = useRef<number>(0)

	const [score, setScore] = useState(0)
	const [gameOver, setGameOver] = useState(false)
	const [gameStarted, setGameStarted] = useState(false)
	const navigate = useTypedNavigate()

	const fireBullet = useCallback((type: "left" | "right"): void => {
		if (gameStateRef.current.gameOver || !gameStateRef.current.gameStarted) return

		const angle = (gameStateRef.current.turretAngle * Math.PI) / 180
		const weapon = WEAPONS[type]

		const offsetX = type === "left" ? -10 : 10
		const startX = TURRET_X + Math.cos(angle - Math.PI / 2) * TURRET_LENGTH + offsetX
		const startY = TURRET_Y + Math.sin(angle - Math.PI / 2) * TURRET_LENGTH

		gameStateRef.current.projectiles.push({
			x: startX,
			y: startY,
			vx: Math.cos(angle - Math.PI / 2) * weapon.speed,
			vy: Math.sin(angle - Math.PI / 2) * weapon.speed,
			type,
			damage: weapon.damage
		})

		// Add muzzle flash
		gameStateRef.current.muzzleFlashes.push({
			x: startX,
			y: startY,
			angle,
			life: 5,
			type
		})
	}, [])

	const spawnEnemy = useCallback((): void => {
		const state = gameStateRef.current

		// Increase variety with difficulty
		let type: "basic" | "fast" | "tank" = "basic"
		const rand = Math.random()
		if (state.difficulty > 2 && rand < 0.3) type = "fast"
		if (state.difficulty > 3 && rand > 0.7) type = "tank"

		const config = ENEMY_TYPES[type]
		const x = Math.random() * (CANVAS_WIDTH - config.size * 2) + config.size

		// Some enemies drift horizontally with zigzag pattern
		const baseVx = (Math.random() - 0.5) * 1 * state.difficulty
		const zigzagSpeed = type === "fast" ? 0.15 : 0.1

		state.enemies.push({
			x,
			y: -config.size,
			vx: baseVx,
			vy: config.speed * state.difficulty,
			type,
			health: config.health,
			maxHealth: config.health,
			size: config.size,
			zigzagPhase: Math.random() * Math.PI * 2,
			zigzagSpeed
		})

		state.enemiesInWave++
		state.waveEnemiesSpawned++
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

	const checkCollision = ({ x1, y1, size1, x2, y2, size2 }: CollisionParams): boolean => {
		const dx = x1 - x2
		const dy = y1 - y2
		const distance = Math.sqrt(dx * dx + dy * dy)
		return distance < (size1 + size2) / 2
	}

	// eslint-disable-next-line max-lines-per-function, complexity
	const updateGame = useCallback((timestamp: number): void => {
		const state = gameStateRef.current
		if (state.gameOver || !state.gameStarted) return

		// Send ENTER trigger every 10 seconds while in game
		const currentTime = Date.now()
		if (currentTime - state.lastEnterTriggerTime > 10000) {
			void careerQuestTrigger(CareerType.TURRET_ARCADE, TurretArcadeTriggerType.ENTER_TURRET_ARCADE)
			state.lastEnterTriggerTime = currentTime
		}

		// Update difficulty based on score
		const newDifficulty = 1 + Math.floor(state.score / 100)
		if (newDifficulty !== state.difficulty) {
			state.difficulty = newDifficulty
		}

		// Wave system: spawn enemies in waves
		const enemiesPerWave = 5 + state.wave * 2
		const waveComplete = state.waveEnemiesSpawned >= enemiesPerWave && state.enemies.length === 0

		if (waveComplete) {
			// Start next wave
			state.wave++
			state.enemiesInWave = 0
			state.waveEnemiesSpawned = 0
		}

		// Spawn enemies
		const spawnRate = Math.max(500 - state.difficulty * 50, 200)
		if (timestamp - state.lastSpawnTime > spawnRate && state.waveEnemiesSpawned < enemiesPerWave) {
			spawnEnemy()
			state.lastSpawnTime = timestamp
		}

		// Update combo timer
		if (state.comboTimer > 0) {
			state.comboTimer--
			if (state.comboTimer === 0) {
				state.combo = 0
			}
		}

		// Update projectiles
		state.projectiles = state.projectiles.filter((p): boolean => {
			p.x += p.vx
			p.y += p.vy
			return p.y > -10 && p.x > -10 && p.x < CANVAS_WIDTH + 10
		})

		// Update enemies with zigzag movement
		state.enemies = state.enemies.filter((e): boolean => {
			// Zigzag pattern
			e.zigzagPhase += e.zigzagSpeed
			e.x += e.vx + Math.sin(e.zigzagPhase) * 0.5
			e.y += e.vy

			// Check if enemy hit the turret
			if (checkCollision({ x1: e.x, y1: e.y, size1: e.size, x2: TURRET_X, y2: TURRET_Y, size2: 25 })) {
				state.gameOver = true
				setGameOver(true)
				createParticles(TURRET_X, TURRET_Y, "#ff0000", 30)
				state.screenShake = 20
				return false
			}

			// Remove enemies that go off screen
			if (e.y > CANVAS_HEIGHT + e.size) {
				return false
			}

			return true
		})

		// Update particles
		state.particles = state.particles.filter((p): boolean => {
			p.x += p.vx
			p.y += p.vy
			p.life--
			p.vy += 0.1 // Gravity
			return p.life > 0
		})

		// Update muzzle flashes
		state.muzzleFlashes = state.muzzleFlashes.filter((flash): boolean => {
			flash.life--
			return flash.life > 0
		})

		// Check collisions
		state.projectiles.forEach((proj, projIndex): void => {
			state.enemies.forEach((enemy, enemyIndex): void => {
				if (checkCollision({
					x1: proj.x,
					y1: proj.y,
					size1: 5,
					x2: enemy.x,
					y2: enemy.y,
					size2: enemy.size
				})) {
					enemy.health -= proj.damage
					state.projectiles.splice(projIndex, 1)

					createParticles(enemy.x, enemy.y, WEAPONS[proj.type].color, 6)

					if (enemy.health <= 0) {
						const config = ENEMY_TYPES[enemy.type]
						const now = Date.now()

						// Combo system: increase combo if kills are close together
						if (now - state.lastKillTime < 1000) {
							state.combo++
							state.comboTimer = 60 // 1 second at 60fps
						} else {
							state.combo = 1
							state.comboTimer = 60
						}
						state.lastKillTime = now

						// Score with combo multiplier
						const comboMultiplier = 1 + state.combo * 0.1
						const points = Math.floor(config.points * comboMultiplier)
						state.score += points
						setScore(state.score)

						createParticles(enemy.x, enemy.y, config.color, 15)
						state.enemies.splice(enemyIndex, 1)
						state.screenShake = 5
					}
				}
			})
		})

		// Decay screen shake
		if (state.screenShake > 0) {
			state.screenShake *= 0.85
			if (state.screenShake < 0.1) state.screenShake = 0
		}
	}, [spawnEnemy, createParticles])

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

		// Clear canvas
		ctx.fillStyle = "#0a0e27"
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

		// Draw animated stars background
		ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
		const time = Date.now() * 0.001
		for (let i = 0; i < 50; i++) {
			const x = (i * 37) % CANVAS_WIDTH
			const y = ((i * 59) + Math.sin(time + i) * 10) % CANVAS_HEIGHT
			const size = 1 + Math.sin(time * 2 + i) * 0.5
			ctx.fillRect(x, y, size, size)
		}

		// Draw turret base with glow
		ctx.shadowBlur = 10
		ctx.shadowColor = "#4a5568"
		ctx.fillStyle = "#4a5568"
		ctx.beginPath()
		ctx.arc(TURRET_X, TURRET_Y, 25, 0, Math.PI * 2)
		ctx.fill()
		ctx.shadowBlur = 0

		// Draw turret barrel
		ctx.save()
		ctx.translate(TURRET_X, TURRET_Y)
		ctx.rotate((state.turretAngle * Math.PI) / 180)

		ctx.fillStyle = "#718096"
		ctx.fillRect(-8, -TURRET_LENGTH, 16, TURRET_LENGTH)

		// Draw weapon indicators
		ctx.fillStyle = WEAPONS.left.color
		ctx.fillRect(-12, -TURRET_LENGTH - 5, 4, 5)
		ctx.fillStyle = WEAPONS.right.color
		ctx.fillRect(8, -TURRET_LENGTH - 5, 4, 5)

		ctx.restore()

		// Draw muzzle flashes
		state.muzzleFlashes.forEach((flash): void => {
			ctx.save()
			ctx.translate(flash.x, flash.y)
			ctx.rotate(flash.angle - Math.PI / 2)

			const alpha = flash.life / 5
			const weapon = WEAPONS[flash.type]
			ctx.fillStyle = weapon.color + Math.floor(alpha * 200).toString(16).padStart(2, "0")
			ctx.fillRect(-6, -TURRET_LENGTH - 10, 12, 15)

			ctx.restore()
		})

		// Draw projectiles with glow
		state.projectiles.forEach((p): void => {
			ctx.shadowBlur = 8
			ctx.shadowColor = WEAPONS[p.type].color
			ctx.fillStyle = WEAPONS[p.type].color
			ctx.beginPath()
			ctx.arc(p.x, p.y, 5, 0, Math.PI * 2)
			ctx.fill()

			// Trail effect
			ctx.shadowBlur = 0
			ctx.fillStyle = WEAPONS[p.type].color + "44"
			ctx.beginPath()
			ctx.arc(p.x - p.vx, p.y - p.vy, 4, 0, Math.PI * 2)
			ctx.fill()
		})

		// Draw enemies with glow
		state.enemies.forEach((e): void => {
			const config = ENEMY_TYPES[e.type]

			ctx.shadowBlur = 5
			ctx.shadowColor = config.color
			ctx.fillStyle = config.color
			ctx.beginPath()
			ctx.arc(e.x, e.y, e.size / 2, 0, Math.PI * 2)
			ctx.fill()
			ctx.shadowBlur = 0

			// Health bar for tanks
			if (e.type === "tank") {
				const healthPercent = e.health / e.maxHealth
				ctx.fillStyle = "#2d3748"
				ctx.fillRect(e.x - 15, e.y - e.size / 2 - 8, 30, 4)
				ctx.fillStyle = "#48bb78"
				ctx.fillRect(e.x - 15, e.y - e.size / 2 - 8, 30 * healthPercent, 4)
			}
		})

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
		ctx.fillStyle = "#ffffff"
		ctx.font = "bold 24px Arial"
		ctx.fillText(`Score: ${state.score}`, 20, 40)
		ctx.fillText(`Wave: ${state.wave}`, 20, 70)
		ctx.fillText(`Level: ${state.difficulty}`, 20, 100)

		// Draw combo
		if (state.combo > 1) {
			ctx.fillStyle = "#ffd93d"
			ctx.font = "bold 32px Arial"
			const comboText = `${state.combo}x COMBO!`
			const comboWidth = ctx.measureText(comboText).width
			ctx.fillText(comboText, CANVAS_WIDTH / 2 - comboWidth / 2, 50)
		}

		// Draw high score
		ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
		ctx.font = "16px Arial"
		ctx.fillText(`High Score: ${state.highScore}`, CANVAS_WIDTH - 200, 40)

		// Draw weapon cooldown indicators
		const now = Date.now()
		const leftCooldown = Math.max(0, 1 - (now - state.lastLeftFire) / WEAPONS.left.fireRate)
		const rightCooldown = Math.max(0, 1 - (now - state.lastRightFire) / WEAPONS.right.fireRate)

		ctx.fillStyle = WEAPONS.left.color
		ctx.fillRect(20, CANVAS_HEIGHT - 40, 100, 20)
		ctx.fillStyle = "#2d3748"
		ctx.fillRect(20, CANVAS_HEIGHT - 40, 100 * leftCooldown, 20)

		ctx.fillStyle = WEAPONS.right.color
		ctx.fillRect(CANVAS_WIDTH - 120, CANVAS_HEIGHT - 40, 100, 20)
		ctx.fillStyle = "#2d3748"
		ctx.fillRect(CANVAS_WIDTH - 120, CANVAS_HEIGHT - 40, 100 * rightCooldown, 20)

		// Draw controls hint
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
		ctx.font = "14px Arial"
		const controlsText = "Tilt Pip to aim | Cover sensors to fire"
		ctx.fillText(controlsText, CANVAS_WIDTH / 2 - 150, CANVAS_HEIGHT - 20)
	}, [])

	const gameLoop = useCallback((timestamp: number): void => {
		updateGame(timestamp)
		draw()

		if (!gameStateRef.current.gameOver && gameStateRef.current.gameStarted) {
			animationRef.current = requestAnimationFrame(gameLoop)
		}
	}, [updateGame, draw])

	const startGame = useCallback((): void => {
		gameStateRef.current.gameStarted = true
		setGameStarted(true)
		animationRef.current = requestAnimationFrame(gameLoop)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const resetGame = useCallback((): void => {
		const state = gameStateRef.current
		const newHighScore = Math.max(state.score, state.highScore)

		gameStateRef.current = {
			turretAngle: 0,
			projectiles: [],
			enemies: [],
			particles: [],
			muzzleFlashes: [],
			score: 0,
			gameOver: false,
			gameStarted: false,
			lastSpawnTime: 0,
			difficulty: 1,
			wave: 1,
			enemiesInWave: 0,
			waveEnemiesSpawned: 0,
			lastLeftFire: 0,
			lastRightFire: 0,
			screenShake: 0,
			combo: 0,
			comboTimer: 0,
			lastKillTime: 0,
			lastEnterTriggerTime: 0,
			highScore: newHighScore
		}

		if (newHighScore > state.highScore) {
			localStorage.setItem("turretHighScore", newHighScore.toString())
		}

		setScore(0)
		setGameOver(false)
		setGameStarted(false)

		// Start the game immediately after reset
		startGame()
	}, [startGame])

	// Read sensor data and update game state
	useEffect((): (() => void) => {
		const intervalId = setInterval((): void => {
			if (!gameStateRef.current.gameStarted || gameStateRef.current.gameOver) return

			// Get latest roll value from sensor data
			const rollData = sensorDataClass.roll
			if (rollData.length > 0) {
				const latestRoll = rollData[rollData.length - 1]
				// Map roll to turret angle: -90 to +90 degrees
				// Clamp to ensure it doesn't exceed bounds
				gameStateRef.current.turretAngle = Math.max(-90, Math.min(90, latestRoll * 2))
			}

			// Get latest ToF counts
			const leftTofData = sensorDataClass.leftSideTofCounts
			const rightTofData = sensorDataClass.rightSideTofCounts

			const now = Date.now()

			// Check left ToF for firing
			if (leftTofData.length > 0) {
				const latestLeftTof = leftTofData[leftTofData.length - 1]
				if (latestLeftTof > 2000) {
					if (now - gameStateRef.current.lastLeftFire > WEAPONS.left.fireRate) {
						fireBullet("left")
						gameStateRef.current.lastLeftFire = now
					}
				}
			}

			// Check right ToF for firing
			if (rightTofData.length > 0) {
				const latestRightTof = rightTofData[rightTofData.length - 1]
				if (latestRightTof > 2000) {
					if (now - gameStateRef.current.lastRightFire > WEAPONS.right.fireRate) {
						fireBullet("right")
						gameStateRef.current.lastRightFire = now
					}
				}
			}
		}, 16) // ~60fps

		return (): void => {
			clearInterval(intervalId)
		}
	}, [fireBullet])

	useEffect((): (() => void) => {
		if (gameStarted && !gameOver) {
			animationRef.current = requestAnimationFrame(gameLoop)
		}

		return (): void => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}, [gameLoop, gameStarted, gameOver])

	const handleBack = useCallback((): void => {
		// Send EXIT trigger when going back
		void careerQuestTrigger(CareerType.TURRET_ARCADE, TurretArcadeTriggerType.EXIT_TURRET_ARCADE)
		navigate("/arcade")
	}, [navigate])

	return (
		<ArcadeGameLayout
			title="Pip Turret Defense"
			instructions={
				<>
					<p><strong className="text-white">How to Play:</strong></p>
					<p>
						Tilt Pip left and right to aim the turret. Cover the left sensor for rapid-fire green weapon,
						right sensor for powerful red weapon.
					</p>
					<p>Destroy enemies before they hit your turret. Build combos for bonus points!</p>
					<p>
						<strong className="text-[#ffd93d]">Yellow</strong> enemies are fast,{" "}
						<strong className="text-[#6c5ce7]">Purple</strong> enemies are tanks.
					</p>
				</>
			}
			canvas={
				<canvas
					ref={canvasRef}
					width={CANVAS_WIDTH}
					height={CANVAS_HEIGHT}
					className="border-2 border-[#4a5568] rounded-lg shadow-lg"
				/>
			}
			onBack={handleBack}
			gameStarted={gameStarted}
			gameOver={gameOver}
			score={score}
			highScore={gameStateRef.current.highScore}
			startScreenContent={{
				title: "Ready to Defend?",
				description: "Defend your turret from waves of enemies! Tilt Pip to aim and cover the sensors to fire!",
				onStart: startGame
			}}
			gameOverContent={{
				onPlayAgain: resetGame
			}}
		/>
	)
}

export default observer(PipTurretGame)

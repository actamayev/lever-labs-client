"use client"
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useRef, useState } from "react"

interface Projectile {
	x: number;
	y: number;
	vx: number;
	vy: number;
	type: "left" | "right";
	damage: number;
}

interface Enemy {
	x: number;
	y: number;
	vx: number;
	vy: number;
	type: "basic" | "fast" | "tank";
	health: number;
	maxHealth: number;
	size: number;
}

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	life: number;
	maxLife: number;
	color: string;
	size: number;
}

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const TURRET_X = CANVAS_WIDTH / 2
const TURRET_Y = CANVAS_HEIGHT - 50
const TURRET_LENGTH = 40

// Weapon configurations
const WEAPONS = {
	left: { speed: 8, damage: 1, color: "#00ff00", fireRate: 200 },
	right: { speed: 6, damage: 3, color: "#ff0000", fireRate: 400 }
}

// Enemy configurations
const ENEMY_TYPES = {
	basic: { health: 1, speed: 2, size: 20, color: "#ff6b6b", points: 10 },
	fast: { health: 1, speed: 4, size: 15, color: "#ffd93d", points: 20 },
	tank: { health: 5, speed: 1, size: 30, color: "#6c5ce7", points: 50 }
}

// eslint-disable-next-line max-lines-per-function
export default function PipTurretGame() : React.ReactNode {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const gameStateRef = useRef({
		turretAngle: 0,
		projectiles: [] as Projectile[],
		enemies: [] as Enemy[],
		particles: [] as Particle[],
		score: 0,
		gameOver: false,
		lastSpawnTime: 0,
		difficulty: 1,
		lastLeftFire: 0,
		lastRightFire: 0,
		screenShake: 0
	})
	const wsRef = useRef<WebSocket | null>(null)
	const animationRef = useRef<number>(0)

	const [score, setScore] = useState(0)
	const [gameOver, setGameOver] = useState(false)

	// WebSocket connection
	useEffect(() => {
		// Simulate WebSocket for demo - replace with your actual WebSocket connection
		const simulateRobotData = () => {
			// For demo: Use mouse position for turret angle
			const handleMouseMove = (e: MouseEvent) => {
				const rect = canvasRef.current?.getBoundingClientRect()
				if (rect) {
					const mouseX = e.clientX - rect.left
					// Map mouse position to -90 to +90 degrees (full horizontal range)
					const angle = ((mouseX / CANVAS_WIDTH) - 0.5) * 180
					gameStateRef.current.turretAngle = angle
				}
			}

			// For demo: Use keyboard for firing
			const handleKeyDown = (e: KeyboardEvent) => {
				const now = Date.now()
				if (e.key === "a" || e.key === "ArrowLeft") {
					if (now - gameStateRef.current.lastLeftFire > WEAPONS.left.fireRate) {
						fireBullet("left")
						gameStateRef.current.lastLeftFire = now
					}
				}
				if (e.key === "d" || e.key === "ArrowRight") {
					if (now - gameStateRef.current.lastRightFire > WEAPONS.right.fireRate) {
						fireBullet("right")
						gameStateRef.current.lastRightFire = now
					}
				}
			}

			window.addEventListener("mousemove", handleMouseMove)
			window.addEventListener("keydown", handleKeyDown)

			return () => {
				window.removeEventListener("mousemove", handleMouseMove)
				window.removeEventListener("keydown", handleKeyDown)
			}
		}

		// For production: Connect to your WebSocket
		/*
    const ws = new WebSocket('ws://your-pip-url');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Update turret angle from roll (-45 to +45 maps to -90 to +90 degrees tilt)
      if (data.roll !== undefined) {
        gameStateRef.current.turretAngle = data.roll;
      }

      // Fire left weapon if ToF > 250 counts
      if (data.leftToF > 250) {
        const now = Date.now();
        if (now - gameStateRef.current.lastLeftFire > WEAPONS.left.fireRate) {
          fireBullet('left');
          gameStateRef.current.lastLeftFire = now;
        }
      }

      // Fire right weapon if ToF > 250 counts
      if (data.rightToF > 250) {
        const now = Date.now();
        if (now - gameStateRef.current.lastRightFire > WEAPONS.right.fireRate) {
          fireBullet('right');
          gameStateRef.current.lastRightFire = now;
        }
      }
    };
    wsRef.current = ws;
    */

		const cleanup = simulateRobotData()
		return () => {
			cleanup()
			wsRef.current?.close()
		}
	}, [])

	const fireBullet = (type: "left" | "right") => {
		if (gameStateRef.current.gameOver) return

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

		// Play sound effect (add audio element if desired)
	}

	const spawnEnemy = () => {
		const state = gameStateRef.current
		const types = ["basic", "fast", "tank"] as const

		// Increase variety with difficulty
		let type: "basic" | "fast" | "tank" = "basic"
		const rand = Math.random()
		if (state.difficulty > 2 && rand < 0.3) type = "fast"
		if (state.difficulty > 3 && rand > 0.7) type = "tank"

		const config = ENEMY_TYPES[type]
		const x = Math.random() * (CANVAS_WIDTH - config.size * 2) + config.size

		// Some enemies drift horizontally
		const vx = (Math.random() - 0.5) * 1 * state.difficulty

		state.enemies.push({
			x,
			y: -config.size,
			vx,
			vy: config.speed * state.difficulty,
			type,
			health: config.health,
			maxHealth: config.health,
			size: config.size
		})
	}

	const createParticles = (x: number, y: number, color: string, count: number = 8) => {
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
	}

	const checkCollision = (
		x1: number, y1: number, size1: number,
		x2: number, y2: number, size2: number
	): boolean => {
		const dx = x1 - x2
		const dy = y1 - y2
		const distance = Math.sqrt(dx * dx + dy * dy)
		return distance < (size1 + size2) / 2
	}

	const updateGame = (timestamp: number) => {
		const state = gameStateRef.current
		if (state.gameOver) return

		const deltaTime = 16 // Assume 60fps

		// Update difficulty over time
		state.difficulty = 1 + Math.floor(state.score / 100)

		// Spawn enemies
		const spawnRate = Math.max(500 - state.difficulty * 50, 200)
		if (timestamp - state.lastSpawnTime > spawnRate) {
			spawnEnemy()
			state.lastSpawnTime = timestamp
		}

		// Update projectiles
		state.projectiles = state.projectiles.filter(p => {
			p.x += p.vx
			p.y += p.vy
			return p.y > -10 && p.x > -10 && p.x < CANVAS_WIDTH + 10
		})

		// Update enemies
		state.enemies = state.enemies.filter(e => {
			e.x += e.vx
			e.y += e.vy

			// Check if enemy hit the turret
			if (checkCollision(e.x, e.y, e.size, TURRET_X, TURRET_Y, 25)) {
				state.gameOver = true
				setGameOver(true)
				createParticles(TURRET_X, TURRET_Y, "#ff0000", 20)
				state.screenShake = 15
				return false
			}

			// Remove enemies that go off screen
			if (e.y > CANVAS_HEIGHT + e.size) {
				return false
			}

			return true
		})

		// Update particles
		state.particles = state.particles.filter(p => {
			p.x += p.vx
			p.y += p.vy
			p.life--
			p.vy += 0.1 // Gravity
			return p.life > 0
		})

		// Check collisions
		state.projectiles.forEach((proj, projIndex) => {
			state.enemies.forEach((enemy, enemyIndex) => {
				if (checkCollision(proj.x, proj.y, 5, enemy.x, enemy.y, enemy.size)) {
					enemy.health -= proj.damage
					state.projectiles.splice(projIndex, 1)

					createParticles(enemy.x, enemy.y, WEAPONS[proj.type].color, 6)

					if (enemy.health <= 0) {
						const config = ENEMY_TYPES[enemy.type]
						state.score += config.points
						setScore(state.score)
						createParticles(enemy.x, enemy.y, config.color, 12)
						state.enemies.splice(enemyIndex, 1)
						state.screenShake = 5
					}
				}
			})
		})

		// Decay screen shake
		if (state.screenShake > 0) {
			state.screenShake *= 0.8
			if (state.screenShake < 0.1) state.screenShake = 0
		}
	}

	const draw = () => {
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

		// Draw stars background
		ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
		for (let i = 0; i < 50; i++) {
			const x = (i * 37) % CANVAS_WIDTH
			const y = (i * 59) % CANVAS_HEIGHT
			ctx.fillRect(x, y, 2, 2)
		}

		// Draw turret base
		ctx.fillStyle = "#4a5568"
		ctx.beginPath()
		ctx.arc(TURRET_X, TURRET_Y, 25, 0, Math.PI * 2)
		ctx.fill()

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

		// Draw projectiles
		state.projectiles.forEach(p => {
			ctx.fillStyle = WEAPONS[p.type].color
			ctx.beginPath()
			ctx.arc(p.x, p.y, 5, 0, Math.PI * 2)
			ctx.fill()

			// Trail effect
			ctx.fillStyle = WEAPONS[p.type].color + "44"
			ctx.beginPath()
			ctx.arc(p.x - p.vx, p.y - p.vy, 4, 0, Math.PI * 2)
			ctx.fill()
		})

		// Draw enemies
		state.enemies.forEach(e => {
			const config = ENEMY_TYPES[e.type]

			// Enemy body
			ctx.fillStyle = config.color
			ctx.beginPath()
			ctx.arc(e.x, e.y, e.size / 2, 0, Math.PI * 2)
			ctx.fill()

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
		state.particles.forEach(p => {
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
		ctx.fillText(`Level: ${state.difficulty}`, 20, 70)

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
		ctx.fillText("Move mouse to aim | A/← for left weapon | D/→ for right weapon", CANVAS_WIDTH / 2 - 200, CANVAS_HEIGHT - 20)
	}

	const gameLoop = (timestamp: number) => {
		updateGame(timestamp)
		draw()

		if (!gameStateRef.current.gameOver) {
			animationRef.current = requestAnimationFrame(gameLoop)
		}
	}

	const resetGame = () => {
		gameStateRef.current = {
			turretAngle: 0,
			projectiles: [],
			enemies: [],
			particles: [],
			score: 0,
			gameOver: false,
			lastSpawnTime: 0,
			difficulty: 1,
			lastLeftFire: 0,
			lastRightFire: 0,
			screenShake: 0
		}
		setScore(0)
		setGameOver(false)
		animationRef.current = requestAnimationFrame(gameLoop)
	}

	useEffect(() => {
		animationRef.current = requestAnimationFrame(gameLoop)

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}, [])

	return (
		<div style={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			minHeight: "100vh",
			backgroundColor: "#1a202c",
			fontFamily: "Arial, sans-serif"
		}}>
			<h1 style={{ color: "#ffffff", marginBottom: "20px" }}>Pip Turret Defense</h1>

			<canvas
				ref={canvasRef}
				width={CANVAS_WIDTH}
				height={CANVAS_HEIGHT}
				style={{
					border: "2px solid #4a5568",
					borderRadius: "8px",
					boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)"
				}}
			/>

			{gameOver && (
				<div style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					backgroundColor: "rgba(0, 0, 0, 0.9)",
					padding: "40px",
					borderRadius: "12px",
					textAlign: "center",
					border: "3px solid #ff6b6b"
				}}>
					<h2 style={{ color: "#ff6b6b", fontSize: "48px", margin: "0 0 20px 0" }}>GAME OVER</h2>
					<p style={{ color: "#ffffff", fontSize: "24px", margin: "0 0 30px 0" }}>
						Final Score: {score}
					</p>
					<button
						onClick={resetGame}
						style={{
							padding: "15px 40px",
							fontSize: "20px",
							backgroundColor: "#48bb78",
							color: "#ffffff",
							border: "none",
							borderRadius: "8px",
							cursor: "pointer",
							fontWeight: "bold"
						}}
					>
						Play Again
					</button>
				</div>
			)}

			<div style={{
				marginTop: "20px",
				color: "#a0aec0",
				textAlign: "center",
				maxWidth: "600px"
			}}>
				<p><strong style={{ color: "#ffffff" }}>How to Play:</strong></p>
				<p>Move your mouse to aim the turret. Use A/← for rapid-fire green weapon, D/→ for powerful red weapon.</p>
				<p>Destroy enemies before they reach the bottom. Each level increases difficulty.</p>
				// eslint-disable-next-line max-len
				<p><strong style={{ color: "#ffd93d" }}>Yellow</strong> enemies are fast, <strong style={{ color: "#6c5ce7" }}>Purple</strong> enemies are tanks.</p>
			</div>
		</div>
	)
}

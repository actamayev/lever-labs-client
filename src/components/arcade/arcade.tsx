"use client"

import { Gamepad2, Bird, Car } from "lucide-react"
import { ArcadeGameCard } from "./arcade-game-card"
import WorkbenchLayout from "../layouts/workbench-layout"

export default function Arcade(): React.ReactNode {
	return (
		<WorkbenchLayout preventElasticScroll={true}>
			<div className="flex flex-col h-full w-full p-6">
				<div className="mb-6">
					<h1 className="text-3xl font-bold">Arcade</h1>
					<p className="text-muted-foreground mt-2">
						Choose a game to play and learn about coding and robotics
					</p>
				</div>

				{/* Full Width Game Cards */}
				<div className="flex flex-col gap-6 w-full">
					<ArcadeGameCard
						backgroundImage="/turret1.png"
						gameIcon={<Gamepad2 className="size-8" />}
						gameName="Pip Turret Defense"
						description={
							"Defend your turret from waves of enemies! Tilt Pip left and right to aim, " +
							"and cover the sensors to fire weapons. Build combos for bonus points and see how long you can survive!"
						}
						href="/arcade/turret"
					/>
					<ArcadeGameCard
						backgroundImage="/flappy1.png"
						gameIcon={<Bird className="size-8" />}
						gameName="Flappy Bird"
						description={
							"Control a bird using distance sensors! Navigate through pipes by adjusting the distance " +
							"to the sensor. The closer an object is, the higher the bird flies. See how many pipes you can pass!"
						}
						href="/arcade/flappy"
					/>
					<ArcadeGameCard
						backgroundImage="/turret1.png"
						gameIcon={<Car className="size-8" />}
						gameName="City Driver"
						description={
							"Drive through the city avoiding obstacles! Use the left wheel encoder to steer left and right, " +
							"and the right wheel encoder to control your speed. Navigate through traffic and see how far you can go!"
						}
						href="/arcade/city-driver"
					/>
				</div>
			</div>
		</WorkbenchLayout>
	)
}

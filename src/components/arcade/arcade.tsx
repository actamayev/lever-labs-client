"use client"

import WorkbenchLayout from "../layouts/workbench-layout"
import { ArcadeGameCard } from "./arcade-game-card"
import { Gamepad2 } from "lucide-react"

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

				{/* Full Width Game Card */}
				<div className="w-full">
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
				</div>
			</div>
		</WorkbenchLayout>
	)
}

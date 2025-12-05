"use client"

import { useEffect } from "react"
import { observer } from "mobx-react"
import { Gamepad2, Bird, Car } from "lucide-react"
import ArcadeGameCard from "./arcade-game-card"
import authClass from "../../classes/auth-class"
import WorkbenchLayout from "../layouts/workbench-layout"
import retrieveAllArcadeScores from "../../utils/arcade/retrieve-all-arcade-scores"

const games: GameData[] = [
	{
		backgroundImage: "/turret1.png",
		gameIcon: <Gamepad2 className="size-8" />,
		gameName: "Pip Turret Defense",
		description: "Defend against waves of enemies and see how long you can survive!",
		href: "/arcade/turret",
		gameType: "turretDefense"
	},
	{
		backgroundImage: "/flappy1.png",
		gameIcon: <Bird className="size-8" />,
		gameName: "Flappy Bird",
		description: "Navigate through pipes and test your reflexes!",
		href: "/arcade/flappy",
		gameType: "flappyBird"
	},
	{
		backgroundImage: "/city-driver.png",
		gameIcon: <Car className="size-8" />,
		gameName: "City Driver",
		description: "Race through the city and avoid obstacles in this high-speed challenge!",
		href: "/arcade/city-driver",
		gameType: "cityDriver"
	}
]

function Arcade(): React.ReactNode {
	useEffect((): void => {
		void retrieveAllArcadeScores()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authClass.isFinishedWithSignup])

	return (
		<WorkbenchLayout preventElasticScroll={true}>
			<div className="flex flex-col h-full w-full p-6">
				<div className="mb-6">
					<h1 className="text-3xl font-bold">Arcade</h1>
					<p className="text-muted-foreground mt-2">
						Choose a game to play and learn about coding and robotics
					</p>
				</div>

				<div className="flex flex-col gap-6 w-full">
					{games.map((game): React.ReactNode => (
						<ArcadeGameCard key={game.href} gameData={game} />
					))}
				</div>
			</div>
		</WorkbenchLayout>
	)
}

export default observer(Arcade)

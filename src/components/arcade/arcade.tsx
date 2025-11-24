"use client"

import { useEffect } from "react"
import { Gamepad2, Bird, Car } from "lucide-react"
import { ArcadeGameCard } from "./arcade-game-card"
import WorkbenchLayout from "../layouts/workbench-layout"
import arcadeClass from "../../classes/arcade-class"
import { ArcadeGameType } from "@lever-labs/common-ts/types/arcade"
import retrieveAllArcadeScores from "../../utils/arcade/retrieve-all-arcade-scores"
import authClass from "../../classes/auth-class"
import { observer } from "mobx-react"

interface GameData {
	backgroundImage: string
	gameIcon: React.ReactNode
	gameName: string
	description: string
	href: PageNames
	gameType: ArcadeGameType
}

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

				{/* Game Cards */}
				<div className="flex flex-col gap-6 w-full">
					{games.map((game): React.ReactNode => {
						const highScore = arcadeClass.getPersonalBest(game.gameType)

						return (
							<ArcadeGameCard
								key={game.href}
								backgroundImage={game.backgroundImage}
								gameIcon={game.gameIcon}
								gameName={game.gameName}
								description={game.description}
								href={game.href}
								highScore={highScore}
							/>
						)
					})}
				</div>
			</div>
		</WorkbenchLayout>
	)
}

export default observer(Arcade)

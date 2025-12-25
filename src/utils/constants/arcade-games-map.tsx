import { ArcadeGameType } from "@actamayev/lever-labs-common-ts/types/arcade"

export const arcadeGamesMap: Record<ArcadeGameType, ArcadeGameMetadata> = {
	flappyBird: {
		title: "Flappy Bird",
		instructions: (
			<>
				<p><strong className="text-white">How to Play:</strong></p>
				<p>
					Use the distance sensor to control the bird&apos;s height. The closer an object is to the sensor,
					the higher the bird flies. Navigate through the pipes without hitting them!
				</p>
				<p>Score points by passing through pipes. See how far you can go!</p>
			</>
		),
		startScreenTitle: "Ready to Fly?",
		startScreenDescription: "Use the distance sensor to control the bird's height! Navigate through pipes and see how far you can go!",
	},
	cityDriver: {
		title: "City Driver",
		instructions: (
			<>
				<p><strong className="text-white">How to Play:</strong></p>
				<p>
					Use the left wheel encoder to steer your car left and right. The encoder position delta controls movement.
					Use the right wheel encoder to control your speed (throttle). Avoid obstacles and score points!
				</p>
			</>
		),
		startScreenTitle: "Ready to Drive?",
		// eslint-disable-next-line max-len
		startScreenDescription: "Use the left encoder to steer left and right, and the right encoder to control your speed! Navigate through obstacles and see how far you can go!",
	},
	turretDefense: {
		title: "Pip Turret Defense",
		instructions: (
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
		),
		startScreenTitle: "Ready to Defend?",
		startScreenDescription: "Defend your turret from waves of enemies! Tilt Pip to aim and cover the sensors to fire!",
	}
}

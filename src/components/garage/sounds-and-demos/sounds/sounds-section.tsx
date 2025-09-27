"use client"

import { observer } from "mobx-react"
import { FunSounds } from "@lever-labs/common-ts/types/garage"
import SoundActionButton from "./sound-action-button"
import useGarageSoundsUseEffect from "../../../../hooks/garage/use-effect-garage-sounds"

function SoundsSection(): React.ReactNode {
	useGarageSoundsUseEffect(true)
	const sounds: FunSounds[] = [
		"Fart",
		"Monkey",
		"Elephant",
		"Party",
		"UFO",
		"Countdown",
		"Engine",
		"Robot"
	]

	// TODO 4/22/25: Make the top button hug the top border and the bottom border hug the bottom border
	return (
		<div className="flex flex-row gap-8">
			<div className="grid grid-cols-4 gap-[21px]">
				{sounds.map((sound, index): React.ReactNode => (
					<div key={sound}>
						<SoundActionButton sound={sound} index={index + 1} />
					</div>
				))}
			</div>
		</div>
	)
}

export default observer(SoundsSection)

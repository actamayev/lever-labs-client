"use client"

import { observer } from "mobx-react"
import SoundActionButton from "./sound-action-button"
import useGarageSoundsUseEffect from "../../../../hooks/garage/garage-sounds-use-effect"

function SoundsSection() {
	useGarageSoundsUseEffect()
	const sounds: Sounds[] = [
		"fart",
		"monkey",
		"elephant",
		"fanfare",
		"ufo",
		"countdown",
		"engine",
		"robot noise"
	]

	return (
		<div className="flex flex-row gap-8">
			{/* <AdjustVolume /> */}
			<div className="grid grid-cols-4 gap-[21px]">
				{sounds.map((sound, index) => (
					<div key={sound}>
						<SoundActionButton sound={sound} index={index + 1} />
					</div>
				))}
			</div>
		</div>
	)
}

export default observer(SoundsSection)

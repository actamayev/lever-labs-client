"use client"

import { observer } from "mobx-react"
import SoundActionButton from "./tone-action-button"
import useGarageTonesUseEffect from "../../../../hooks/garage/use-effect-garage-tones"
import { ToneType } from "@lever-labs/common-ts/protocol"

function TonesSection(): React.ReactNode {
	useGarageTonesUseEffect(true)
	const tones: ToneType[] = [
		ToneType.A,
		ToneType.B,
		ToneType.C,
		ToneType.D,
		ToneType.E,
		ToneType.F,
		ToneType.G,
	]

	// TODO 4/22/25: Make the top button hug the top border and the bottom border hug the bottom border
	return (
		<div className="flex flex-row gap-8">
			<div className="grid grid-cols-4 gap-[21px]">
				{tones.map((tone, index): React.ReactNode => (
					<div key={tone}>
						<SoundActionButton tone={tone} index={index + 1} />
					</div>
				))}
			</div>
		</div>
	)
}

export default observer(TonesSection)

"use client"

import { observer } from "mobx-react"
import SoundActionButton from "./tone-action-button"
import useGarageTonesUseEffect from "../../../../hooks/garage/use-effect-garage-tones"
import { ToneType } from "@actamayev/lever-labs-common-ts/protocol"

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
	const topRowTones = tones.slice(0, 3) // A, B, C
	const bottomRowTones = tones.slice(3) // D, E, F, G

	return (
		<div className="flex flex-col gap-[21px]">
			{/* Top row: 3 items, horizontally centered */}
			<div className="flex flex-row justify-center gap-[21px]">
				{topRowTones.map((tone, index): React.ReactNode => (
					<div key={tone}>
						<SoundActionButton tone={tone} index={index + 1} />
					</div>
				))}
			</div>
			{/* Bottom row: 4 items */}
			<div className="flex flex-row gap-[21px]">
				{bottomRowTones.map((tone, index): React.ReactNode => (
					<div key={tone}>
						<SoundActionButton tone={tone} index={index + 4} />
					</div>
				))}
			</div>
		</div>
	)
}

export default observer(TonesSection)

"use client"

import { observer } from "mobx-react"
import SoundActionButton from "../../../garage/tones-and-demos/tones/tone-action-button"
import useGarageTonesUseEffect from "../../../../hooks/garage/use-effect-garage-tones"
import { CareerType, MeetPipTriggerType, ToneType } from "@actamayev/lever-labs-common-ts/protocol"
import useCareerQuestTrigger from "../../../../hooks/career-quest/use-career-quest-trigger"

interface FunToneWithClasses {
	tone: ToneType
	buttonClasses: string
	shadowColor: string
	iconClasses: string
	iconSize: string
}

function MeetPipS4P4(): React.ReactNode {
	useGarageTonesUseEffect(false)
	useCareerQuestTrigger(
		CareerType.MEET_PIP,
		null,
		MeetPipTriggerType.S4_P4_EXIT,
		{ enterDelayMs: 100, enabled: true }
	)
	const iconSize = "size-16!"
	const tones: FunToneWithClasses[] = [
		{
			tone: ToneType.A,
			buttonClasses: "bg-beak-inner/20 text-beak-inner dark:bg-beak-inner/80 dark:text-standard-background w-32 h-32",
			shadowColor: "rgb(120 70 25)",
			iconClasses: "border-beak-inner/40 dark:border-beak-inner/80 group-active:text-standard-background w-8 h-8 text-sm",
			iconSize
		},
		{
			tone: ToneType.B,
			buttonClasses: "bg-sandbox-orange/20 text-sandbox-orange dark:bg-sandbox-orange/80 dark:text-standard-background w-32 h-32",
			shadowColor: "rgb(255 189 153)",
			iconClasses: "border-sandbox-orange/40 dark:border-sandbox-orange/80 group-active:text-answer-text w-8 h-8 text-sm",
			iconSize
		},
		{
			tone: ToneType.C,
			buttonClasses: "bg-beetle/20 text-beetle dark:bg-beetle/80 dark:text-standard-background w-32 h-32",
			shadowColor: "rgb(200 0 255)",
			iconClasses: "border-beetle/40 dark:border-beetle/80 group-active:text-answer-text w-8 h-8 text-sm",
			iconSize
		},
		{
			tone: ToneType.D,
			buttonClasses: "bg-bee/20 text-bee dark:bg-bee/80 dark:text-standard-background w-32 h-32",
			shadowColor: "rgb(200 200 0)",
			iconClasses: "border-bee/40 dark:border-bee/80 group-active:text-answer-text w-8 h-8 text-sm",
			iconSize
		},
		{
			tone: ToneType.E,
			buttonClasses: "bg-fox/20 text-fox dark:bg-fox/80 dark:text-standard-background w-32 h-32",
			shadowColor: "rgb(200 150 0)",
			iconClasses: "border-fox/40 dark:border-fox/80 group-active:text-answer-text w-8 h-8 text-sm",
			iconSize
		},
		{
			tone: ToneType.F,
			buttonClasses: "bg-macaw/20 text-macaw dark:bg-macaw/80 dark:text-standard-background w-32 h-32",
			shadowColor: "rgb(0 200 255)",
			iconClasses: "border-macaw/40 dark:border-macaw/80 group-active:text-answer-text w-8 h-8 text-sm",
			iconSize
		},
		{
			tone: ToneType.G,
			buttonClasses: "bg-humpback/20 text-humpback dark:bg-humpback/80 dark:text-standard-background w-32 h-32",
			shadowColor: "rgb(20 80 160)",
			iconClasses: "border-humpback/40 dark:border-humpback/80 group-active:text-answer-text w-8 h-8 text-sm",
			iconSize
		}
	]

	// TODO 4/22/25: Make the top button hug the top border and the bottom border hug the bottom border
	return (
		<div className="flex flex-row gap-8">
			<div className="grid grid-cols-4 gap-[21px]">
				{tones.map((tone, index): React.ReactNode => (
					<div key={tone.tone}>
						<SoundActionButton tone={tone.tone} index={index + 1} extraClasses={tone} />
					</div>
				))}
			</div>
		</div>
	)
}

export default observer(MeetPipS4P4)

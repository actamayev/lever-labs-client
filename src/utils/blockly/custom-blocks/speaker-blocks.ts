"use client"

import * as Blockly from "blockly"
import { speakerCategoryColour } from "../../constants/constants"
import { upperFirst } from "lodash-es"
import { SENSOR_TYPES } from "@actamayev/lever-labs-common-ts/types/blockly/sensor"
import { SPEAKER_BLOCK_TYPES } from "@actamayev/lever-labs-common-ts/types/blockly/speaker"

export const speakerBlocks: Record<SPEAKER_BLOCK_TYPES, CustomBlock> = {
	[SPEAKER_BLOCK_TYPES.PLAY_TONE]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Play Tone")
					.appendField(
						new Blockly.FieldDropdown(
							Object.entries(SENSOR_TYPES.TONE_NAMES).map(([key, value]): [string, string] =>
								[upperFirst(key.toLowerCase()), value]
							)
						),
						SPEAKER_BLOCK_TYPES.PLAY_TONE
					)
				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(speakerCategoryColour)
				this.setTooltip("Play a tone")
			},
			keywords: [
				"sound", "play", "music", "audio", "tone", "A", "B", "C", "D", "E", "F", "G", "H"
			]
		},
		generator: (block: Blockly.Block): string => {
			const state = block.getFieldValue(SPEAKER_BLOCK_TYPES.PLAY_TONE)
			// Make the first letter uppercase, rest lowercase
			const upperFirstState = upperFirst(state.toLowerCase())
			return `speaker.play_tone("${upperFirstState}");\n`
		}
	},
}

"use client"

import * as Blockly from "blockly"
import { speakerCategoryColour } from "../../constants/constants"
import { upperFirst } from "lodash-es"
import { SENSOR_TYPES, SoundNameSensorType } from "@lever-labs/common-ts/types/blockly/sensor"
import { SPEAKER_BLOCK_TYPES } from "@lever-labs/common-ts/types/blockly/speaker"

export const speakerBlocks: Record<SPEAKER_BLOCK_TYPES, CustomBlock> = {
	[SPEAKER_BLOCK_TYPES.PLAY_SOUND]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Play Sound")
					.appendField(
						new Blockly.FieldDropdown(
							Object.entries(SENSOR_TYPES.SOUND_NAMES).map(([key, value]): [string, string] =>
								[upperFirst(key.toLowerCase()), value]
							)
						),
						SPEAKER_BLOCK_TYPES.PLAY_SOUND
					)
				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(speakerCategoryColour)
				this.setTooltip("Play a sound")
			},
			keywords: [
				"sound", "play", "music", "audio", "beep", "tone", "noise", "speaker", "volume",
				"chime", "chirp", "pop", "drop", "fart", "monkey", "elephant", "party", "ufo", "countdown", "engine", "robot"
			]
		},
		generator: (block: Blockly.Block): string => {
			const state = block.getFieldValue(SPEAKER_BLOCK_TYPES.PLAY_SOUND) as SoundNameSensorType
			// Make the first letter uppercase, rest lowercase
			const upperFirstState = upperFirst(state.toLowerCase())
			return `play_sound("${upperFirstState}");\n`
		}
	}
}

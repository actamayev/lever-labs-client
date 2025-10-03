"use client"

import { CodingBlock } from "@lever-labs/common-ts/types/learn"
import { LED_BLOCK_TYPES } from "@lever-labs/common-ts/types/blockly/led"
import { SPEAKER_BLOCK_TYPES } from "@lever-labs/common-ts/types/blockly/speaker"

export function getBlockImagePath(codingBlock: CodingBlock): string {
	const blockName = codingBlock.blockName

	// LED blocks: set_led_{color}
	if (blockName === LED_BLOCK_TYPES.CONTROL_ALL_LEDS && codingBlock.ledColor) {
		const color = codingBlock.ledColor.toLowerCase()
		return `/images/learn/turn_led_${color}.png`
	}

	// Speaker tone blocks: play_tone_{tone}
	if (blockName === SPEAKER_BLOCK_TYPES.PLAY_TONE && codingBlock.speakerTone) {
		const tone = codingBlock.speakerTone.toLowerCase()
		return `/images/learn/play_tone_${tone}.png`
	}

	// Speaker sound blocks: play_sound_{sound}
	if (blockName === SPEAKER_BLOCK_TYPES.PLAY_SOUND && codingBlock.speakerTone) {
		const sound = codingBlock.speakerTone.toLowerCase()
		return `/images/learn/play_sound_${sound}.png`
	}

	// Color sensor blocks: check_if_object_{color}
	if (codingBlock.colorSensorDetectionColor) {
		const color = codingBlock.colorSensorDetectionColor.toLowerCase()
		return `/images/learn/check_if_object_${color}.png`
	}

	// Fallback - return a placeholder or log warning
	console.warn(`No image mapping found for block: ${blockName}`, codingBlock)
	return "/learn/placeholder.png"
}

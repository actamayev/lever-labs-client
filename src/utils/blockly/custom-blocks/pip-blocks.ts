import * as Blockly from "blockly"
import { javascriptGenerator, Order } from "blockly/javascript"
import { pipCategory } from "../toolbox-config"
import { PIP_BLOCK_TYPES, LEDSensorType, SENSOR_TYPES, PipBlockNames } from "../block-types"

export const pipBlocks: Record<PipBlockNames, CustomBlock> = {
	[PIP_BLOCK_TYPES.ESP32_LED_CONTROL]: {
		definition: {
			type: PIP_BLOCK_TYPES.ESP32_LED_CONTROL,
			message0: "Turn LED %1",
			args0: [
				{
					type: "field_dropdown",
					name: "STATE",
					options: Object.entries(SENSOR_TYPES.LED).map(([key, value]) =>
                        [key.toLowerCase(), value] as [string, string]
					)
				}
			],
			previousStatement: null,
			nextStatement: null,
			colour: pipCategory.colour,
			tooltip: "Change LED Status"
		},
		generator: (block: Blockly.Block): string => {
			const state = block.getFieldValue("STATE") as LEDSensorType
			return `Digital.write(2, ${state});\n`
		}
	},
	[PIP_BLOCK_TYPES.ESP32_DELAY]: {
		definition: {
			type: PIP_BLOCK_TYPES.ESP32_DELAY,
			message0: "Delay %1 milliseconds",
			args0: [
				{
					type: "field_number",
					name: "DELAY",
					value: 1000,
					min: 0
				}
			],
			previousStatement: null,
			nextStatement: null,
			colour: pipCategory.colour,
			tooltip: "Delay for a certain number of milliseconds"
		},
		generator: (block: Blockly.Block): string => {
			const delay = block.getFieldValue("DELAY")
			return `Timer.delay(${delay});\n`
		}
	},
	[PIP_BLOCK_TYPES.ESP32_LOOP]: {
		definition: {
			type: PIP_BLOCK_TYPES.ESP32_LOOP,
			message0: "Repeat forever %1 %2",
			args0: [
				{
					type: "input_dummy",
					name: "DUMMY"
				},
				{
					type: "input_statement",
					name: "LOOP_BODY"
				}
			],
			previousStatement: null,
			nextStatement: null,
			colour: pipCategory.colour,
			tooltip: "This is a forever loop"
		},
		generator: (block: Blockly.Block): [string, number] => {
			const loopBody = javascriptGenerator.statementToCode(block, "LOOP_BODY")
			return [`Timer.repeat(() => {\n${loopBody}}, 1);\n`, Order.NONE]
		}
	}
}

"use client"

import * as Blockly from "blockly"
import { Order } from "../../order"
import { logicCategoryColour } from "../../../constants/constants"
import getCppGenerator from "../../../cpp/cpp-generator"
import { generateStatementCode } from "../manual-traversal"
import { LOOP_BLOCK_TYPES, LOOP_FIELD_VALUES } from "@actamayev/lever-labs-common-ts/types/blockly/logic"

export const loopBlocks: Record<LOOP_BLOCK_TYPES, CustomBlock> = {
	[LOOP_BLOCK_TYPES.REPEAT]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("repeat")

				this.appendValueInput(LOOP_FIELD_VALUES.REPEAT_TIMES)
					.setCheck("Number")

				this.appendDummyInput()
					.appendField("times")

				this.appendStatementInput(LOOP_FIELD_VALUES.REPEAT_DO)
					.appendField("do")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("Repeat statements a specified number of times")
			},
			keywords: ["repeat", "loop", "iterate", "count", "times", "number", "numeric"]
		},
		generator: (block: Blockly.Block): string => {
			const repeats = getCppGenerator().valueToCode(block, LOOP_FIELD_VALUES.REPEAT_TIMES, Order.ASSIGNMENT) || "0"
			const loopVar = getCppGenerator().nameDB_?.getDistinctName("count", "VARIABLE") || "i"
			const bodyCode = generateStatementCode(block, LOOP_FIELD_VALUES.REPEAT_DO)
			return `for (int ${loopVar} = 0; ${loopVar} < ${repeats}; ${loopVar}++) {\n${bodyCode}}\n`
		}
	},
	[LOOP_BLOCK_TYPES.WAIT]: {
		definition: {
			init: function(this: Blockly.Block): void {
				// Create the text field first so we can reference it
				const secondsField = new Blockly.FieldLabelSerializable("second")

				this.appendDummyInput()
					.appendField("Wait")
					.appendField(
						new Blockly.FieldNumber(1, 0), // value: 1, min: 0
						LOOP_BLOCK_TYPES.WAIT
					)
					.appendField(secondsField, "SECONDS_LABEL")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("Wait for a certain number of seconds")

				// Function to update the seconds label
				const updateSecondsLabel = (newValue: number | string): number | string => {
					const label = newValue === 1 ? "second" : "seconds"
					secondsField.setValue(label)
					return newValue // Return the value unchanged
				}

				// Set validator on the number field
				const numberField = this.getField(LOOP_BLOCK_TYPES.WAIT) as Blockly.FieldNumber
				numberField.setValidator(updateSecondsLabel)

				// Set initial label
				updateSecondsLabel(1)
			},
			keywords: ["wait", "pause", "sleep", "seconds", "time"]
		},
		generator: (block: Blockly.Block): string => {
			const wait = block.getFieldValue(LOOP_BLOCK_TYPES.WAIT)
			return `wait(${wait});\n`
		}
	},
	[LOOP_BLOCK_TYPES.FOREVER_LOOP]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Repeat forever")
				this.appendStatementInput("LOOP_BODY")
					.setCheck(null)
				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("This is a forever loop")
			},
			keywords: ["loop", "repeat", "forever", "infinite", "endless", "continuous"]
		},
		generator: (block: Blockly.Block): string => {
			const bodyCode = generateStatementCode(block, "LOOP_BODY")
			return `while(true) {\n${bodyCode}}\n`
		}
	}
}

"use client"

import * as Blockly from "blockly"
import { Order } from "../../order"
import { logicCategoryColour } from "../../../constants"
import { cppGenerator } from "../../../cpp/cpp-generator"
import { generateStatementCode } from "../manual-traversal"
import { LOGIC_BLOCK_TYPES, LOGIC_FIELD_VALUES, LOOP_BLOCK_TYPES, LoopBlockNames } from "../../block-types/logic-block-types"

export const loopBlocks: Record<LoopBlockNames, CustomBlock> = {
	[LOGIC_BLOCK_TYPES.WHILE_UNTIL]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown([
						["while", "WHILE"],
						["until", "UNTIL"]
					]), LOGIC_FIELD_VALUES.WHILE_MODE)

				this.appendValueInput(LOGIC_FIELD_VALUES.WHILE_BOOL)
					.setCheck("Boolean")

				this.appendStatementInput(LOGIC_FIELD_VALUES.WHILE_DO)
					.appendField("do")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("While/Until a condition is true, do some statements")
			}
		},
		generator: (block: Blockly.Block): string => {
			const until = block.getFieldValue(LOGIC_FIELD_VALUES.WHILE_MODE) === "UNTIL"
			let condition = cppGenerator.valueToCode(block, LOGIC_FIELD_VALUES.WHILE_BOOL, Order.NONE) || "false"
			if (until) {
				condition = `!(${condition})`
			}
			const bodyCode = generateStatementCode(block, LOGIC_FIELD_VALUES.WHILE_DO)
			return `while (${condition}) {\n${bodyCode}}\n`
		}
	},

	[LOGIC_BLOCK_TYPES.REPEAT]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendValueInput(LOGIC_FIELD_VALUES.REPEAT_TIMES)
					.setCheck("Number")
					.appendField("repeat")

				this.appendStatementInput(LOGIC_FIELD_VALUES.REPEAT_DO)
					.appendField("do")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("Repeat some statements")
			}
		},
		generator: (block: Blockly.Block): string => {
			const repeats = cppGenerator.valueToCode(block, LOGIC_FIELD_VALUES.REPEAT_TIMES, Order.ASSIGNMENT) || "0"
			const loopVar = cppGenerator.nameDB_?.getDistinctName("count", "VARIABLE") || "i"
			const bodyCode = generateStatementCode(block, LOGIC_FIELD_VALUES.REPEAT_DO)
			return `for (int ${loopVar} = 0; ${loopVar} < ${repeats}; ${loopVar}++) {\n${bodyCode}}\n`
		}
	},
	[LOOP_BLOCK_TYPES.ESP32_DELAY]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Delay")
					.appendField(
						new Blockly.FieldNumber(1000, 0), // value: 1000, min: 0
						LOOP_BLOCK_TYPES.ESP32_DELAY
					)
					.appendField("milliseconds")
				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("Delay for a certain number of milliseconds")
			}
		},
		generator: (block: Blockly.Block): string => {
			const delay = block.getFieldValue(LOOP_BLOCK_TYPES.ESP32_DELAY)
			return `delay(${delay});\n`  // Changed to standard Arduino delay
		}
	},
	[LOOP_BLOCK_TYPES.ESP32_LOOP]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField("Repeat forever")
				this.appendStatementInput("LOOP_BODY")
					.setCheck(null)
				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("This is a forever loop")
			}
		},
		generator: (block: Blockly.Block): string => {
			const bodyCode = generateStatementCode(block, "LOOP_BODY")
			return `while(true) {\n${bodyCode}}\n`
		}
	}
}

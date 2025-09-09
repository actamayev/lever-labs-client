"use client"

import * as Blockly from "blockly"
import { Order } from "../../order"
import { logicCategoryColour } from "../../../constants/constants"
import { cppGenerator } from "../../../cpp/cpp-generator"
import { generateStatementCode } from "../manual-traversal"
import { LOOP_BLOCK_TYPES, LOOP_FIELD_VALUES } from "@bluedotrobots/common-ts/types/blockly/logic"

export const loopBlocks: Record<LOOP_BLOCK_TYPES, CustomBlock> = {
	// [LOOP_BLOCK_TYPES.WHILE_UNTIL]: {
	// 	definition: {
	// 		init: function(this: Blockly.Block) {
	// 			this.appendDummyInput()
	// 				.appendField(new Blockly.FieldDropdown([
	// 					["while", "WHILE"],
	// 					["until", "UNTIL"]
	// 				]), LOOP_FIELD_VALUES.WHILE_MODE)

	// 			this.appendValueInput(LOOP_FIELD_VALUES.WHILE_BOOL)
	// 				.setCheck("Boolean")

	// 			this.appendStatementInput(LOOP_FIELD_VALUES.WHILE_DO)
	// 				.appendField("do")

	// 			this.setPreviousStatement(true, null)
	// 			this.setNextStatement(true, null)
	// 			this.setColour(logicCategoryColour)
	// 			this.setTooltip("While/Until a condition is true, do some statements")
	// 		}
	// 	},
	// 	generator: (block: Blockly.Block): string => {
	// 		const until = block.getFieldValue(LOOP_FIELD_VALUES.WHILE_MODE) === "UNTIL"
	// 		let condition = cppGenerator.valueToCode(block, LOOP_FIELD_VALUES.WHILE_BOOL, Order.NONE) || "false"
	// 		if (until) {
	// 			condition = `!(${condition})`
	// 		}
	// 		const bodyCode = generateStatementCode(block, LOOP_FIELD_VALUES.WHILE_DO)
	// 		return `while (${condition}) {\n${bodyCode}}\n`
	// 	}
	// },

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
			const repeats = cppGenerator.valueToCode(block, LOOP_FIELD_VALUES.REPEAT_TIMES, Order.ASSIGNMENT) || "0"
			const loopVar = cppGenerator.nameDB_?.getDistinctName("count", "VARIABLE") || "i"
			const bodyCode = generateStatementCode(block, LOOP_FIELD_VALUES.REPEAT_DO)
			return `for (int ${loopVar} = 0; ${loopVar} < ${repeats}; ${loopVar}++) {\n${bodyCode}}\n`
		}
	},
	[LOOP_BLOCK_TYPES.DELAY]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField("Delay")
					.appendField(
						new Blockly.FieldNumber(1000, 0), // value: 1000, min: 0
						LOOP_BLOCK_TYPES.DELAY
					)
					.appendField("milliseconds")
				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("Delay for a certain number of milliseconds")
			},
			keywords: ["delay", "wait", "pause", "sleep", "milliseconds", "time"]
		},
		generator: (block: Blockly.Block): string => {
			const delay = block.getFieldValue(LOOP_BLOCK_TYPES.DELAY)
			return `delay(${delay});\n`  // Changed to standard Arduino delay
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

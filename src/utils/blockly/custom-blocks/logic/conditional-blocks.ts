"use client"

import * as Blockly from "blockly"
import { Order } from "../../order"
import { logicCategoryColour } from "../../../constants"
import { cppGenerator } from "../../../cpp/cpp-generator"
import { generateStatementCode } from "../manual-traversal"
import { LOGIC_BLOCK_TYPES, LOGIC_FIELD_VALUES, ConditionalBlockNames } from "../../block-types/logic-block-types"

export const conditionalBlocks: Record<ConditionalBlockNames, CustomBlock> = {
	[LOGIC_BLOCK_TYPES.IF]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendValueInput(LOGIC_FIELD_VALUES.IF_CONDITION)
					.setCheck("Boolean")
					.appendField("if")

				this.appendStatementInput(LOGIC_FIELD_VALUES.IF_DO)
					.appendField("do")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("If a condition is true, then do some statements")
			}
		},
		generator: (block: Blockly.Block): string => {
			const condition = cppGenerator.valueToCode(block, LOGIC_FIELD_VALUES.IF_CONDITION, Order.NONE) || "false"
			const bodyCode = generateStatementCode(block, LOGIC_FIELD_VALUES.IF_DO)
			return `if (${condition}) {\n${bodyCode}}\n`
		}
	},

	[LOGIC_BLOCK_TYPES.IF_ELSE]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendValueInput(LOGIC_FIELD_VALUES.IF1_CONDITION)
					.setCheck("Boolean")
					.appendField("if")
				this.appendStatementInput(LOGIC_FIELD_VALUES.IF1_DO)
					.appendField("do")
				this.appendStatementInput(LOGIC_FIELD_VALUES.ELSE_DO)
					.appendField("else")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("If-else statement with one condition")
			}
		},
		generator: (block: Blockly.Block): string => {
			const condition = cppGenerator.valueToCode(block, LOGIC_FIELD_VALUES.IF1_CONDITION, Order.NONE) || "false"
			const ifCode = generateStatementCode(block, LOGIC_FIELD_VALUES.IF1_DO)
			const elseCode = generateStatementCode(block, LOGIC_FIELD_VALUES.ELSE_DO)
			return `if (${condition}) {\n${ifCode}} else {\n${elseCode}}\n`
		}
	},

	[LOGIC_BLOCK_TYPES.IF_ELSEIF_ELSE]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendValueInput(LOGIC_FIELD_VALUES.IF1_CONDITION)
					.setCheck("Boolean")
					.appendField("if")
				this.appendStatementInput(LOGIC_FIELD_VALUES.IF1_DO)
					.appendField("do")
				this.appendValueInput(LOGIC_FIELD_VALUES.IF2_CONDITION)
					.setCheck("Boolean")
					.appendField("else if")
				this.appendStatementInput(LOGIC_FIELD_VALUES.IF2_DO)
					.appendField("do")
				this.appendStatementInput(LOGIC_FIELD_VALUES.ELSE_DO)
					.appendField("else")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("If-else statement with two conditions")
			}
		},
		generator: (block: Blockly.Block): string => {
			const condition1 = cppGenerator.valueToCode(block, LOGIC_FIELD_VALUES.IF1_CONDITION, Order.NONE) || "false"
			const condition2 = cppGenerator.valueToCode(block, LOGIC_FIELD_VALUES.IF2_CONDITION, Order.NONE) || "false"
			const if1Code = generateStatementCode(block, LOGIC_FIELD_VALUES.IF1_DO)
			const if2Code = generateStatementCode(block, LOGIC_FIELD_VALUES.IF2_DO)
			const elseCode = generateStatementCode(block, LOGIC_FIELD_VALUES.ELSE_DO)
			return `if (${condition1}) {\n${if1Code}} else if (${condition2}) {\n${if2Code}} else {\n${elseCode}}\n`
		}
	},

	[LOGIC_BLOCK_TYPES.IF_2ELSEIF_ELSE]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendValueInput(LOGIC_FIELD_VALUES.IF1_CONDITION)
					.setCheck("Boolean")
					.appendField("if")
				this.appendStatementInput(LOGIC_FIELD_VALUES.IF1_DO)
					.appendField("do")
				this.appendValueInput(LOGIC_FIELD_VALUES.IF2_CONDITION)
					.setCheck("Boolean")
					.appendField("else if")
				this.appendStatementInput(LOGIC_FIELD_VALUES.IF2_DO)
					.appendField("do")
				this.appendValueInput(LOGIC_FIELD_VALUES.IF3_CONDITION)
					.setCheck("Boolean")
					.appendField("else if")
				this.appendStatementInput(LOGIC_FIELD_VALUES.IF3_DO)
					.appendField("do")
				this.appendStatementInput(LOGIC_FIELD_VALUES.ELSE_DO)
					.appendField("else")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("If-else statement with three conditions")
			}
		},
		generator: (block: Blockly.Block): string => {
			const condition1 = cppGenerator.valueToCode(block, LOGIC_FIELD_VALUES.IF1_CONDITION, Order.NONE) || "false"
			const condition2 = cppGenerator.valueToCode(block, LOGIC_FIELD_VALUES.IF2_CONDITION, Order.NONE) || "false"
			const condition3 = cppGenerator.valueToCode(block, LOGIC_FIELD_VALUES.IF3_CONDITION, Order.NONE) || "false"
			const if1Code = generateStatementCode(block, LOGIC_FIELD_VALUES.IF1_DO)
			const if2Code = generateStatementCode(block, LOGIC_FIELD_VALUES.IF2_DO)
			const if3Code = generateStatementCode(block, LOGIC_FIELD_VALUES.IF3_DO)
			const elseCode = generateStatementCode(block, LOGIC_FIELD_VALUES.ELSE_DO)
			// eslint-disable-next-line max-len
			return `if (${condition1}) {\n${if1Code}} else if (${condition2}) {\n${if2Code}} else if (${condition3}) {\n${if3Code}} else {\n${elseCode}}\n`
		}
	}
}

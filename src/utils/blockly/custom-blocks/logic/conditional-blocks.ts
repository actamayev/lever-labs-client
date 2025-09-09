"use client"

import type * as Blockly from "blockly/core"
import { Order } from "../../order"
import { logicCategoryColour } from "../../../constants/constants"
import getCppGenerator from "../../../cpp/cpp-generator"
import { generateStatementCode } from "../manual-traversal"
import { CONDITIONAL_BLOCK_TYPES, CONDITIONAL_FIELD_VALUES } from "@bluedotrobots/common-ts/types/blockly/logic"

export const conditionalBlocks: Record<CONDITIONAL_BLOCK_TYPES, CustomBlock> = {
	[CONDITIONAL_BLOCK_TYPES.IF]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendValueInput(CONDITIONAL_FIELD_VALUES.IF_CONDITION)
					.setCheck("Boolean")
					.appendField("if")

				this.appendStatementInput(CONDITIONAL_FIELD_VALUES.IF_DO)
					.appendField("do")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("If a condition is true, then do some statements")
			},
			keywords: ["if", "then", "else", "condition", "decision", "branch", "test", "check"]
		},
		generator: (block: Blockly.Block): string => {
			const condition = getCppGenerator().valueToCode(block, CONDITIONAL_FIELD_VALUES.IF_CONDITION, Order.NONE) || "false"
			const bodyCode = generateStatementCode(block, CONDITIONAL_FIELD_VALUES.IF_DO)
			return `if (${condition}) {\n${bodyCode}}\n`
		}
	},

	[CONDITIONAL_BLOCK_TYPES.IF_ELSE]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendValueInput(CONDITIONAL_FIELD_VALUES.IF1_CONDITION)
					.setCheck("Boolean")
					.appendField("if")
				this.appendStatementInput(CONDITIONAL_FIELD_VALUES.IF1_DO)
					.appendField("do")
				this.appendStatementInput(CONDITIONAL_FIELD_VALUES.ELSE_DO)
					.appendField("else")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("If-else statement with one condition")
			},
			keywords: ["if", "else", "condition", "decision", "branch", "test", "check"]
		},
		generator: (block: Blockly.Block): string => {
			const condition = getCppGenerator().valueToCode(block, CONDITIONAL_FIELD_VALUES.IF1_CONDITION, Order.NONE) || "false"
			const ifCode = generateStatementCode(block, CONDITIONAL_FIELD_VALUES.IF1_DO)
			const elseCode = generateStatementCode(block, CONDITIONAL_FIELD_VALUES.ELSE_DO)
			return `if (${condition}) {\n${ifCode}} else {\n${elseCode}}\n`
		}
	},

	[CONDITIONAL_BLOCK_TYPES.IF_ELSEIF_ELSE]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendValueInput(CONDITIONAL_FIELD_VALUES.IF1_CONDITION)
					.setCheck("Boolean")
					.appendField("if")
				this.appendStatementInput(CONDITIONAL_FIELD_VALUES.IF1_DO)
					.appendField("do")
				this.appendValueInput(CONDITIONAL_FIELD_VALUES.IF2_CONDITION)
					.setCheck("Boolean")
					.appendField("else if")
				this.appendStatementInput(CONDITIONAL_FIELD_VALUES.IF2_DO)
					.appendField("do")
				this.appendStatementInput(CONDITIONAL_FIELD_VALUES.ELSE_DO)
					.appendField("else")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("If-else statement with two conditions")
			},
			keywords: ["if", "else", "elseif", "condition", "decision", "branch", "test", "check"]
		},
		generator: (block: Blockly.Block): string => {
			const condition1 = getCppGenerator().valueToCode(block, CONDITIONAL_FIELD_VALUES.IF1_CONDITION, Order.NONE) || "false"
			const condition2 = getCppGenerator().valueToCode(block, CONDITIONAL_FIELD_VALUES.IF2_CONDITION, Order.NONE) || "false"
			const if1Code = generateStatementCode(block, CONDITIONAL_FIELD_VALUES.IF1_DO)
			const if2Code = generateStatementCode(block, CONDITIONAL_FIELD_VALUES.IF2_DO)
			const elseCode = generateStatementCode(block, CONDITIONAL_FIELD_VALUES.ELSE_DO)
			return `if (${condition1}) {\n${if1Code}} else if (${condition2}) {\n${if2Code}} else {\n${elseCode}}\n`
		}
	},

	[CONDITIONAL_BLOCK_TYPES.IF_2ELSEIF_ELSE]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendValueInput(CONDITIONAL_FIELD_VALUES.IF1_CONDITION)
					.setCheck("Boolean")
					.appendField("if")
				this.appendStatementInput(CONDITIONAL_FIELD_VALUES.IF1_DO)
					.appendField("do")
				this.appendValueInput(CONDITIONAL_FIELD_VALUES.IF2_CONDITION)
					.setCheck("Boolean")
					.appendField("else if")
				this.appendStatementInput(CONDITIONAL_FIELD_VALUES.IF2_DO)
					.appendField("do")
				this.appendValueInput(CONDITIONAL_FIELD_VALUES.IF3_CONDITION)
					.setCheck("Boolean")
					.appendField("else if")
				this.appendStatementInput(CONDITIONAL_FIELD_VALUES.IF3_DO)
					.appendField("do")
				this.appendStatementInput(CONDITIONAL_FIELD_VALUES.ELSE_DO)
					.appendField("else")

				this.setPreviousStatement(true, null)
				this.setNextStatement(true, null)
				this.setColour(logicCategoryColour)
				this.setTooltip("If-else statement with three conditions")
			},
			keywords: ["if", "else", "elseif", "condition", "decision", "branch", "test", "check"]
		},
		generator: (block: Blockly.Block): string => {
			const condition1 = getCppGenerator().valueToCode(block, CONDITIONAL_FIELD_VALUES.IF1_CONDITION, Order.NONE) || "false"
			const condition2 = getCppGenerator().valueToCode(block, CONDITIONAL_FIELD_VALUES.IF2_CONDITION, Order.NONE) || "false"
			const condition3 = getCppGenerator().valueToCode(block, CONDITIONAL_FIELD_VALUES.IF3_CONDITION, Order.NONE) || "false"
			const if1Code = generateStatementCode(block, CONDITIONAL_FIELD_VALUES.IF1_DO)
			const if2Code = generateStatementCode(block, CONDITIONAL_FIELD_VALUES.IF2_DO)
			const if3Code = generateStatementCode(block, CONDITIONAL_FIELD_VALUES.IF3_DO)
			const elseCode = generateStatementCode(block, CONDITIONAL_FIELD_VALUES.ELSE_DO)
			// eslint-disable-next-line max-len
			return `if (${condition1}) {\n${if1Code}} else if (${condition2}) {\n${if2Code}} else if (${condition3}) {\n${if3Code}} else {\n${elseCode}}\n`
		}
	}
}

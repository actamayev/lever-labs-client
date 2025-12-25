"use client"

import * as Blockly from "blockly"
import { Order } from "../../order"
import { logicCategoryColour } from "../../../constants/constants"
import getCppGenerator from "../../../cpp/cpp-generator"
import { MATH_BLOCK_TYPES, MATH_FIELD_VALUES } from "@actamayev/lever-labs-common-ts/types/blockly/logic"

export const mathBlocks: Record<MATH_BLOCK_TYPES, CustomBlock> = {
	[MATH_BLOCK_TYPES.COMPARE]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendValueInput(MATH_FIELD_VALUES.COMPARE_A)
					.setCheck(["Number", "String"])

				this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown([
						["=", "EQ"],
						["≠", "NEQ"],
						["<", "LT"],
						["≤", "LTE"],
						[">", "GT"],
						["≥", "GTE"]
					]), MATH_FIELD_VALUES.COMPARE_OP)

				this.appendValueInput(MATH_FIELD_VALUES.COMPARE_B)
					.setCheck(["Number", "String"])

				this.setOutput(true, "Boolean")
				this.setColour(logicCategoryColour)
				this.setTooltip("Compare two values")
			},
			keywords: ["compare", "equal", "not equal", "less than", "less than or equal to", "greater than", "greater than or equal to"]
		},
		generator: (block: Blockly.Block): [string, number] => {
			const OPERATORS: {[key: string]: string} = {
				"EQ": "==",
				"NEQ": "!=",
				"LT": "<",
				"LTE": "<=",
				"GT": ">",
				"GTE": ">="
			}
			const operator = OPERATORS[block.getFieldValue(MATH_FIELD_VALUES.COMPARE_OP)]
			const order = Order.RELATIONAL
			const argument0 = getCppGenerator().valueToCode(block, MATH_FIELD_VALUES.COMPARE_A, order) || "0"
			const argument1 = getCppGenerator().valueToCode(block, MATH_FIELD_VALUES.COMPARE_B, order) || "0"
			return [`${argument0} ${operator} ${argument1}`, order]
		}
	},

	[MATH_BLOCK_TYPES.OPERATION]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendValueInput(MATH_FIELD_VALUES.OPERATION_A)
					.setCheck("Boolean")

				this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown([
						["and", "AND"],
						["or", "OR"]
					]), MATH_FIELD_VALUES.OPERATION_OP)

				this.appendValueInput(MATH_FIELD_VALUES.OPERATION_B)
					.setCheck("Boolean")

				this.setOutput(true, "Boolean")
				this.setColour(logicCategoryColour)
				this.setTooltip("Combine two conditions with AND/OR")
				this.setInputsInline(false)
			},
			keywords: ["and", "or", "combine", "boolean", "logic", "condition"]
		},
		generator: (block: Blockly.Block): [string, number] => {
			const operator = block.getFieldValue(MATH_FIELD_VALUES.OPERATION_OP) === "AND" ? "&&" : "||"
			const order = operator === "&&" ? Order.LOGICAL_AND : Order.LOGICAL_OR
			const argument0 = getCppGenerator().valueToCode(block, MATH_FIELD_VALUES.OPERATION_A, order) || "false"
			const argument1 = getCppGenerator().valueToCode(block, MATH_FIELD_VALUES.OPERATION_B, order) || "false"
			return [`(${argument0}) ${operator} (${argument1})`, order]
		}
	},

	[MATH_BLOCK_TYPES.NEGATE]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendValueInput(MATH_FIELD_VALUES.NEGATE_BOOL)
					.setCheck("Boolean")
					.appendField("not")

				this.setOutput(true, "Boolean")
				this.setColour(logicCategoryColour)
				this.setTooltip("Returns true if the input is false, and false if the input is true")
			},
			keywords: ["not", "negate", "invert", "boolean", "logic", "condition"]
		},
		generator: (block: Blockly.Block): [string, number] => {
			const argument0 = getCppGenerator().valueToCode(block, MATH_FIELD_VALUES.NEGATE_BOOL, Order.LOGICAL_NOT) || "false"
			return [`!${argument0}`, Order.LOGICAL_NOT]
		}
	},

	[MATH_BLOCK_TYPES.NUMBER]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendDummyInput()
					.appendField(new Blockly.FieldNumber(0), MATH_FIELD_VALUES.NUMBER_NUM)
				this.setOutput(true, "Number")
				this.setColour(logicCategoryColour)
				this.setTooltip("A number value")
			},
			keywords: ["number", "integer", "float", "value", "numeric", "math"]
		},
		generator: (block: Blockly.Block): [string, number] => {
			const code = String(Number(block.getFieldValue(MATH_FIELD_VALUES.NUMBER_NUM)))
			return [code, Order.ATOMIC]
		}
	},

	[MATH_BLOCK_TYPES.ARITHMETIC]: {
		definition: {
			init: function(this: Blockly.Block): void {
				this.appendValueInput(MATH_FIELD_VALUES.ARITHMETIC_A)
					.setCheck("Number")

				this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown([
						["+", "ADD"],
						["-", "MINUS"],
						["×", "MULTIPLY"],
						["÷", "DIVIDE"],
						["^", "POWER"]
					]), MATH_FIELD_VALUES.ARITHMETIC_OP)

				this.appendValueInput(MATH_FIELD_VALUES.ARITHMETIC_B)
					.setCheck("Number")

				this.setOutput(true, "Number")
				this.setColour(logicCategoryColour)
				this.setTooltip("Do arithmetic operations")
			},
			keywords: ["math", "arithmetic", "operation", "calculate", "number", "numeric"]
		},
		generator: (block: Blockly.Block): [string, number] => {
			const OPERATORS: {[key: string]: [string, number]} = {
				"ADD": ["+", Order.ADDITION],
				"MINUS": ["-", Order.ADDITION],
				"MULTIPLY": ["*", Order.MULTIPLICATION],
				"DIVIDE": ["/", Order.MULTIPLICATION],
				"POWER": ["pow", Order.FUNCTION_CALL]
			}
			const tuple = OPERATORS[block.getFieldValue(MATH_FIELD_VALUES.ARITHMETIC_OP)]
			const operator = tuple[0]
			const order = tuple[1]
			const argument0 = getCppGenerator().valueToCode(block, MATH_FIELD_VALUES.ARITHMETIC_A, order) || "0"
			const argument1 = getCppGenerator().valueToCode(block, MATH_FIELD_VALUES.ARITHMETIC_B, order) || "0"

			if (operator === "pow") {
				return [`pow(${argument0}, ${argument1})`, Order.FUNCTION_CALL]
			}
			return [`${argument0} ${operator} ${argument1}`, order]
		}
	}
}

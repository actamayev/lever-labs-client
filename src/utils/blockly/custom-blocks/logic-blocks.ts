import * as Blockly from "blockly"
import { Order } from "../order"
import { logicCategory } from "../toolbox-config"
import { cppGenerator } from "../../cpp/cpp-generator"
import { generateStatementCode } from "./manual-traversal"
import { LogicBlockNames, LOGIC_BLOCK_TYPES, LOGIC_FIELD_VALUES } from "../block-types/logic-block-types"

export const logicBlocks: Record<LogicBlockNames, CustomBlock> = {
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
				this.setColour(logicCategory.colour)
				this.setTooltip("If a condition is true, then do some statements")
			}
		},
		generator: (block: Blockly.Block): string => {
			const condition = cppGenerator.valueToCode(block, LOGIC_FIELD_VALUES.IF_CONDITION, Order.NONE) || "false"
			const bodyCode = generateStatementCode(block, LOGIC_FIELD_VALUES.IF_DO)
			return `if (${condition}) {\n${bodyCode}}\n`
		}
	},

	[LOGIC_BLOCK_TYPES.COMPARE]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendValueInput(LOGIC_FIELD_VALUES.COMPARE_A)
					.setCheck(["Number", "String"])

				this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown([
						["=", "EQ"],
						["≠", "NEQ"],
						["<", "LT"],
						["≤", "LTE"],
						[">", "GT"],
						["≥", "GTE"]
					]), LOGIC_FIELD_VALUES.COMPARE_OP)

				this.appendValueInput(LOGIC_FIELD_VALUES.COMPARE_B)
					.setCheck(["Number", "String"])

				this.setOutput(true, "Boolean")
				this.setColour(logicCategory.colour)
				this.setTooltip("Compare two values")
			}
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
			const operator = OPERATORS[block.getFieldValue(LOGIC_FIELD_VALUES.COMPARE_OP)]
			const order = Order.RELATIONAL
			const argument0 = cppGenerator.valueToCode(block, LOGIC_FIELD_VALUES.COMPARE_A, order) || "0"
			const argument1 = cppGenerator.valueToCode(block, LOGIC_FIELD_VALUES.COMPARE_B, order) || "0"
			return [`${argument0} ${operator} ${argument1}`, order]
		}
	},

	[LOGIC_BLOCK_TYPES.OPERATION]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendValueInput(LOGIC_FIELD_VALUES.OPERATION_A)
					.setCheck("Boolean")

				this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown([
						["and", "AND"],
						["or", "OR"]
					]), LOGIC_FIELD_VALUES.OPERATION_OP)

				this.appendValueInput(LOGIC_FIELD_VALUES.OPERATION_B)
					.setCheck("Boolean")

				this.setOutput(true, "Boolean")
				this.setColour(logicCategory.colour)
				this.setTooltip("Combine two conditions with AND/OR")
			}
		},
		generator: (block: Blockly.Block): [string, number] => {
			const operator = block.getFieldValue(LOGIC_FIELD_VALUES.OPERATION_OP) === "AND" ? "&&" : "||"
			const order = operator === "&&" ? Order.LOGICAL_AND : Order.LOGICAL_OR
			const argument0 = cppGenerator.valueToCode(block, LOGIC_FIELD_VALUES.OPERATION_A, order) || "false"
			const argument1 = cppGenerator.valueToCode(block, LOGIC_FIELD_VALUES.OPERATION_B, order) || "false"
			return [`${argument0} ${operator} ${argument1}`, order]
		}
	},

	[LOGIC_BLOCK_TYPES.NEGATE]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendValueInput(LOGIC_FIELD_VALUES.NEGATE_BOOL)
					.setCheck("Boolean")
					.appendField("not")

				this.setOutput(true, "Boolean")
				this.setColour(logicCategory.colour)
				this.setTooltip("Returns true if the input is false, and false if the input is true")
			}
		},
		generator: (block: Blockly.Block): [string, number] => {
			const argument0 = cppGenerator.valueToCode(block, LOGIC_FIELD_VALUES.NEGATE_BOOL, Order.LOGICAL_NOT) || "false"
			return [`!${argument0}`, Order.LOGICAL_NOT]
		}
	},

	[LOGIC_BLOCK_TYPES.NUMBER]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendDummyInput()
					.appendField(new Blockly.FieldNumber(0), LOGIC_FIELD_VALUES.NUMBER_NUM)
				this.setOutput(true, "Number")
				this.setColour(logicCategory.colour)
				this.setTooltip("A number value")
			}
		},
		generator: (block: Blockly.Block): [string, number] => {
			const code = String(Number(block.getFieldValue(LOGIC_FIELD_VALUES.NUMBER_NUM)))
			return [code, Order.ATOMIC]
		}
	},

	[LOGIC_BLOCK_TYPES.ARITHMETIC]: {
		definition: {
			init: function(this: Blockly.Block) {
				this.appendValueInput(LOGIC_FIELD_VALUES.ARITHMETIC_A)
					.setCheck("Number")

				this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown([
						["+", "ADD"],
						["-", "MINUS"],
						["×", "MULTIPLY"],
						["÷", "DIVIDE"],
						["^", "POWER"]
					]), LOGIC_FIELD_VALUES.ARITHMETIC_OP)

				this.appendValueInput(LOGIC_FIELD_VALUES.ARITHMETIC_B)
					.setCheck("Number")

				this.setOutput(true, "Number")
				this.setColour(logicCategory.colour)
				this.setTooltip("Do arithmetic operations")
			}
		},
		generator: (block: Blockly.Block): [string, number] => {
			const OPERATORS: {[key: string]: [string, number]} = {
				"ADD": ["+", Order.ADDITION],
				"MINUS": ["-", Order.ADDITION],
				"MULTIPLY": ["*", Order.MULTIPLICATION],
				"DIVIDE": ["/", Order.MULTIPLICATION],
				"POWER": ["pow", Order.FUNCTION_CALL]
			}
			const tuple = OPERATORS[block.getFieldValue(LOGIC_FIELD_VALUES.ARITHMETIC_OP)]
			const operator = tuple[0]
			const order = tuple[1]
			const argument0 = cppGenerator.valueToCode(block, LOGIC_FIELD_VALUES.ARITHMETIC_A, order) || "0"
			const argument1 = cppGenerator.valueToCode(block, LOGIC_FIELD_VALUES.ARITHMETIC_B, order) || "0"

			if (operator === "pow") {
				return [`pow(${argument0}, ${argument1})`, Order.FUNCTION_CALL]
			}
			return [`${argument0} ${operator} ${argument1}`, order]
		}
	},

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
				this.setColour(logicCategory.colour)
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
				this.setColour(logicCategory.colour)
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
	[LOGIC_BLOCK_TYPES.MATH_SINGLE]: {
		definition: {
			init: function(this: Blockly.Block) {
				const OPERATORS: [string, string][] = [
					["-", "NEG"],
					["abs", "ABS"],
					["√", "ROOT"],
					["ln", "LN"],
					["e^", "EXP"],
					["10^", "POW10"],
					["round", "ROUND"],
					["ceil", "ROUNDUP"],
					["floor", "ROUNDDOWN"],
					["sin", "SIN"],
					["cos", "COS"],
					["tan", "TAN"]
				]

				this.appendValueInput("NUM")
					.setCheck("Number")
					.appendField(new Blockly.FieldDropdown(OPERATORS), "OP")

				this.setOutput(true, "Number")
				this.setColour(logicCategory.colour)
				this.setTooltip("Apply a math function to a number")
			}
		},
		// eslint-disable-next-line complexity
		generator: (block: Blockly.Block): [string, number] => {
			const operator = block.getFieldValue("OP")
			const arg = cppGenerator.valueToCode(block, "NUM", Order.NONE) || "0"

			switch (operator) {
			case "NEG":
				return [`-${arg}`, Order.UNARY_MINUS]
			case "ABS":
				return [`abs(${arg})`, Order.FUNCTION_CALL]
			case "ROOT":
				return [`sqrt(${arg})`, Order.FUNCTION_CALL]
			case "LN":
				return [`log(${arg})`, Order.FUNCTION_CALL]
			case "EXP":
				return [`exp(${arg})`, Order.FUNCTION_CALL]
			case "POW10":
				return [`pow(10, ${arg})`, Order.FUNCTION_CALL]
			case "ROUND":
				return [`round(${arg})`, Order.FUNCTION_CALL]
			case "ROUNDUP":
				return [`ceil(${arg})`, Order.FUNCTION_CALL]
			case "ROUNDDOWN":
				return [`floor(${arg})`, Order.FUNCTION_CALL]
			case "SIN":
				return [`sin(${arg})`, Order.FUNCTION_CALL]
			case "COS":
				return [`cos(${arg})`, Order.FUNCTION_CALL]
			case "TAN":
				return [`tan(${arg})`, Order.FUNCTION_CALL]
			default:
				throw new Error("Unknown math operator: " + operator)
			}
		}
	},
	// Add these to your logicBlocks object in logic-blocks.ts

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
				this.setColour(logicCategory.colour)
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
				this.setColour(logicCategory.colour)
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
				this.setColour(logicCategory.colour)
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

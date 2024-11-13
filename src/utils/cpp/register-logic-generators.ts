/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Blockly from "blockly"
import { Order } from "../blockly/order"
import { CppGenerator } from "./cpp-generator"

// eslint-disable-next-line max-lines-per-function
export default function registerLogicGenerators(generator: CppGenerator): void {
	// controls_if
	generator.forBlock["controls_if"] = function(this: CppGenerator, block: Blockly.Block): string {
		let code = ""
		let condition = this.valueToCode(block, "IF0", Order.NONE) || "false"
		let branch = this.statementToCode(block, "DO0")

		code += `if (${condition}) {\n${branch}}`

		// Handle else-if and else cases
		const elseifCount = (block as any).elseifCount_ || 0
		const elseCount = (block as any).elseCount_ || 0

		for (let i = 1; i <= elseifCount; i++) {
			condition = this.valueToCode(block, "IF" + i, Order.NONE) || "false"
			branch = this.statementToCode(block, "DO" + i)
			code += ` else if (${condition}) {\n${branch}}`
		}

		if (elseCount) {
			branch = this.statementToCode(block, "ELSE")
			code += ` else {\n${branch}}`
		}

		return code + "\n"
	}

	// logic_compare
	generator.forBlock["logic_compare"] = function(this: CppGenerator, block: Blockly.Block): [string, number] {
		const OPERATORS: {[key: string]: string} = {
			"EQ": "==",
			"NEQ": "!=",
			"LT": "<",
			"LTE": "<=",
			"GT": ">",
			"GTE": ">="
		}
		const operator = OPERATORS[block.getFieldValue("OP")]
		const order = Order.RELATIONAL
		const argument0 = this.valueToCode(block, "A", order) || "0"
		const argument1 = this.valueToCode(block, "B", order) || "0"

		return [`${argument0} ${operator} ${argument1}`, order]
	}

	// logic_operation
	generator.forBlock["logic_operation"] = function(this: CppGenerator, block: Blockly.Block): [string, number] {
		const operator = block.getFieldValue("OP") === "AND" ? "&&" : "||"
		const order = operator === "&&" ? Order.LOGICAL_AND : Order.LOGICAL_OR
		const argument0 = this.valueToCode(block, "A", order) || "false"
		const argument1 = this.valueToCode(block, "B", order) || "false"

		return [`${argument0} ${operator} ${argument1}`, order]
	}

	// logic_negate
	generator.forBlock["logic_negate"] = function(this: CppGenerator, block: Blockly.Block): [string, number] {
		const argument0 = this.valueToCode(block, "BOOL", Order.LOGICAL_NOT) || "false"
		return [`!${argument0}`, Order.LOGICAL_NOT]
	}

	// math_number
	generator.forBlock["math_number"] = function(this: CppGenerator, block: Blockly.Block): [string, number] {
		const code = String(Number(block.getFieldValue("NUM")))
		return [code, Order.ATOMIC]
	}

	// math_arithmetic
	generator.forBlock["math_arithmetic"] = function(this: CppGenerator, block: Blockly.Block): [string, number] {
		const OPERATORS: {[key: string]: [string, number]} = {
			"ADD": ["+", Order.ADDITION],
			"MINUS": ["-", Order.ADDITION],      // Using ADDITION for subtraction as they have same precedence
			"MULTIPLY": ["*", Order.MULTIPLICATION],
			"DIVIDE": ["/", Order.MULTIPLICATION],
			"POWER": ["pow", Order.FUNCTION_CALL]
		}
		const tuple = OPERATORS[block.getFieldValue("OP")]
		const operator = tuple[0]
		const order = tuple[1]
		const argument0 = this.valueToCode(block, "A", order) || "0"
		const argument1 = this.valueToCode(block, "B", order) || "0"

		if (operator === "pow") {
			return [`pow(${argument0}, ${argument1})`, Order.FUNCTION_CALL]
		}
		return [`${argument0} ${operator} ${argument1}`, order]
	}

	// math_single
	// eslint-disable-next-line complexity
	generator.forBlock["math_single"] = function(this: CppGenerator, block: Blockly.Block): [string, number] {
		const operator = block.getFieldValue("OP")
		const arg = this.valueToCode(block, "NUM", Order.NONE) || "0"

		switch (operator) {
		case "NEG":
			return [`-${arg}`, Order.UNARY_MINUS]  // Changed from UNARY_NEGATION to UNARY_MINUS
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

	// math_constrain
	generator.forBlock["math_constrain"] = function(this: CppGenerator, block: Blockly.Block): [string, number] {
		const value = this.valueToCode(block, "VALUE", Order.NONE) || "0"
		const low = this.valueToCode(block, "LOW", Order.NONE) || "0"
		const high = this.valueToCode(block, "HIGH", Order.NONE) || "0"
		return [`constrain(${value}, ${low}, ${high})`, Order.FUNCTION_CALL]
	}

	// controls_whileUntil
	generator.forBlock["controls_whileUntil"] = function(this: CppGenerator, block: Blockly.Block): string {
		const until = block.getFieldValue("MODE") === "UNTIL"
		let condition = this.valueToCode(block, "BOOL", Order.NONE) || "false"
		const branch = this.statementToCode(block, "DO")

		if (until) {
			condition = `!(${condition})`
		}

		return `while (${condition}) {\n${branch}}\n`
	}

	// controls_repeat_ext
	generator.forBlock["controls_repeat_ext"] = function(this: CppGenerator, block: Blockly.Block): string {
		let repeats
		if (block.getField("TIMES")) {
			repeats = String(Number(block.getFieldValue("TIMES")))
		} else {
			repeats = this.valueToCode(block, "TIMES", Order.ASSIGNMENT) || "0"
		}
		const branch = this.statementToCode(block, "DO")
		const loopVar = (this as any).nameDB_?.getDistinctName("count", "VARIABLE") || "i"

		return `for (int ${loopVar} = 0; ${loopVar} < ${repeats}; ${loopVar}++) {\n${branch}}\n`
	}
}

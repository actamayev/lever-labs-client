/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Blockly from "blockly/core"

export class CppGenerator extends Blockly.Generator {
	// Define the order constants as class properties
	ORDER_ATOMIC: number
	ORDER_FUNCTION_CALL: number
	ORDER_MEMBER: number
	ORDER_UNARY_POSTFIX: number
	ORDER_UNARY_PREFIX: number
	ORDER_MULTIPLICATIVE: number
	ORDER_ADDITIVE: number
	ORDER_RELATIONAL: number
	ORDER_EQUALITY: number
	ORDER_LOGICAL_AND: number
	ORDER_LOGICAL_OR: number
	ORDER_NONE: number

	constructor() {
		super("CPP")

		// Initialize settings
		this.INDENT = "    " // 4 spaces for indentation

		// Define precedence
		this.ORDER_ATOMIC = 0
		this.ORDER_FUNCTION_CALL = 1
		this.ORDER_MEMBER = 2
		this.ORDER_UNARY_POSTFIX = 3
		this.ORDER_UNARY_PREFIX = 4
		this.ORDER_MULTIPLICATIVE = 5
		this.ORDER_ADDITIVE = 6
		this.ORDER_RELATIONAL = 7
		this.ORDER_EQUALITY = 8
		this.ORDER_LOGICAL_AND = 9
		this.ORDER_LOGICAL_OR = 10
		this.ORDER_NONE = 99

		this.forBlock["math_number"] = this.generateMathNumber
		this.forBlock["controls_if"] = this.generateIf
		this.forBlock["controls_whileUntil"] = this.generateWhile
		this.forBlock["controls_for"] = this.generateFor
		this.forBlock["controls_whileUntil"] = this.generateWhile
		this.forBlock["logic_compare"] = this.generateCompare
	}

	workspaceToCode(workspace: Blockly.WorkspaceSvg): string {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!workspace) return ""

		let code = "#include <iostream>\n\n"
		code += "int main() {\n"

		const blocks = workspace.getTopBlocks(true)
		for (const block of blocks) {
			const blockCode = this.blockToCode(block)
			if (Array.isArray(blockCode)) {
				code += this.INDENT + blockCode[0] + "\n"
			} else if (blockCode) {
				code += this.INDENT + blockCode + "\n"
			}
		}

		code += this.INDENT + "return 0;\n"
		code += "}\n"

		return code
	}

	// Generator function for if statements
	protected generateIf(block: Blockly.Block): string {
		let code = ""
		let condition = this.valueToCode(block, "IF0", this.ORDER_NONE) || "false"
		let branch = this.statementToCode(block, "DO0")

		code += "if (" + condition + ") {\n"
		code += branch
		code += "}"

		// Handle else-if and else cases
		const elseifCount = (block as any).elseifCount_ || 0
		const elseCount = (block as any).elseCount_ || 0

		for (let i = 1; i <= elseifCount; i++) {
			condition = this.valueToCode(block, "IF" + i, this.ORDER_NONE) || "false"
			branch = this.statementToCode(block, "DO" + i)
			code += " else if (" + condition + ") {\n"
			code += branch
			code += "}"
		}

		if (elseCount) {
			branch = this.statementToCode(block, "ELSE")
			code += " else {\n"
			code += branch
			code += "}"
		}

		return code + "\n"
	}

	// Generator function for while loop
	protected generateWhile(block: Blockly.Block): string {
		const until = block.getFieldValue("MODE") === "UNTIL"
		let condition = this.valueToCode(block, "BOOL", this.ORDER_NONE) || "false"
		const branch = this.statementToCode(block, "DO")

		if (until) {
			condition = "!(" + condition + ")"
		}

		return "while (" + condition + ") {\n" + branch + "}\n"
	}

	// Generator function for for loop
	protected generateFor(block: Blockly.Block): string {
		const variable = (this as any).nameDB_.getName(
			block.getFieldValue("VAR"),
			Blockly.VARIABLE_CATEGORY_NAME
		)
		const from = this.valueToCode(block, "FROM", this.ORDER_NONE) || "0"
		const to = this.valueToCode(block, "TO", this.ORDER_NONE) || "0"
		const by = this.valueToCode(block, "BY", this.ORDER_NONE) || "1"
		const branch = this.statementToCode(block, "DO")

		let code = "for (int " + variable + " = " + from + "; "
		code += variable + (Number(by) >= 0 ? " <= " : " >= ") + to + "; "
		code += variable
		if (by === "1") {
			code += "++"
		} else if (by === "-1") {
			code += "--"
		} else {
			code += " += " + by
		}
		code += ") {\n" + branch + "}\n"

		return code
	}

	// Generator function for comparison blocks
	protected generateCompare(block: Blockly.Block): [string, number] {
		const OPERATORS: {[key: string]: string} = {
			"EQ": "==",
			"NEQ": "!=",
			"LT": "<",
			"LTE": "<=",
			"GT": ">",
			"GTE": ">="
		}
		const operator = OPERATORS[block.getFieldValue("OP")]
		const order = this.ORDER_RELATIONAL
		const argument0 = this.valueToCode(block, "A", order) || "0"
		const argument1 = this.valueToCode(block, "B", order) || "0"

		return [argument0 + " " + operator + " " + argument1, order]
	}

	// Generator function for number blocks
	protected generateMathNumber(block: Blockly.Block): [string, number] {
		const code = String(block.getFieldValue("NUM"))
		return [code, this.ORDER_ATOMIC]
	}
}

// Create and export a singleton instance
export const cppGenerator = new CppGenerator()

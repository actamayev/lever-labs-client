/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Blockly from "blockly/core"
import { Order } from "../blockly/order"

export class CppGenerator extends Blockly.Generator {
	constructor() {
		// Call the parent constructor
		super("CPP")

		// Initialize settings
		this.INDENT = "    " // 4 spaces for indentation
	}

	workspaceToCode(workspace: Blockly.WorkspaceSvg): string {
		if (!workspace) return ""

		let code = "#include <iostream>\n\n"
		code += "int main() {\n"

		// eslint-disable-next-line complexity
		const processBlock = (block: Blockly.Block, depth: number = 0): void => {
			// Debug logging
			console.log(`Processing block at depth ${depth}:`, {
				type: block.type,
				id: block.id,
				outputConnection: block.outputConnection ? "has output" : "no output",
				previousConnection: block.previousConnection ? "has previous" : "no previous",
				nextConnection: block.nextConnection ? "has next" : "no next",
				parentBlock: block.getParent() ? block.getParent()?.type : "no parent",
				inputWithBlock: block.getParent()?.getInputWithBlock(block)?.name
			})

			// Skip if this block is a statement input to another block
			const parentInput = block.getParent()?.getInputWithBlock(block)
			if (parentInput && parentInput.name === "LOOP_BODY") {
				console.log("Skipping block in loop body:", block.type)
				return
			}

			// Skip if this block is being used as a value
			if (block.outputConnection && block.outputConnection.isConnected()) {
				console.log("Skipping value block:", block.type)
				return
			}

			// Generate code for the current block
			const blockCode = this.blockToCode(block)
			if (Array.isArray(blockCode)) {
				code += this.INDENT + blockCode[0] + "\n"
			} else if (blockCode) {
				code += this.INDENT + blockCode
			}
		}

		// Start with top-level blocks
		const blocks = workspace.getTopBlocks(true)
		console.log("Top level blocks:", blocks.length)
		for (const block of blocks) {
			processBlock(block, 0)
		}

		code += this.INDENT + "return 0;\n"
		code += "}\n"

		return code
	}

	// Initialize block generators
	init(): void {
		// Math number block
		this.forBlock["math_number"] = function(this: CppGenerator, block: Blockly.Block): [string, number] {
			const code = String(block.getFieldValue("NUM"))
			return [code, Order.ATOMIC]
		}

		// Controls if block
		this.forBlock["controls_if"] = function(this: CppGenerator, block: Blockly.Block): string {
			let code = ""
			let condition = this.valueToCode(block, "IF0", Order.NONE) || "false"
			let branch = this.statementToCode(block, "DO0")

			code += "if (" + condition + ") {\n"
			code += branch
			code += "}"

			// Handle else-if and else cases
			const elseifCount = (block as any).elseifCount_ || 0
			const elseCount = (block as any).elseCount_ || 0

			for (let i = 1; i <= elseifCount; i++) {
				condition = this.valueToCode(block, "IF" + i, Order.NONE) || "false"
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

		// Logic compare block
		this.forBlock["logic_compare"] = function(this: CppGenerator, block: Blockly.Block): [string, number] {
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

			return [argument0 + " " + operator + " " + argument1, order]
		}

		// Logic operation block
		this.forBlock["logic_operation"] = function(this: CppGenerator, block: Blockly.Block): [string, number] {
			const operator = block.getFieldValue("OP") === "AND" ? "&&" : "||"
			const order = operator === "&&" ? Order.LOGICAL_AND : Order.LOGICAL_OR
			const argument0 = this.valueToCode(block, "A", order) || "false"
			const argument1 = this.valueToCode(block, "B", order) || "false"

			return [argument0 + " " + operator + " " + argument1, order]
		}

		// While until block
		this.forBlock["controls_whileUntil"] = function(this: CppGenerator, block: Blockly.Block): string {
			const until = block.getFieldValue("MODE") === "UNTIL"
			let condition = this.valueToCode(block, "BOOL", Order.NONE) || "false"
			const branch = this.statementToCode(block, "DO")

			if (until) {
				condition = "!(" + condition + ")"
			}

			return "while (" + condition + ") {\n" + branch + "}\n"
		}

		// Repeat block
		this.forBlock["controls_repeat_ext"] = function(this: CppGenerator, block: Blockly.Block): string {
			let repeats
			if (block.getField("TIMES")) {
				repeats = String(Number(block.getFieldValue("TIMES")))
			} else {
				repeats = this.valueToCode(block, "TIMES", Order.ASSIGNMENT) || "0"
			}

			let branch = this.statementToCode(block, "DO")
			branch = this.addLoopTrap(branch, block)
			const loopVar = (this as any).nameDB_?.getDistinctName("count", "VARIABLE") || "i"

			return `for (int ${loopVar} = 0; ${loopVar} < ${repeats}; ${loopVar}++) {\n${branch}}\n`
		}
	}
}

// Create and export a singleton instance
export const cppGenerator = new CppGenerator()
cppGenerator.init()  // Initialize all block generators

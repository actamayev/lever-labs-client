/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Blockly from "blockly/core"
import registerLogicGenerators from "./register-logic-generators"

export class CppGenerator extends Blockly.Generator {
	constructor() {
		// Call the parent constructor
		super("CPP")

		// Initialize settings
		this.INDENT = "    " // 4 spaces for indentation
	}

	workspaceToCode(workspace: Blockly.WorkspaceSvg): string {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
				parentInput: block.getParent()?.getInputWithBlock(block)?.name
			})

			// Skip if this block is inside a loop body
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

			// Process next block in the sequence if it exists
			const nextBlock = block.getNextBlock()
			if (nextBlock) {
				processBlock(nextBlock, depth)
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
}

// Create and export a singleton instance
export const cppGenerator = new CppGenerator()
registerLogicGenerators(cppGenerator)

"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Blockly from "blockly/core"

export class CppGenerator extends Blockly.Generator {
	constructor() {
		// Call the parent constructor
		super("CPP")

		// Initialize settings
		this.INDENT = "    " // 4 spaces for indentation
	}

	generateBlockSequence(firstBlock: Blockly.Block | null): string {
		let code = ""
		let currentBlock = firstBlock

		while (currentBlock) {
			const blockCode = this.blockToCode(currentBlock)
			if (Array.isArray(blockCode)) {
				// code += this.INDENT + blockCode[0] + "\n"
				code += blockCode[0] + "\n"

			} else if (blockCode) {
				// code += this.INDENT + blockCode
				code += blockCode
			}
			currentBlock = currentBlock.getNextBlock()
		}

		return code
	}

	workspaceToCode(workspace: Blockly.WorkspaceSvg): string {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!workspace) return ""

		let code = ""
		// let code = "#include <iostream>\n\n"
		// code += "int main() {\n"

		// Generate code for top-level blocks
		const blocks = workspace.getTopBlocks(true)
		for (const block of blocks) {
			code += this.generateBlockSequence(block)
		}

		// code += this.INDENT + "return 0;\n"
		// code += "}\n"

		return code
	}
}

// Create and export a singleton instance
export const cppGenerator = new CppGenerator()

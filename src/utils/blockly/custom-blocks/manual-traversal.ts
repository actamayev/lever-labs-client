import * as Blockly from "blockly"
import { cppGenerator } from "../../cpp/cpp-generator"

export function generateStatementCode(
	block: Blockly.Block,
	inputName: string
): string {
	const input = block.getInput(inputName)
	const firstBlock = input?.connection?.targetBlock()
	let bodyCode = ""

	if (firstBlock) {
		let currentBlock: Blockly.Block | null = firstBlock
		while (currentBlock) {
			const code = cppGenerator.blockToCode(currentBlock)
			if (Array.isArray(code)) {
				// Add additional indentation for each line
				bodyCode += code[0].split("\n")
					.map(line => line ? cppGenerator.INDENT + line : line)
					.join("\n") + "\n"
			} else if (code) {
				// Add additional indentation for each line
				bodyCode += code.split("\n")
					.map(line => line ? cppGenerator.INDENT + line : line)
					.join("\n")
			}
			currentBlock = currentBlock.getNextBlock()
		}
	}

	return bodyCode || "\n"
}

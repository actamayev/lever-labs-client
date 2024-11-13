import * as Blockly from "blockly"
import { CppGenerator } from "../../cpp/cpp-generator"

export function generateStatementCode(
	block: Blockly.Block,
	inputName: string,
	generator: CppGenerator
): string {
	const input = block.getInput(inputName)
	const firstBlock = input?.connection?.targetBlock()
	let bodyCode = ""

	if (firstBlock) {
		let currentBlock: Blockly.Block | null = firstBlock
		while (currentBlock) {
			const code = generator.blockToCode(currentBlock)
			if (Array.isArray(code)) {
				bodyCode += generator.INDENT + code[0] + "\n"
			} else if (code) {
				bodyCode += generator.INDENT + code
			}
			currentBlock = currentBlock.getNextBlock()
		}
	}

	return bodyCode || generator.INDENT + "\n"
}

"use client"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import type * as Blockly from "blockly/core"
import initializeBlocks from "../blockly/initialize-blocks"

class CppGenerator {
	private generator: Blockly.Generator | null = null
	public areBlocksInitialized: boolean = false

	public async ensureInitialized(): Promise<Blockly.Generator> {
		if (!this.generator) {
			const BlocklyCore = await import("blockly/core")
			this.generator = new BlocklyCore.Generator("CPP")
			this.generator.INDENT = "    " // 4 spaces for indentation
		}
		return this.generator
	}

	// Synchronous access for block generators (throws if not initialized)
	public getGeneratorSync(): Blockly.Generator {
		if (!this.generator) {
			throw new Error("CppGenerator not initialized. Call ensureInitialized() first.")
		}
		return this.generator
	}

	// For Blockly block generators that need synchronous access
	public valueToCode(block: Blockly.Block, name: string, order: number): string {
		return this.getGeneratorSync().valueToCode(block, name, order)
	}

	public statementToCode(block: Blockly.Block, name: string): string {
		return this.getGeneratorSync().statementToCode(block, name)
	}

	public blockToCode(block: Blockly.Block): string | [string, number] {
		return this.getGeneratorSync().blockToCode(block)
	}

	public get INDENT(): string {
		return this.getGeneratorSync().INDENT
	}

	public get nameDB_(): Blockly.Names | undefined {
		return this.getGeneratorSync().nameDB_
	}

	private generateBlockSequence(firstBlock: Blockly.Block, generator: Blockly.Generator): string {
		let code = ""
		let currentBlock: Blockly.Block | null = firstBlock

		while (currentBlock) {
			const blockCode = generator.blockToCode(currentBlock)
			if (Array.isArray(blockCode)) {
				code += blockCode[0] + "\n"

			} else if (blockCode) {
				code += blockCode
			}
			currentBlock = currentBlock.getNextBlock()
		}

		return code
	}

	public async workspaceToCode(workspace: Blockly.WorkspaceSvg): Promise<string> {

		if (!workspace) return ""

		const generator = await this.ensureInitialized()
		let code = ""

		// Generate code for top-level blocks
		const blocks = workspace.getTopBlocks(true)
		for (const block of blocks) {
			code += this.generateBlockSequence(block, generator)
		}

		return code
	}

	public async generateCppFromJson(blocklyJson: BlocklyJson): Promise<string> {
		// Dynamically import Blockly only when needed
		const Blockly = await import("blockly")

		// Ensure blocks are initialized
		await initializeBlocks()

		// Create a temporary workspace
		const tempWorkspace = new Blockly.Workspace()

		// Load the JSON into the workspace
		if (Object.keys(blocklyJson).length > 0) {
			Blockly.serialization.workspaces.load(blocklyJson, tempWorkspace)
		}

		// Get the cpp generator and generate code
		const cppCode = await getCppGenerator().workspaceToCode(tempWorkspace as Blockly.WorkspaceSvg)

		// Clean up the temporary workspace
		tempWorkspace.dispose()

		return cppCode
	}
}

let getCppGeneratorInstance: CppGenerator | null = null

export default function getCppGenerator(): CppGenerator {
	if (!getCppGeneratorInstance) {
		getCppGeneratorInstance = new CppGenerator()
	}
	return getCppGeneratorInstance
}

import * as Blockly from "blockly"
import { BlocklyJson } from "@bluedotrobots/common-ts"
import { cppGenerator } from "./cpp-generator"
import initializeBlocks from "../blockly/initialize-blocks"

export default function generateCppFromJson(blocklyJson: BlocklyJson): string {
	try {
		// Ensure blocks are initialized
		initializeBlocks()

		// Create a temporary workspace
		const tempWorkspace = new Blockly.Workspace()

		// Load the JSON into the workspace
		if (Object.keys(blocklyJson).length > 0) {
			Blockly.serialization.workspaces.load(blocklyJson, tempWorkspace)
		}

		// Generate C++ code from the workspace
		const cppCode = cppGenerator.workspaceToCode(tempWorkspace as Blockly.WorkspaceSvg)

		// Clean up the temporary workspace
		tempWorkspace.dispose()

		return cppCode
	} catch (error) {
		console.error("Error generating C++ code from Blockly JSON:", error)
		return ""
	}
}

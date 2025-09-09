// "use client"

// import type * as Blockly from "blockly/core"
// import { BlocklyJson } from "@bluedotrobots/common-ts/types/sandbox"
// import { getCppGenerator } from "./cpp-generator"
// import initializeBlocks from "../blockly/initialize-blocks"

// export default async function generateCppFromJson(blocklyJson: BlocklyJson): Promise<string> {
// 	try {
// 		// Dynamically import Blockly only when needed
// 		const Blockly = await import("blockly")

// 		// Ensure blocks are initialized
// 		await initializeBlocks()

// 		// Create a temporary workspace
// 		const tempWorkspace = new Blockly.Workspace()

// 		// Load the JSON into the workspace
// 		if (Object.keys(blocklyJson).length > 0) {
// 			Blockly.serialization.workspaces.load(blocklyJson, tempWorkspace)
// 		}

// 		// Get the cpp generator and generate code
// 		const cppCode = await getCppGenerator().workspaceToCode(tempWorkspace as Blockly.WorkspaceSvg)

// 		// Clean up the temporary workspace
// 		tempWorkspace.dispose()

// 		return cppCode
// 	} catch (error) {
// 		console.error("Error generating C++ code from Blockly JSON:", error)
// 		return ""
// 	}
// }

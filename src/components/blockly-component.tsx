import * as Blockly from "blockly"
import { BlocklyWorkspace } from "react-blockly"
import { useState, useEffect, useCallback } from "react"
import { cppGenerator } from "../utils/cpp/cpp-generator"
import toolboxConfig from "../utils/blockly/toolbox-config"
import workspaceConfig from "../utils/blockly/workspace-config"
import createAllBlocks from "../utils/blockly/custom-blocks/create-all-blocks"

const initialXml = `
	<xml xmlns="https://developers.google.com/blockly/xml">
`

export default function BlocklyComponent() {
	const [blocklyState, setBlocklyState] = useState<BlocklyState>({
		xml: initialXml,
		cppCode: ""
	})

	const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg) => {
		const newXml = Blockly.Xml.domToText(
			Blockly.Xml.workspaceToDom(workspace)
		)
		const code = cppGenerator.workspaceToCode(workspace)

		console.log("code", code)
		setBlocklyState({
			xml: newXml,
			cppCode: code,
		})
	}, [])

	const initializeBlocks = useCallback(() => {
		const blocks = createAllBlocks().kinds

		// Register block definitions
		Object.entries(blocks).forEach(([blockName, blockData]) => {
			// First, register the block definition
			Blockly.Blocks[blockName] = {
				init: function() {
					// If the block uses the new init function directly, use it
					if (typeof blockData.definition.init === "function") {
						blockData.definition.init.call(this)
					} else {
						// Otherwise, use jsonInit for backward compatibility
						this.jsonInit(blockData.definition)
					}
				}
			}

			// Then, register the generator
			cppGenerator.forBlock[blockName] = blockData.generator
		})
	}, [])

	useEffect(() => {
		initializeBlocks()
	}, [initializeBlocks])

	return (
		<div className="h-screen w-full p-4">
			<div className="h-3/4 border border-slate-300 rounded">
				<BlocklyWorkspace
					toolboxConfiguration={toolboxConfig}
					initialXml={blocklyState.xml}
					className="h-full"
					workspaceConfiguration={workspaceConfig}
					onWorkspaceChange={handleWorkspaceChange}
				/>
			</div>
			<div className="code-preview">
				<h3>Generated C++ Code:</h3>
				<pre>
					<code>{blocklyState.cppCode}</code>
				</pre>
			</div>
		</div>
	)
}

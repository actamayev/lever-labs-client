import * as Blockly from "blockly"
import { BlocklyWorkspace } from "react-blockly"
import { useState, useEffect, useCallback } from "react"
import { cppGenerator } from "../utils/cpp/cpp-generator"
import workspaceConfig from "../utils/blockly/workspace-config"
import { toolboxConfig } from "../utils/blockly/toolbox-config"
import createAllBlocks from "../utils/blockly/custom-blocks/create-all-blocks"

const initialXml = `
    <xml xmlns="https://developers.google.com/blockly/xml"/>
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
		const cppCode = cppGenerator.workspaceToCode(workspace)

		setBlocklyState({
			xml: newXml,
			cppCode
		})
	}, [])

	const initializeBlocks = useCallback(() => {
		const blocks = createAllBlocks().kinds

		Object.entries(blocks).forEach(([blockName, blockData]) => {
			Blockly.Blocks[blockName] = {
				init: function() {
					if (typeof blockData.definition.init === "function") {
						blockData.definition.init.call(this)
					} else {
						this.jsonInit(blockData.definition)
					}
				}
			}

			// Set the generator function
			cppGenerator.forBlock[blockName] = blockData.generator.bind(cppGenerator)
		})
	}, [])

	useEffect(() => {
		initializeBlocks()
	}, [initializeBlocks])

	return (
		<div className="h-screen w-full p-4">
			<div className="h-1/2 border border-slate-300 rounded">
				<BlocklyWorkspace
					toolboxConfiguration={toolboxConfig}
					initialXml={blocklyState.xml}
					className="h-full"
					workspaceConfiguration={workspaceConfig}
					onWorkspaceChange={handleWorkspaceChange}
				/>
			</div>
			<div className="mt-4">
				<h3 className="text-lg font-bold dark:text-white">Generated C++ Code:</h3>
				<pre className="bg-slate-100 dark:bg-slate-800 dark:text-white p-4 rounded">
					{blocklyState.cppCode}
				</pre>
			</div>
		</div>
	)
}

import * as Blockly from "blockly"
import { BlocklyWorkspace } from "react-blockly"
import { useState, useEffect, useCallback } from "react"
import { javascriptGenerator } from "blockly/javascript"
import toolboxConfig from "../utils/blockly/toolbox-config"
import createAllBlocks from "../utils/blockly/custom-blocks/create-all-blocks"
import workspaceConfig from "../utils/blockly/workspace-config"

const initialXml = `
	<xml xmlns="https://developers.google.com/blockly/xml">
	<block type="controls_ifelse" x="50" y="50">
		<value name="IF0">
		<block type="logic_compare">
			<field name="OP">EQ</field>
		</block>
		</value>
	</block>
	</xml>
`

export default function BlocklyComponent() {
	const [blocklyState, setBlocklyState] = useState<BlocklyState>({
		xml: initialXml,
		javascriptCode: ""
	})

	const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg) => {
		const newXml = Blockly.Xml.domToText(
			Blockly.Xml.workspaceToDom(workspace)
		)
		const code = javascriptGenerator.workspaceToCode(workspace)

		setBlocklyState({
			xml: newXml,
			javascriptCode: code,
		})
	}, [])

	const initializeBlocks = useCallback(() => {
		Object.entries(createAllBlocks().kinds).forEach(([blockName, blockData]) => {
			Blockly.Blocks[blockName] = {
				init: function() {
					this.jsonInit(blockData.definition)
				}
			}
			javascriptGenerator.forBlock[blockName] = blockData.generator
		})
	}, [])

	useEffect(() => {
		initializeBlocks()
	}, [initializeBlocks])

	return (
		<div className="h-screen w-full p-4">
			<div className="h-3/4 border border-gray-300 rounded">
				<BlocklyWorkspace
					toolboxConfiguration={toolboxConfig}
					initialXml={blocklyState.xml}
					className="h-full"
					workspaceConfiguration={workspaceConfig}
					onWorkspaceChange={handleWorkspaceChange}
				/>
			</div>
			<div className="mt-4">
				<h3 className="text-lg font-bold">Generated JavaScript Code:</h3>
				<pre className="bg-gray-100 p-4 rounded">
					{blocklyState.javascriptCode}
				</pre>
			</div>
		</div>
	)
}

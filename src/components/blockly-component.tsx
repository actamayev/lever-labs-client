import _ from "lodash"
import * as Blockly from "blockly"
import { observer } from "mobx-react"
import { BlocklyWorkspace } from "react-blockly"
import { useState, useEffect, useCallback } from "react"
// import Button from "./button"
import { usePipContext } from "../contexts/pip-context"
import { cppGenerator } from "../utils/cpp/cpp-generator"
import useSendCppToPip from "../hooks/pip/send-cpp-to-pip"
import workspaceConfig from "../utils/blockly/workspace-config"
import { toolboxConfig } from "../utils/blockly/toolbox-config"
import useInitializeBlocks from "../hooks/blockly/initialize-blocks"
import { Button } from "./shadcn/ui/button"

const initialXml = `
    <xml xmlns="https://developers.google.com/blockly/xml"/>
`

function BlocklyComponent() {
	const [blocklyState, setBlocklyState] = useState<BlocklyState>({
		xml: initialXml,
		cppCode: ""
	})
	const pipClass = usePipContext()
	const sendCppToPip = useSendCppToPip()
	const initializeBlocks = useInitializeBlocks()

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

	const disableFlyoutAutoclose = useCallback(() => {
		const workspace = Blockly.getMainWorkspace() as Blockly.WorkspaceSvg

		const toolbox = workspace.getToolbox()
		if (!toolbox) return

		const flyout = toolbox.getFlyout()
		if (_.isNull(flyout)) return
		flyout.autoClose = false
	}, [])

	useEffect(() => {
		initializeBlocks()
		disableFlyoutAutoclose()
		// TODO: Fix, not working
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		// (Blockly.Tooltip as any).HOVER_MS = 0 // Set the tooltip delay to be instant
	}, [initializeBlocks, disableFlyoutAutoclose])

	const sendCodeToCppCallback = useCallback(async () => {
		await sendCppToPip(blocklyState.cppCode)
	}, [blocklyState.cppCode, sendCppToPip])

	return (
		<div className="h-screen w-full p-4">
			<div className="h-1/2 border border-zinc-300 rounded">
				<BlocklyWorkspace
					toolboxConfiguration={toolboxConfig}
					initialXml={blocklyState.xml}
					className="h-full"
					workspaceConfiguration={workspaceConfig}
					onWorkspaceChange={handleWorkspaceChange}
				/>
			</div>
			<div className="mt-4">
				<h3 className="text-lg font-bold dark:text-white">Generated C++</h3>
				<pre className="bg-zinc-100 dark:bg-zinc-800 dark:text-white p-4 rounded">
					{blocklyState.cppCode}
				</pre>
			</div>
			<Button
				onClick={sendCodeToCppCallback}
				disabled={_.isEmpty(blocklyState.cppCode) || pipClass.isSendingCppToPip}
				className="mt-2"
			>
				Send code to Pip
			</Button>
		</div>
	)
}

export default observer(BlocklyComponent)

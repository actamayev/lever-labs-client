import * as Blockly from "blockly"
import { isNull } from "lodash-es"
import { observer } from "mobx-react"
import { BlocklyWorkspace } from "react-blockly"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cppGenerator } from "../utils/cpp/cpp-generator"
import useDefaultSiteTheme from "../hooks/memos/default-site-theme"
import useInitializeBlocks from "../hooks/blockly/initialize-blocks"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../utils/blockly/workspace-config"

const initialXml = `
    <xml xmlns="https://developers.google.com/blockly/xml"/>
`

interface Props {
	toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition
	setCppCode?: React.Dispatch<React.SetStateAction<string>>
	// TODO: Consider addign a prop to make the sidebar be open by default
}

function BlocklyComponent (props: Props) {
	const { toolboxConfig, setCppCode } = props
	const [blocklyXml, setBlocklyXml] = useState(initialXml)
	const defaultSiteTheme = useDefaultSiteTheme()
	const isDarkMode = defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const initializeBlocks = useInitializeBlocks()

	const workspaceConfiguration = useMemo(() => {
		return getWorkspaceConfig(isDarkMode)
	}, [isDarkMode])

	const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg) => {
		workspaceRef.current = workspace
		const newXml = Blockly.Xml.domToText(
			Blockly.Xml.workspaceToDom(workspace)
		)
		const cppCode = cppGenerator.workspaceToCode(workspace)

		setBlocklyXml(newXml)
		if (setCppCode) setCppCode(cppCode)
	}, [setCppCode])

	useEffect(() => {
		if (!containerRef.current) return

		const resizeObserver = new ResizeObserver(() => {
			if (workspaceRef.current) {
				Blockly.svgResize(workspaceRef.current)
			}
		})

		resizeObserver.observe(containerRef.current)

		return () => {
			resizeObserver.disconnect()
		}
	}, [])

	useEffect(() => {
		if (workspaceRef.current) {
			workspaceRef.current.setTheme(isDarkMode ? darkTheme : lightTheme)
		}
	}, [isDarkMode])

	const disableFlyoutAutoclose = useCallback(() => {
		if (!workspaceRef.current) return // Exit if workspace isn't ready

		const toolbox = workspaceRef.current.getToolbox()
		// const workspace = Blockly.getMainWorkspace() as Blockly.WorkspaceSvg

		// const toolbox = workspace.getToolbox()
		if (!toolbox) return

		const flyout = toolbox.getFlyout()
		if (isNull(flyout)) return
		flyout.autoClose = false
	}, [])

	useEffect(() => {
		initializeBlocks()
		disableFlyoutAutoclose()
		// TODO: Fix, not working
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		// (Blockly.Tooltip as any).HOVER_MS = 0 // Set the tooltip delay to be instant
	}, [initializeBlocks, disableFlyoutAutoclose])

	return (
		<div
			ref={containerRef}
			className="h-1/2 relative z-0 rounded-lg overflow-hidden border border-border"
		>
			<BlocklyWorkspace
				toolboxConfiguration={toolboxConfig}
				initialXml={blocklyXml}
				workspaceConfiguration={workspaceConfiguration}
				className="h-full transition-all duration-300"
				onWorkspaceChange={handleWorkspaceChange}
			/>
		</div>
	)
}

export default observer(BlocklyComponent)

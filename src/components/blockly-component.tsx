import * as Blockly from "blockly"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { BlocklyWorkspace } from "react-blockly"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "../lib/shadcn/utils"
import { cppGenerator } from "../utils/cpp/cpp-generator"
import useDefaultSiteTheme from "../hooks/memos/default-site-theme"
import useInitializeBlocks from "../hooks/blockly/initialize-blocks"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../utils/blockly/workspace-config"

const initialXml = `
    <xml xmlns="https://developers.google.com/blockly/xml"/>
`

interface Props {
	toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition
	setCppCode: React.Dispatch<React.SetStateAction<string>>
	extraClasses?: string
	// 1/27/25 TODO: Consider addign a prop to make the sidebar be open by default
}

function BlocklyComponent(props: Props) {
	const { toolboxConfig, setCppCode, extraClasses = "h-1/2" } = props
	const [blocklyXml, setBlocklyXml] = useState(initialXml)
	const defaultSiteTheme = useDefaultSiteTheme()
	const isDarkMode = defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const isFirstRender = useRef(true)
	const initializeBlocks = useInitializeBlocks()

	const workspaceConfiguration = useMemo(() => {
		return getWorkspaceConfig(isDarkMode)
	}, [isDarkMode])

	const centerWorkspace = useCallback((workspace: Blockly.WorkspaceSvg) => {
		const metrics = workspace.getMetrics()
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!metrics) return

		const x = (metrics.viewWidth / 2) - (metrics.contentWidth / 2)
		const y = (metrics.viewHeight / 2) - (metrics.contentHeight / 2)

		workspace.scroll(x, y)
	}, [])

	const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg) => {
		workspaceRef.current = workspace
		const newXml = Blockly.Xml.domToText(
			Blockly.Xml.workspaceToDom(workspace)
		)
		const cppCode = cppGenerator.workspaceToCode(workspace)

		setBlocklyXml(newXml)
		setCppCode(cppCode)

		// Center workspace only on first render
		if (isFirstRender.current) {
			centerWorkspace(workspace)
			isFirstRender.current = false
		}
	}, [setCppCode, centerWorkspace])

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

	const setupToolbox = useCallback(() => {
		if (!workspaceRef.current) return

		const toolbox = workspaceRef.current.getToolbox()
		if (!toolbox) return

		const flyout = toolbox.getFlyout()
		if (isNull(flyout)) return
		flyout.autoClose = false
	}, [])

	useEffect(() => {
		initializeBlocks()
		setupToolbox()
		// 12/1/25 TODO: Fix, not working
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		// (Blockly.Tooltip as any).HOVER_MS = 0 // Set the tooltip delay to be instant
	}, [initializeBlocks, setupToolbox])

	return (
		<div
			ref={containerRef}
			className={cn("relative z-0 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700", extraClasses)}
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

// SOLUTION: Target the blocklyWidgetDiv positioning specifically

"use client"

import * as Blockly from "blockly"
import { observer } from "mobx-react"
import { BlocklyWorkspace } from "react-blockly"
import { BlocklyJson } from "@bluedotrobots/common-ts"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import { Button } from "../../shadcn/ui/button"
import personalInfoClass from "../../../classes/personal-info-class"
import initializeBlocks from "../../../utils/blockly/initialize-blocks"
import useSensorPollingUseEffect from "../../../utils/sandbox/sensor-polling-use-effect"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../../../utils/blockly/workspace-config"

interface Props {
	toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition
	extraClasses?: string
	initialBlocklyJson: BlocklyJson
	onJsonChange: (json: BlocklyJson) => void
}

// eslint-disable-next-line max-lines-per-function
function InteractiveMiniSandbox(props: Props) {
	const {
		toolboxConfig,
		extraClasses = "h-1/2",
		initialBlocklyJson,
		onJsonChange
	} = props
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const [isToolboxVisible, setIsToolboxVisible] = useState(true)
	useSensorPollingUseEffect()

	const workspaceConfiguration = useMemo(() => {
		return getWorkspaceConfig(isDarkMode, false)
	}, [isDarkMode])

	const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg) => {
		workspaceRef.current = workspace
		const newJson = Blockly.serialization.workspaces.save(workspace)
		onJsonChange(newJson)
	}, [onJsonChange])

	// Additional CSS-based fix
	useEffect(() => {
		// Add CSS to prevent widget div from affecting layout
		const style = document.createElement("style")
		style.textContent = `
			.blocklyWidgetDiv {
				position: fixed !important;
				z-index: 9999 !important;
				pointer-events: auto !important;
			}

			.blocklyWidgetDiv * {
				position: static !important;
			}

			.blocklyHtmlInput {
				position: static !important;
			}

			/* Prevent scroll anchoring during Blockly operations */
			body.blockly-widget-active {
				overflow-anchor: none !important;
				scroll-behavior: auto !important;
			}
		`
		document.head.appendChild(style)

		return () => {
			if (document.head.contains(style)) {
				document.head.removeChild(style)
			}
		}
	}, [])

	const toggleToolbox = useCallback(() => {
		const workspace = workspaceRef.current
		if (!workspace) return

		const flyout = workspace.getFlyout()
		const newVisibility = !isToolboxVisible

		if (flyout) {
			flyout.setVisible(newVisibility)
			setIsToolboxVisible(newVisibility)
		}

		setTimeout(() => {
			Blockly.svgResize(workspace)
		}, 100)
	}, [isToolboxVisible])

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

	useEffect(() => initializeBlocks(), [])

	return (
		<div
			ref={containerRef}
			className={cn("relative z-0 rounded-lg overflow-hidden border-2 border-swan", extraClasses)}
		>
			{/* Toggle Toolbox Button */}
			<Button
				variant="outline"
				size="sm"
				onClick={toggleToolbox}
				className={cn(
					"absolute top-2 right-2 z-10 p-2 h-8 w-8",
					"bg-background/80 backdrop-blur-sm border-border/50",
					"hover:bg-accent hover:text-accent-foreground",
					"transition-all duration-200"
				)}
				title={isToolboxVisible ? "Hide Toolbox" : "Show Toolbox"}
			>
				{isToolboxVisible ? (
					<X className="h-4 w-4" />
				) : (
					<Menu className="h-4 w-4" />
				)}
			</Button>

			<BlocklyWorkspace
				toolboxConfiguration={toolboxConfig}
				initialJson={initialBlocklyJson}
				workspaceConfiguration={workspaceConfiguration}
				className="h-full duration-0"
				onWorkspaceChange={handleWorkspaceChange}
			/>
		</div>
	)
}

export default observer(InteractiveMiniSandbox)

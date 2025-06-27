"use client"

import * as Blockly from "blockly"
import { observer } from "mobx-react"
import { BlocklyWorkspace } from "react-blockly"
import { BlocklyJson } from "@bluedotrobots/common-ts"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "../../../lib/shadcn/utils"
import personalInfoClass from "../../../classes/personal-info-class"
import initializeBlocks from "../../../utils/blockly/initialize-blocks"
import useSensorPollingUseEffect from "../../../utils/sandbox/sensor-polling-use-effect"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../../../utils/blockly/workspace-config"

interface Props {
	blocklyJson: BlocklyJson
	extraClasses?: string
}

// eslint-disable-next-line max-lines-per-function
function ViewOnlySandbox(props: Props) {
	const {
		blocklyJson,
		extraClasses = "h-1/2",
	} = props
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const [isCentered, setIsCentered] = useState(false)
	useSensorPollingUseEffect()

	const workspaceConfiguration = useMemo(() => {
		return getWorkspaceConfig(isDarkMode, true)
	}, [isDarkMode])

	const centerWorkspace = useCallback(() => {
		const workspace = workspaceRef.current
		if (!workspace) return

		// Set the scale to the start scale
		workspace.setScale(workspaceConfiguration.zoom?.startScale || 1)

		// Center the workspace
		workspace.scrollCenter()
		setIsCentered(true)
	}, [workspaceConfiguration.zoom?.startScale])

	const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg) => {
		workspaceRef.current = workspace

		// Center workspace on first initialization
		if (!isCentered) {
			// Use a small timeout to ensure the workspace is fully rendered
			setTimeout(() => {
				centerWorkspace()
			}, 100)
		}
	}, [isCentered, centerWorkspace])

	// Reset isCentered when blocklyJson changes
	useEffect(() => {
		setIsCentered(false)
	}, [blocklyJson])

	// Add effect to center workspace after it's initialized and when blocks change
	useEffect(() => {
		if (isCentered) return
		const timer = setTimeout(() => {
			centerWorkspace()
		}, 200) // Slightly longer delay for view-only to ensure full rendering

		return () => clearTimeout(timer)
	}, [centerWorkspace, blocklyJson, isCentered])

	useEffect(() => {
		if (workspaceRef.current) {
			workspaceRef.current.setTheme(isDarkMode ? darkTheme : lightTheme)
		}
	}, [isDarkMode])

	useEffect(() => {
		if (!containerRef.current) return

		const resizeObserver = new ResizeObserver(() => {
			if (workspaceRef.current) {
				Blockly.svgResize(workspaceRef.current)
				// Re-center after resize if already centered
				if (isCentered) {
					setTimeout(() => centerWorkspace(), 50)
				}
			}
		})

		resizeObserver.observe(containerRef.current)

		return () => {
			resizeObserver.disconnect()
		}
	}, [centerWorkspace, isCentered])

	useEffect(() => initializeBlocks(), [])

	return (
		<div
			ref={containerRef}
			className={cn("relative z-0 rounded-lg overflow-hidden border-2 border-swan", extraClasses)}
		>
			<BlocklyWorkspace
				initialJson={blocklyJson}
				workspaceConfiguration={workspaceConfiguration}
				className="h-full duration-0"
				onWorkspaceChange={handleWorkspaceChange}
			/>
		</div>
	)
}

export default observer(ViewOnlySandbox)

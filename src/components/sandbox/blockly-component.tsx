"use client"

import * as Blockly from "blockly"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { BlocklyWorkspace } from "react-blockly"
import { BlocklyJson } from "@bluedotrobots/common-ts"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "../../lib/shadcn/utils"
import personalInfoClass from "../../classes/personal-info-class"
import initializeBlocks from "../../utils/blockly/initialize-blocks"
import BlocklySearchFilter from "../../utils/sandbox/search-helpers"
import useSensorPollingUseEffect from "../../utils/sandbox/sensor-polling-use-effect"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../../utils/blockly/workspace-config"
import isEmpty from "lodash-es/isEmpty"

interface Props {
	toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition
	extraClasses?: string
	initialBlocklyJson: BlocklyJson
	onJsonChange: (json: BlocklyJson) => void
	searchTerm?: string
	isSwitchingMode: boolean
}

// eslint-disable-next-line max-lines-per-function
function BlocklyComponent(props: Props) {
	const {
		toolboxConfig,
		extraClasses = "h-1/2",
		initialBlocklyJson,
		onJsonChange,
		searchTerm = "",
		isSwitchingMode
	} = props
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const [isCentered, setIsCentered] = useState(false)
	const pathname = usePathname()
	useSensorPollingUseEffect()
	const [isCentering, setIsCentering] = useState(false)
	const workspaceConfiguration = useMemo(() => {
		return getWorkspaceConfig(isDarkMode, false)
	}, [isDarkMode])

	const filteredToolboxConfig = useMemo(() => {
		return BlocklySearchFilter.filterToolboxConfig(toolboxConfig, searchTerm)
	}, [toolboxConfig, searchTerm])

	const centerWorkspace = useCallback(() => {
		setIsCentering(true)
		const workspace = workspaceRef.current
		if (!workspace) return

		// Always center the workspace
		workspace.setScale(workspaceConfiguration.zoom?.startScale || 1)
		workspace.scrollCenter()

		setIsCentered(true)
		setIsCentering(false)
	}, [workspaceConfiguration.zoom?.startScale])

	const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg) => {
		workspaceRef.current = workspace
		const newJson = Blockly.serialization.workspaces.save(workspace)

		// Don't notify parent component if we're switching modes
		if (!isSwitchingMode && !isCentering) {
			onJsonChange(newJson)
		}

		// Center workspace on first initialization
		if (!isCentered) {
			centerWorkspace()
		}
	}, [isSwitchingMode, isCentering, isCentered, onJsonChange, centerWorkspace])

	// Handle centering when switching modes
	// @ts-expect-error - Not all code paths return a value, but this is intentional
	useEffect(() => {
		if (isSwitchingMode) {
			// Force re-centering when switching modes
			setIsCentered(false)
		} else {
			// After switching is complete, center the workspace
			const timer = setTimeout(() => {
				centerWorkspace()
			}, 100)

			return () => clearTimeout(timer)
		}
	}, [isSwitchingMode, centerWorkspace])

	useEffect(() => {
		if (isEmpty(searchTerm)) {
			setIsCentered(false)
			centerWorkspace()
		}
	}, [isSwitchingMode, searchTerm, centerWorkspace])

	// Reset isCentered when pathname changes (navigation)
	useEffect(() => {
		setIsCentered(false)
	}, [pathname])

	// Add effect to center workspace after it's initialized and when blocks change
	useEffect(() => {
		if (isCentered || isCentering) return
		const timer = setTimeout(() => {
			centerWorkspace()
		}, 100) // Small delay to ensure workspace is fully rendered

		return () => clearTimeout(timer)
	}, [centerWorkspace, initialBlocklyJson, isCentered, isCentering, pathname])

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

	// This keeps the category from having a blue border when clicked
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
	}, [setupToolbox])

	return (
		<div
			ref={containerRef}
			className={cn("relative z-0 rounded-b-lg overflow-hidden border-x-2 border-b-2 border-swan", extraClasses)}
		>
			<BlocklyWorkspace
				key={searchTerm.trim() ? "search-mode" : "normal-mode"}
				toolboxConfiguration={filteredToolboxConfig}
				initialJson={initialBlocklyJson}
				workspaceConfiguration={workspaceConfiguration}
				className="h-full duration-0"
				onWorkspaceChange={handleWorkspaceChange}
			/>
		</div>
	)
}

export default observer(BlocklyComponent)

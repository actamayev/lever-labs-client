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
import { Input } from "../shadcn/ui/input"
import { Button } from "../shadcn/ui/button"
import { Search, X } from "lucide-react"

interface Props {
	toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition
	extraClasses?: string
	initialBlocklyJson: BlocklyJson
	onJsonChange: (json: BlocklyJson) => void
}

// eslint-disable-next-line max-lines-per-function
function BlocklyComponent(props: Props) {
	const {
		toolboxConfig,
		extraClasses = "h-1/2",
		initialBlocklyJson,
		onJsonChange
	} = props

	const [searchTerm, setSearchTerm] = useState("")
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const [isCentered, setIsCentered] = useState(false)
	const [isSwitchingMode, setIsSwitchingMode] = useState(false)
	const previousSearchingRef = useRef(false)
	const pathname = usePathname()
	useSensorPollingUseEffect()

	const workspaceConfiguration = useMemo(() => {
		return getWorkspaceConfig(isDarkMode, false)
	}, [isDarkMode])

	const filteredToolboxConfig = useMemo(() => {
		return BlocklySearchFilter.filterToolboxConfig(toolboxConfig, searchTerm)
	}, [toolboxConfig, searchTerm])

	const centerWorkspace = useCallback(() => {
		const workspace = workspaceRef.current
		if (!workspace) return

		// Always center the workspace
		workspace.setScale(workspaceConfiguration.zoom?.startScale || 1)
		workspace.scrollCenter()

		setIsCentered(true)
	}, [workspaceConfiguration.zoom?.startScale])

	const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg) => {
		workspaceRef.current = workspace
		const newJson = Blockly.serialization.workspaces.save(workspace)

		// Don't notify parent component if we're switching modes
		if (!isSwitchingMode) {
			onJsonChange(newJson)
		}

		// Center workspace on first initialization
		if (!isCentered) {
			centerWorkspace()
		}
	}, [onJsonChange, isCentered, centerWorkspace, isSwitchingMode])

	// Track when we're switching between search modes
	useEffect(() => {
		const wasSearching = previousSearchingRef.current
		const isSearching = searchTerm.trim().length > 0

		let timer: NodeJS.Timeout | null = null

		// If we're switching modes, set switching state and reset centering
		if (wasSearching !== isSearching) {
			setIsSwitchingMode(true)
			setIsCentered(false) // Force re-centering when switching modes

			// Reset switching state after a short delay
			timer = setTimeout(() => {
				setIsSwitchingMode(false)
				// Explicitly center when switching back to normal mode
				if (wasSearching && !isSearching) {
					setTimeout(() => {
						centerWorkspace()
					}, 100)
				}
			}, 200)
		}

		// Update the ref for next comparison
		previousSearchingRef.current = isSearching

		return () => {
			if (timer) clearTimeout(timer)
		}
	}, [searchTerm, centerWorkspace])

	// Reset isCentered when pathname changes (navigation)
	useEffect(() => {
		setIsCentered(false)
	}, [pathname])

	// Add effect to center workspace after it's initialized and when blocks change
	useEffect(() => {
		if (isCentered) return
		const timer = setTimeout(() => {
			centerWorkspace()
		}, 100) // Small delay to ensure workspace is fully rendered

		return () => clearTimeout(timer)
	}, [centerWorkspace, initialBlocklyJson, isCentered, pathname])

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
		<div className={cn("flex flex-col", extraClasses)}>
			{/* Search Bar */}
			<div className="relative">
				<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-eel">
					<Search size={16} />
				</div>
				<Input
					type="text"
					placeholder="Search for blocks"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className={cn(
						"w-full px-4 py-2 pl-10 pr-12 rounded-t-lg border-2 border-swan rounded-b-none"
					)}
				/>
				{searchTerm && (
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setSearchTerm("")}
						className="absolute right-1 top-1/2 transform -translate-y-1/2 size-6 p-0 hover:bg-swan"
					>
						<X size={16} />
					</Button>
				)}
			</div>

			{/* Blockly Workspace */}
			<div
				ref={containerRef}
				className="relative z-0 rounded-b-lg overflow-hidden border-x-2 border-b-2 border-swan flex-1"
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
		</div>
	)
}

export default observer(BlocklyComponent)

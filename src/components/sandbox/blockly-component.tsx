"use client"

import * as Blockly from "blockly"
import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import { usePathname } from "next/navigation"
import { BlocklyWorkspace } from "react-blockly"
// @ts-expect-error - No type definitions available for this plugin
import { Multiselect } from "@mit-app-inventor/blockly-plugin-workspace-multiselect"
import { BlocklyJson } from "@actamayev/lever-labs-common-ts/types/sandbox"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import personalInfoClass from "../../classes/personal-info-class"
import initializeBlocks from "../../utils/blockly/initialize-blocks"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../../utils/blockly/workspace-config"

// 🔧 FIX: Override flyout init to force autoClose = false
if (typeof window !== "undefined") {
	if (Blockly.VerticalFlyout) {
		const originalVerticalInit = Blockly.VerticalFlyout.prototype.init
		Blockly.VerticalFlyout.prototype.init = function(targetWorkspace: Blockly.WorkspaceSvg): void {
			// Call original init
			const result = originalVerticalInit.call(this, targetWorkspace)
			// Force autoClose to false AFTER Blockly sets it to true
			this.autoClose = false
			return result
		}
	}
}

interface BlocklyComponentProps {
	toolboxConfig: Blockly.utils.toolbox.ToolboxDefinition
	initialBlocklyJson: BlocklyJson
	onJsonChange: (json: BlocklyJson) => void
	searchTerm: string
	isSwitchingMode: boolean
}

// eslint-disable-next-line max-lines-per-function
function BlocklyComponent(props: BlocklyComponentProps): React.ReactNode {
	const {
		toolboxConfig,
		initialBlocklyJson,
		onJsonChange,
		searchTerm,
		isSwitchingMode
	} = props
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const [isCentered, setIsCentered] = useState(false)
	const pathname = usePathname()
	const [isCentering, setIsCentering] = useState(false)

	const workspaceConfiguration = useMemo((): Blockly.BlocklyOptions => {
		return getWorkspaceConfig(isDarkMode, false)
	}, [isDarkMode])

	const centerWorkspace = useCallback((): void => {
		setIsCentering(true)
		const workspace = workspaceRef.current
		if (!workspace) {
			setIsCentering(false)
			return
		}

		workspace.setScale(workspaceConfiguration.zoom?.startScale || 1)
		workspace.scrollCenter()

		setIsCentered(true)
		setIsCentering(false)
	}, [workspaceConfiguration.zoom?.startScale])

	const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg): void => {
		workspaceRef.current = workspace
		const newJson = Blockly.serialization.workspaces.save(workspace)

		// Initialize multiselect plugin if not already initialized
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if (!(workspace as any).multiselectPlugin) {
			try {
				const multiselectPlugin = new Multiselect(workspace)
				multiselectPlugin.init({
					multiSelectKeys: ["Shift"],
					multiFieldUpdate: true,
					useDoubleClick: false,
					bumpNeighbors: false,
					multiselectIcon: {
						hideIcon: true,
						weight: 3,
					}
				})
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				;(workspace as any).multiselectPlugin = multiselectPlugin
			} catch (error) {
				console.warn("Failed to initialize multiselect plugin:", error)
			}
		}

		if (!isSwitchingMode && !isCentering) {
			onJsonChange(newJson)
		}

		if (!isCentered) {
			centerWorkspace()
		}
	}, [isSwitchingMode, isCentering, isCentered, onJsonChange, centerWorkspace])

	// Handle centering when switching modes
	// @ts-expect-error - Not all code paths return a value, but this is intentional
	useEffect((): () => void => {
		if (isSwitchingMode) {
			setIsCentered(false)
		} else {
			const timer = setTimeout((): void => {
				centerWorkspace()
			}, 100)

			return (): void => clearTimeout(timer)
		}
	}, [isSwitchingMode, centerWorkspace])

	useEffect((): void => {
		if (!isEmpty(searchTerm)) return
		setIsCentered(false)
		centerWorkspace()
	}, [isSwitchingMode, searchTerm, centerWorkspace])

	useEffect((): void => {
		setIsCentered(false)
	}, [pathname])

	useEffect((): () => void => {
		if (isCentered || isCentering) return (): void => {}
		const timer = setTimeout((): void => {
			centerWorkspace()
		}, 100)

		return (): void => clearTimeout(timer)
	}, [centerWorkspace, initialBlocklyJson, isCentered, isCentering, pathname])

	useEffect((): () => void => {
		if (!containerRef.current) return (): void => {}

		const resizeObserver = new ResizeObserver((): void => {
			if (workspaceRef.current) {
				Blockly.svgResize(workspaceRef.current)
			}
		})

		resizeObserver.observe(containerRef.current)

		return (): void => {
			resizeObserver.disconnect()
		}
	}, [])

	useEffect((): void => {
		if (workspaceRef.current) {
			workspaceRef.current.setTheme(isDarkMode ? darkTheme : lightTheme)
		}
	}, [isDarkMode])

	useEffect((): void => {
		void initializeBlocks()
		// TODO 12/1/24: Fix, not working
		// (Blockly.Tooltip as any).HOVER_MS = 0 // Set the tooltip delay to be instant
	}, [])

	return (
		<div
			ref={containerRef}
			className="relative z-0 rounded-b-3xl overflow-hidden border-swan border-b-2 flex-1"
		>
			<BlocklyWorkspace
				key={searchTerm.trim() ? "search-mode" : "normal-mode"}
				toolboxConfiguration={toolboxConfig}
				initialJson={initialBlocklyJson}
				workspaceConfiguration={workspaceConfiguration}
				className="h-full duration-0"
				onWorkspaceChange={handleWorkspaceChange}
			/>
		</div>
	)
}

export default observer(BlocklyComponent)

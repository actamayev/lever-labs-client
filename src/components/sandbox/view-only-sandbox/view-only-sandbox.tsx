"use client"

import * as Blockly from "blockly"
import { observer } from "mobx-react"
import { BlocklyWorkspace } from "react-blockly"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "../../../lib/shadcn/utils"
import personalInfoClass from "../../../classes/personal-info-class"
import initializeBlocks from "../../../utils/blockly/initialize-blocks"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../../../utils/blockly/workspace-config"
import { BlocklyJson } from "@bluedotrobots/common-ts/types/sandbox"

interface Props {
	blocklyJson: BlocklyJson
	extraClasses?: string
}

function ViewOnlySandbox(props: Props): React.ReactNode {
	const {
		blocklyJson,
		extraClasses = "h-1/2",
	} = props
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const [isCentered, setIsCentered] = useState(false)
	console.log("blocklyJson", blocklyJson)

	const workspaceConfiguration = useMemo((): Blockly.BlocklyOptions => {
		return getWorkspaceConfig(isDarkMode, true)
	}, [isDarkMode])

	const centerWorkspace = useCallback((): void => {
		const workspace = workspaceRef.current
		if (!workspace) return

		// Set the scale to the start scale
		workspace.setScale(workspaceConfiguration.zoom?.startScale || 1)

		// Center the workspace
		workspace.scrollCenter()
		setIsCentered(true)
	}, [workspaceConfiguration.zoom?.startScale])

	const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg): void => {
		workspaceRef.current = workspace

		// Center workspace on first initialization
		if (!isCentered) {
			// Use a small timeout to ensure the workspace is fully rendered
			setTimeout((): void => {
				centerWorkspace()
			}, 100)
		}
	}, [isCentered, centerWorkspace])

	// Reset isCentered when blocklyJson changes
	useEffect((): void => {
		setIsCentered(false)
	}, [blocklyJson])

	// Add effect to center workspace after it's initialized and when blocks change
	useEffect((): () => void => {
		if (isCentered) return (): void => {}
		const timer = setTimeout((): void => {
			centerWorkspace()
		}, 200) // Slightly longer delay for view-only to ensure full rendering

		return (): void => clearTimeout(timer)
	}, [centerWorkspace, blocklyJson, isCentered])

	useEffect((): void => {
		if (workspaceRef.current) {
			workspaceRef.current.setTheme(isDarkMode ? darkTheme : lightTheme)
		}
	}, [isDarkMode])

	useEffect((): () => void => {
		if (!containerRef.current) return (): void => {}

		const resizeObserver = new ResizeObserver((): void => {
			if (workspaceRef.current) {
				Blockly.svgResize(workspaceRef.current)
				// Re-center after resize if already centered
				if (isCentered) {
					setTimeout((): void => centerWorkspace(), 50)
				}
			}
		})

		resizeObserver.observe(containerRef.current)

		return (): void => {
			resizeObserver.disconnect()
		}
	}, [centerWorkspace, isCentered])

	useEffect((): void => {
		void initializeBlocks()
	}, [])

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

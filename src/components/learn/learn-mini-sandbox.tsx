"use client"

import * as Blockly from "blockly"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { BlocklyWorkspace } from "react-blockly"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import { cn } from "../../lib/shadcn/utils"
import personalInfoClass from "../../classes/personal-info-class"
import initializeBlocks from "../../utils/blockly/initialize-blocks"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../../utils/blockly/workspace-config"
import { toolboxConfig } from "../../utils/blockly/toolbox-config"

interface LearnMiniSandboxProps {
	blocklyJson: BlocklyJson
	className?: string
}


function LearnMiniSandbox({ blocklyJson, className = "" }: LearnMiniSandboxProps): React.ReactNode {
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const pathname = usePathname()
	const [isCentered, setIsCentered] = useState(false)
	const [isCentering, setIsCentering] = useState(false)
	const [blocksInitialized, setBlocksInitialized] = useState(false)

	const workspaceConfiguration = useMemo((): Blockly.BlocklyOptions => {
		return getWorkspaceConfig(isDarkMode, true, 1, true)
	}, [isDarkMode])

	const centerWorkspace = useCallback((): void => {
		setIsCentering(true)
		const workspace = workspaceRef.current
		if (!workspace) return

		// Always center the workspace
		workspace.setScale(workspaceConfiguration.zoom?.startScale || 1)
		workspace.scrollCenter()

		setIsCentered(true)
		setIsCentering(false)
	}, [workspaceConfiguration.zoom?.startScale])

	const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg): void => {
		workspaceRef.current = workspace

		// Center workspace after blocks are loaded
		if (workspace.getAllBlocks().length > 0 && !isCentered) {
			setTimeout((): void => {
				centerWorkspace()
			}, 100)
		}
	}, [isCentered, centerWorkspace])

	useEffect((): void => {
		setIsCentered(false)
	}, [blocklyJson])

	// Reset isCentered when pathname changes (navigation)
	useEffect((): void => {
		setIsCentered(false)
	}, [pathname])

	// Add effect to center workspace after blocks are loaded
	useEffect((): () => void => {
		if (isCentered || isCentering || !blocksInitialized) return (): void => {}

		const timer = setTimeout((): void => {
			if (workspaceRef.current && workspaceRef.current.getAllBlocks().length > 0) {
				centerWorkspace()
			}
		}, 200) // Longer delay to ensure blocks are fully rendered

		return (): void => clearTimeout(timer)
	}, [centerWorkspace, blocklyJson, isCentered, isCentering, pathname, blocksInitialized])

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
			}
		})

		resizeObserver.observe(containerRef.current)

		return (): void => {
			resizeObserver.disconnect()
		}
	}, [])

	useEffect((): void => {
		const initBlocks = async (): Promise<void> => {
			await initializeBlocks()
			setBlocksInitialized(true)
		}
		void initBlocks()
	}, [])

	if (!blocksInitialized) {
		return (
			<div className={cn("relative z-0 rounded-3xl overflow-hidden h-full flex-1 flex items-center justify-center", className)}>
				<p className="text-gray-500">Loading blocks...</p>
			</div>
		)
	}

	return (
		<div
			ref={containerRef}
			className={cn("relative z-0 rounded-3xl overflow-hidden h-full flex-1", className)}
		>
			<BlocklyWorkspace
				key={`${blocksInitialized}-${JSON.stringify(blocklyJson)}`}
				initialJson={blocklyJson}
				toolboxConfiguration={toolboxConfig}
				workspaceConfiguration={workspaceConfiguration}
				className="h-full duration-0"
				onWorkspaceChange={handleWorkspaceChange}
			/>
		</div>
	)
}

export default observer(LearnMiniSandbox)

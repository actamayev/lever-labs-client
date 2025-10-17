"use client"

import { toJS } from "mobx"
import * as Blockly from "blockly"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { BlocklyWorkspace } from "react-blockly"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { CodingBlock } from "@lever-labs/common-ts/types/learn"
import { cn } from "../../lib/shadcn/utils"
import personalInfoClass from "../../classes/personal-info-class"
import initializeBlocks from "../../utils/blockly/initialize-blocks"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../../utils/blockly/workspace-config"

interface LearnMiniSandboxProps {
	codingBlock: CodingBlock
	className?: string
}

function LearnMiniSandbox({ codingBlock, className = "" }: LearnMiniSandboxProps): React.ReactNode {
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const pathname = usePathname()
	const [isCentered, setIsCentered] = useState(false)
	const [isCentering, setIsCentering] = useState(false)

	const workspaceConfiguration = useMemo((): Blockly.BlocklyOptions => {
		return getWorkspaceConfig(isDarkMode, true, 0.5, true)
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

		// Center workspace on first initialization
		if (!isCentered) {
			centerWorkspace()
		}
	}, [isCentered, centerWorkspace])

	useEffect((): void => {
		setIsCentered(false)
	}, [codingBlock.codingBlockJson])

	// Reset isCentered when pathname changes (navigation)
	useEffect((): void => {
		setIsCentered(false)
	}, [pathname])

	// Add effect to center workspace after it's initialized and when blocks change
	useEffect((): () => void => {
		if (isCentered || isCentering) return (): void => {}
		const timer = setTimeout((): void => {
			centerWorkspace()
		}, 100) // Small delay to ensure workspace is fully rendered

		return (): void => clearTimeout(timer)
	}, [centerWorkspace, codingBlock.codingBlockJson, isCentered, isCentering, pathname])

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
		if (workspaceRef.current) {
			workspaceRef.current.setTheme(isDarkMode ? darkTheme : lightTheme)
		}
	}, [isDarkMode])

	useEffect((): void => {
		void initializeBlocks()
	}, [])

	console.log("codingBlock.codingBlockId", toJS(codingBlock.codingBlockId))
	return (
		<div
			ref={containerRef}
			className={cn("relative z-0 rounded-3xl overflow-hidden border-swan border-b-2 h-full flex-1", className)}
		>
			<BlocklyWorkspace
				key={codingBlock.codingBlockId}
				initialJson={codingBlock.codingBlockJson}
				workspaceConfiguration={workspaceConfiguration}
				className="h-full duration-0"
				onWorkspaceChange={handleWorkspaceChange}
			/>
		</div>
	)
}

export default observer(LearnMiniSandbox)

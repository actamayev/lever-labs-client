"use client"

import * as Blockly from "blockly"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { BlocklyWorkspace } from "react-blockly"
import { BlocklyJson } from "@bluedotrobots/common-ts"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "../../../lib/shadcn/utils"
import { cppGenerator } from "../../../utils/cpp/cpp-generator"
import personalInfoClass from "../../../classes/personal-info-class"
import initializeBlocks from "../../../utils/blockly/initialize-blocks"
import useSensorPollingUseEffect from "../../../utils/sandbox/sensor-polling-use-effect"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../../../utils/blockly/workspace-config"

interface Props {
	blocklyJson: BlocklyJson
	setCppCode: React.Dispatch<React.SetStateAction<string>>
	extraClasses?: string
}

// eslint-disable-next-line max-lines-per-function
function ViewOnlySandbox(props: Props) {
	const {
		blocklyJson,
		setCppCode,
		extraClasses = "h-1/2",
	} = props
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const [isCentered, setIsCentered] = useState(false)
	const pathname = usePathname()
	useSensorPollingUseEffect()

	const workspaceConfiguration = useMemo(() => {
		return getWorkspaceConfig(isDarkMode, true)
	}, [isDarkMode])

	const centerWorkspace = useCallback(() => {
		const workspace = workspaceRef.current
		if (!workspace) return
		workspace.setScale(workspaceConfiguration.zoom?.startScale || 1)

		workspace.scrollCenter()
		setIsCentered(true)
	}, [workspaceConfiguration.zoom?.startScale])

	const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg) => {
		workspaceRef.current = workspace
		const cppCode = cppGenerator.workspaceToCode(workspace)
		setCppCode(cppCode)

		// Disable context menu on workspace
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (workspace) {
			workspace.getCanvas().addEventListener("contextmenu", (e) => {
				e.preventDefault()
				e.stopPropagation()
			})
		}

		// Center workspace on first initialization
		if (!isCentered) {
			centerWorkspace()
		}
	}, [setCppCode, isCentered, centerWorkspace])

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
	}, [centerWorkspace, blocklyJson, isCentered, pathname])

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

"use client"

import * as Blockly from "blockly"
import { observer } from "mobx-react"
import { BlocklyWorkspace } from "react-blockly"
import { useCallback, useEffect, useMemo, useRef } from "react"
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
		extraClasses = "h-full",
	} = props
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	console.log("blocklyJson", blocklyJson)

	const workspaceConfiguration = useMemo((): Blockly.BlocklyOptions => {
		return getWorkspaceConfig(isDarkMode, true)
	}, [isDarkMode])

	const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg): void => {
		console.log("workspaceChange", workspace)
		workspaceRef.current = workspace
	}, [])

	useEffect((): () => void => {
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

		return (): void => {
			if (document.head.contains(style)) {
				document.head.removeChild(style)
			}
		}
	}, [])

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

	return (
		<div className="h-full flex flex-col">
			<div className="flex-1 min-h-0">
				<div
					ref={containerRef}
					className={cn("relative z-0 rounded-3xl overflow-hidden border-y-2 border-swan h-full", extraClasses)}
				>
					<BlocklyWorkspace
						initialJson={blocklyJson}
						workspaceConfiguration={workspaceConfiguration}
						className="h-full w-full duration-0"
						onWorkspaceChange={handleWorkspaceChange}
					/>
				</div>
			</div>
		</div>
	)
}

export default observer(ViewOnlySandbox)

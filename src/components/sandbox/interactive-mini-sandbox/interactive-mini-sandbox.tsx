"use client"

import * as Blockly from "blockly"
import { observer } from "mobx-react"
import { BlocklyWorkspace } from "react-blockly"
import { BlocklyJson } from "@bluedotrobots/common-ts/types/sandbox"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import { Button } from "../../shadcn/ui/button"
import personalInfoClass from "../../../classes/personal-info-class"
import initializeBlocks from "../../../utils/blockly/initialize-blocks"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../../../utils/blockly/workspace-config"
import careerQuestClass from "../../../classes/career-quest-class"
import chatManagerClass from "../../../classes/chat-manager-class"

interface Props {
	careerUUIDChallengeUUID: CareerUUIDChallengeUUID
	onJsonChange: (json: BlocklyJson) => void
}


// eslint-disable-next-line max-lines-per-function
function InteractiveMiniSandbox(props: Props): React.ReactNode {
	const {
		careerUUIDChallengeUUID,
		onJsonChange
	} = props
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const [isToolboxVisible, setIsToolboxVisible] = useState(true)
	const [isCentered, setIsCentered] = useState(false)
	const toolboxConfig = careerQuestClass.getToolboxConfig(careerUUIDChallengeUUID)
	const blocklyJson = chatManagerClass.getUpdatedBlocklyJson(careerUUIDChallengeUUID)

	const workspaceConfiguration = useMemo((): Blockly.BlocklyOptions => {
		return getWorkspaceConfig(isDarkMode, false)
	}, [isDarkMode])

	const centerWorkspace = useCallback((): void => {
		const workspace = workspaceRef.current
		if (!workspace) return

		workspace.setScale(workspaceConfiguration.zoom?.startScale || 1)
		workspace.scrollCenter()
		setIsCentered(true)
	}, [workspaceConfiguration.zoom?.startScale])

	const handleWorkspaceChange = useCallback((workspace: Blockly.WorkspaceSvg): void => {
		workspaceRef.current = workspace
		const newJson = Blockly.serialization.workspaces.save(workspace)
		onJsonChange(newJson)

		// Center workspace only on first initialization with delay
		if (!isCentered) {
			setTimeout((): void => {
				centerWorkspace()
			}, 100)
		}
	}, [onJsonChange, isCentered, centerWorkspace])

	const toggleToolbox = useCallback((): void => {
		const workspace = workspaceRef.current
		if (!workspace) return

		const flyout = workspace.getFlyout()
		const newVisibility = !isToolboxVisible

		if (flyout) {
			flyout.setVisible(newVisibility)
			setIsToolboxVisible(newVisibility)
		}

		setTimeout((): void => {
			Blockly.svgResize(workspace)
		}, 100)
	}, [isToolboxVisible])

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
		<div
			ref={containerRef}
			className={cn("relative z-0 rounded-3xl border-y-2 border-swan h-full")}
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
				initialJson={blocklyJson}
				workspaceConfiguration={workspaceConfiguration}
				className="h-full duration-0"
				onWorkspaceChange={handleWorkspaceChange}
			/>
		</div>
	)
}

export default observer(InteractiveMiniSandbox)

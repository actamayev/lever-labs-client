"use client"

import * as Blockly from "blockly"
import { observer } from "mobx-react"
import { BlocklyWorkspace } from "react-blockly"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import { BlockNames } from "@lever-labs/common-ts/types/blockly/blockly"
import { createChallengeToolbox } from "@lever-labs/common-ts/types/utils/blockly-helpers"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import { Button } from "../shadcn/ui/button"
import learnClass from "../../classes/learn-class"
import personalInfoClass from "../../classes/personal-info-class"
import initializeBlocks from "../../utils/blockly/initialize-blocks"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../../utils/blockly/workspace-config"
import getCppGenerator from "../../utils/cpp/cpp-generator"

// eslint-disable-next-line max-lines-per-function
function FillInBlankQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const [isToolboxVisible, setIsToolboxVisible] = useState(true)
	const [blocksInitialized, setBlocksInitialized] = useState(false)
	const isFirstChangeRef = useRef(true)

	const fillInTheBlank = currentQuestionState?.question.fillInTheBlank

	// Initialize blocks before anything else
	useEffect((): void => {
		const initialize = async (): Promise<void> => {
			await initializeBlocks()
			setBlocksInitialized(true)
		}
		void initialize()
	}, [])

	// Parse the initial blockly JSON from string
	const parsedInitialJson = useMemo((): BlocklyJson => {
		if (!fillInTheBlank?.initialBlocklyJson) {
			return { blocks: { blocks: [] } }
		}
		try {
			return JSON.parse(fillInTheBlank.initialBlocklyJson as unknown as string) as BlocklyJson
		} catch (error) {
			console.error("Failed to parse initial blockly JSON:", error)
			return { blocks: { blocks: [] } }
		}
	}, [fillInTheBlank?.initialBlocklyJson])

	// Create toolbox config from fillInTheBlankBlockBank
	const toolboxConfig = useMemo((): Blockly.utils.toolbox.ToolboxDefinition => {
		if (!fillInTheBlank?.fillInTheBlankBlockBank) {
			return { kind: "flyoutToolbox", contents: [] }
		}
		// Sort by order and extract block names
		const sortedBlocks = [...fillInTheBlank.fillInTheBlankBlockBank].sort((a, b): number => a.order - b.order)
		const blockNames = Array.from(new Set(sortedBlocks.map((block): BlockNames => block.codingBlock.blockName)))

		// Use createChallengeToolbox to generate the toolbox
		const blockData = createChallengeToolbox(blockNames)
		return blockData.toolboxConfig
	}, [fillInTheBlank?.fillInTheBlankBlockBank])

	const workspaceConfiguration = useMemo((): Blockly.BlocklyOptions => {
		return getWorkspaceConfig(isDarkMode, false)
	}, [isDarkMode])

	const centerWorkspace = useCallback((): void => {
		const workspace = workspaceRef.current
		if (!workspace) return

		workspace.setScale(workspaceConfiguration.zoom?.startScale || 1)
		workspace.scrollCenter()
	}, [workspaceConfiguration.zoom?.startScale])

	const handleWorkspaceChange = useCallback(async (workspace: Blockly.WorkspaceSvg): Promise<void> => {
		workspaceRef.current = workspace

		// Skip the first change event which happens during workspace initialization
		if (isFirstChangeRef.current) {
			isFirstChangeRef.current = false
			// Center workspace only on first initialization with delay
			setTimeout((): void => {
				centerWorkspace()
			}, 100)
			return
		}

		if (!currentQuestionState) return

		const newJson = Blockly.serialization.workspaces.save(workspace)

		// Generate CPP code from the current JSON
		try {
			const cppCode = await getCppGenerator().generateCppFromJson(newJson)

			// Store the current answer in the learn class
			learnClass.setFillInBlankAnswer(currentQuestionState.question.questionId, newJson, cppCode)
		} catch (error) {
			console.error("Failed to generate CPP code:", error)
		}
	}, [centerWorkspace, currentQuestionState])

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

	// Reset the first change flag when question changes
	useEffect((): void => {
		isFirstChangeRef.current = true
	}, [currentQuestionState?.question.questionId])

	// Don't render until blocks are initialized
	if (!blocksInitialized) {
		return (
			<div className="flex items-center justify-center h-[500px]">
				<p className="text-gray-500 dark:text-gray-400">
					Loading blocks...
				</p>
			</div>
		)
	}

	if (!fillInTheBlank) {
		return (
			<div className="text-center">
				<p className="text-gray-500 dark:text-gray-400">
					No fill-in-the-blank data available
				</p>
			</div>
		)
	}

	const { questionText } = fillInTheBlank

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-semibold text-questionText text-center">
				{questionText}
			</h2>

			<div
				ref={containerRef}
				className={cn("relative z-0 rounded-3xl border-2 border-swan h-[500px]")}
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
					initialJson={parsedInitialJson}
					workspaceConfiguration={workspaceConfiguration}
					className="h-full duration-0"
					onWorkspaceChange={handleWorkspaceChange}
				/>
			</div>
		</div>
	)
}

export default observer(FillInBlankQuestion)


"use client"

import * as Blockly from "blockly"
import { observer } from "mobx-react"
import { BlocklyWorkspace } from "react-blockly"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import { BlockNames } from "@lever-labs/common-ts/types/blockly/blockly"
import { createChallengeToolbox } from "@lever-labs/common-ts/types/utils/blockly-helpers"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { RotateCcw } from "lucide-react"
import { cn } from "../../lib/shadcn/utils"
import { Button } from "../ui/button"
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
		if (!fillInTheBlank?.availableBlocks) {
			return { kind: "flyoutToolbox", contents: [] }
		}
		const blockNames = Array.from(new Set(
			fillInTheBlank.availableBlocks.map((block): BlockNames => block.blockName)
		))

		// Use createChallengeToolbox to generate the toolbox
		const blockData = createChallengeToolbox(blockNames)
		return blockData.toolboxConfig
	}, [fillInTheBlank?.availableBlocks])

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

	const resetWorkspace = useCallback(async (): Promise<void> => {
		const workspace = workspaceRef.current
		if (!workspace) return

		try {
		// Load initial JSON back into the workspace
			Blockly.serialization.workspaces.load(parsedInitialJson, workspace)
			// Generate fresh CPP from the initial JSON and persist as the current answer
			const cppCode = await getCppGenerator().generateCppFromJson(parsedInitialJson)
			if (currentQuestionState) {
				learnClass.setFillInBlankAnswer(currentQuestionState.question.questionId, parsedInitialJson, cppCode)
			}
			// Recenter after reset
			setTimeout((): void => {
				centerWorkspace()
				Blockly.svgResize(workspace)
			}, 50)
		} catch (error) {
			console.error("Failed to reset workspace:", error)
		}
	}, [centerWorkspace, currentQuestionState, parsedInitialJson])

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

	// When the question changes, load its initial JSON into the workspace
	useEffect((): void => {
		const workspace = workspaceRef.current
		if (!workspace) return

		try {
			Blockly.serialization.workspaces.load(parsedInitialJson, workspace)
			void (async (): Promise<void> => {
				const cppCode = await getCppGenerator().generateCppFromJson(parsedInitialJson)
				if (currentQuestionState) {
					learnClass.setFillInBlankAnswer(currentQuestionState.question.questionId, parsedInitialJson, cppCode)
				}
				setTimeout((): void => {
					centerWorkspace()
					Blockly.svgResize(workspace)
				}, 50)
			})()
		} catch (error) {
			console.error("Failed to load initial JSON for new question:", error)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [parsedInitialJson, currentQuestionState?.question.questionId, centerWorkspace])

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
			<h2 className="text-3xl font-semibold text-question-text text-center">
				{questionText}
			</h2>

			<div
				ref={containerRef}
				className={cn("relative z-0 rounded-3xl overflow-hidden border-swan border-2  h-[500px] flex-1")}
			>
				{/* Reset Workspace Button */}
				<Button
					variant="outline"
					size="sm"
					onClick={(): void => { void resetWorkspace() }}
					className={cn(
						"absolute top-2 right-2 z-10 p-2 h-8 w-8",
						"bg-background/80 backdrop-blur-xs border-border/50",
						"hover:bg-accent hover:text-accent-foreground",
						"transition-all duration-200"
					)}
					title="Reset blocks to start"
				>
					<RotateCcw className="h-4 w-4" />
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


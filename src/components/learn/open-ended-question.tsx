"use client"

import * as Blockly from "blockly"
import { observer } from "mobx-react"
import { BlocklyWorkspace } from "react-blockly"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import { BlockNames } from "@lever-labs/common-ts/types/blockly/blockly"
import { createChallengeToolbox } from "@lever-labs/common-ts/types/utils/blockly-helpers"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { RotateCcw } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { TactileButton } from "../buttons/tactile-button"
import learnClass from "../../classes/learn-class"
import personalInfoClass from "../../classes/personal-info-class"
import initializeBlocks from "../../utils/blockly/initialize-blocks"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../../utils/blockly/workspace-config"
import getCppGenerator from "../../utils/cpp/cpp-generator"
import stopCurrentlyRunningCode from "../../utils/sandbox/stop-currently-running-code"
import AnimatedStateButton from "../magicui/animated-rainbow-button"
import sendCppToPip from "../../utils/sandbox/send-cpp-to-pip"
import pipClass from "../../classes/pip-class"
import isEmpty from "lodash-es/isEmpty"
// @ts-expect-error - No type definitions available for this plugin
import { Multiselect } from "@mit-app-inventor/blockly-plugin-workspace-multiselect"

interface QuestionData {
	questionText: string
	initialBlocklyJson?: BlocklyJson
	availableBlocks?: Array<{ blockName: BlockNames }>
	referenceSolutionCpp?: string
}

interface OpenEndedQuestionProps {
	questionData: QuestionData
	onAnswerChange: (questionId: string, blocklyJson: BlocklyJson, cppCode: string) => void
	errorMessage?: string
	renderLeftButtons?: (referenceSolutionCpp?: string) => React.ReactNode
}

// eslint-disable-next-line max-lines-per-function
function OpenEndedQuestion({
	questionData,
	onAnswerChange,
	errorMessage = "No question data available",
	renderLeftButtons
}: OpenEndedQuestionProps): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const [blocksInitialized, setBlocksInitialized] = useState(false)
	const isFirstChangeRef = useRef(true)

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
		if (!questionData.initialBlocklyJson) {
			return { blocks: { blocks: [] } }
		}
		return questionData.initialBlocklyJson
	}, [questionData.initialBlocklyJson])

	// Create toolbox config from available blocks
	const toolboxConfig = useMemo((): Blockly.utils.toolbox.ToolboxDefinition => {
		if (!questionData.availableBlocks) {
			return { kind: "flyoutToolbox", contents: [] }
		}
		const blockNames = Array.from(new Set(
			questionData.availableBlocks.map((block): BlockNames => block.blockName)
		))

		// Use createChallengeToolbox to generate the toolbox
		const blockData = createChallengeToolbox(blockNames)
		return blockData.toolboxConfig
	}, [questionData.availableBlocks])

	const workspaceConfiguration = useMemo((): Blockly.BlocklyOptions => {
		const config = getWorkspaceConfig(isDarkMode, false)
		// Override global CSS that disables scrolling/panning
		return {
			...config,
			move: {
				scrollbars: {
					horizontal: true,
					vertical: true,
				},
				drag: true,
				wheel: true,
			}
		}
	}, [isDarkMode])

	const centerWorkspace = useCallback((): void => {
		const workspace = workspaceRef.current
		if (!workspace) return

		workspace.setScale(workspaceConfiguration.zoom?.startScale || 1)
		workspace.scrollCenter()
	}, [workspaceConfiguration.zoom?.startScale])

	const handleWorkspaceChange = useCallback(async (workspace: Blockly.WorkspaceSvg): Promise<void> => {
		workspaceRef.current = workspace

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
			onAnswerChange(currentQuestionState.question.questionId, newJson, cppCode)
		} catch (error) {
			console.error("Failed to generate CPP code:", error)
		}
	}, [centerWorkspace, currentQuestionState, onAnswerChange])

	const resetWorkspace = useCallback(async (): Promise<void> => {
		const workspace = workspaceRef.current
		if (!workspace) return

		try {
			// Load initial JSON back into the workspace
			Blockly.serialization.workspaces.load(parsedInitialJson, workspace)
			// Generate fresh CPP from the initial JSON and persist as the current answer
			const cppCode = await getCppGenerator().generateCppFromJson(parsedInitialJson)
			if (currentQuestionState) {
				onAnswerChange(currentQuestionState.question.questionId, parsedInitialJson, cppCode)
			}
			// Recenter after reset
			setTimeout((): void => {
				centerWorkspace()
				Blockly.svgResize(workspace)
			}, 50)
		} catch (error) {
			console.error("Failed to reset workspace:", error)
		}
	}, [centerWorkspace, currentQuestionState, parsedInitialJson, onAnswerChange])

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
					onAnswerChange(currentQuestionState.question.questionId, parsedInitialJson, cppCode)
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
	}, [parsedInitialJson, currentQuestionState?.question.questionId, centerWorkspace, onAnswerChange])

	// Get current CPP code for SEND CODE button
	const getCurrentCppCode = (): string => {
		if (!currentQuestionState?.question) return ""
		const currentQuestion = currentQuestionState.question
		if (currentQuestion.questionType === "FILL_IN_BLANK") {
			return currentQuestion.fillInBlankAnswer?.cppCode || ""
		}
		if (currentQuestion.questionType === "ACTION_TO_CODE_OPEN_ENDED") {
			return currentQuestion.actionToCodeOpenEndedAnswer?.cppCode || ""
		}
		return ""
	}
	const currentCppCode = getCurrentCppCode()
	const isSendDisabled = isEmpty(currentCppCode) || pipClass.isSendingCppToPip

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

	if (!questionData) {
		return (
			<div className="text-center">
				<p className="text-gray-500 dark:text-gray-400">
					{errorMessage}
				</p>
			</div>
		)
	}

	const { questionText } = questionData

	return (
		<div className="flex flex-row min-h-0 flex-1 gap-0">
			{/* Left sidebar with question text and buttons */}
			<div className="flex flex-col border-swan border-l-2 border-t-2 border-b-2 rounded-l-3xl bg-polar min-w-[300px] max-w-[300px]">
				{/* Question text at top */}
				<div className="flex-1 p-6 flex items-start">
					<h2 className="text-xl font-semibold text-question-text">
						{questionText}
					</h2>
				</div>

				{/* Buttons at bottom */}
				<div className="flex flex-col gap-3 pt-3 pb-4 px-4">
					{renderLeftButtons && (
						<div className="w-full">
							{renderLeftButtons(questionData.referenceSolutionCpp)}
						</div>
					)}
					<div className="w-full">
						<AnimatedStateButton
							buttonText="SEND CODE"
							isDisabled={isSendDisabled}
							onClick={async (event): Promise<void> => {
								await sendCppToPip(currentCppCode, (event.currentTarget as HTMLButtonElement).getBoundingClientRect())
							}}
							className="rounded-2xl text-xl h-14"
						/>
					</div>
					<TactileButton
						className={cn(
							"bg-cardinal text-white duration-0 flex items-center justify-center",
							"h-14 w-full px-8 py-4 text-xl font-semibold rounded-2xl"
						)}
						shadowColor="rgb(150, 50, 75)"
						onClick={(): Promise<void> => stopCurrentlyRunningCode(false)}
					>
						STOP
					</TactileButton>
				</div>
			</div>

			{/* Blockly workspace area */}
			<div
				ref={containerRef}
				className={cn("relative z-0 rounded-r-3xl overflow-hidden border-swan border-r-2 border-t-2 border-b-2 flex-1 min-h-0")}
				style={{ pointerEvents: "auto" }}
			>
				<Button
					variant="outline"
					size="sm"
					onClick={(): void => { void resetWorkspace() }}
					className={cn(
						"absolute top-2 right-2 z-1 p-2 h-8 w-8 pointer-events-auto",
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
					className={cn(
						"h-full min-h-0 duration-0",
						"[&_.blocklyScrollbar]:pointer-events-auto",
						"[&_.blocklyScrollbarBackground]:pointer-events-auto",
						"[&_.blocklyScrollbarHandle]:pointer-events-auto"
					)}
					onWorkspaceChange={handleWorkspaceChange}
				/>
			</div>
		</div>
	)
}

export default observer(OpenEndedQuestion)


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
import learnClass from "../../classes/learn-class"
import personalInfoClass from "../../classes/personal-info-class"
import initializeBlocks from "../../utils/blockly/initialize-blocks"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../../utils/blockly/workspace-config"
import getCppGenerator from "../../utils/cpp/cpp-generator"
import AnimatedStateButton from "../magicui/animated-rainbow-button"
import sendCppToPip from "../../utils/sandbox/send-cpp-to-pip"
import pipClass from "../../classes/pip-class"
import isEmpty from "lodash-es/isEmpty"
// @ts-expect-error - No type definitions available for this plugin
import { Multiselect } from "@mit-app-inventor/blockly-plugin-workspace-multiselect"
import StopCodeButton from "../buttons/stop-code-button"
import { QuestionUUID } from "@lever-labs/common-ts/types/utils"

interface QuestionData {
	questionText: string
	initialBlocklyJson?: BlocklyJson
	availableBlocks?: Array<{ blockName: BlockNames }>
	referenceSolutionCpp?: string
}

interface OpenEndedQuestionProps {
	questionData: QuestionData
	onAnswerChange: (questionId: QuestionUUID, blocklyJson: BlocklyJson, cppCode: string) => void
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
	const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1024)

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

	// Calculate responsive scale based on window width
	const getResponsiveScale = useCallback((): number => {
		// Tailwind breakpoints: sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
		if (windowWidth < 640) {
			return 0.5 // Mobile: smaller scale
		} else if (windowWidth < 768) {
			return 0.6 // Small screens
		} else if (windowWidth < 1024) {
			return 0.7 // Medium screens
		} else if (windowWidth < 1280) {
			return 1.0 // Large screens
		} else if (windowWidth < 1536) {
			return 1.2 // Extra large screens
		} else if (windowWidth < 1920) {
			return 1.3 // Extra large screens
		} else if (windowWidth < 2560) {
			return 1.5 // Extra large screens
		}
		return 1.6 // Extra extra large screens
	}, [windowWidth])

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

	const responsiveScale = getResponsiveScale()

	const workspaceConfiguration = useMemo((): Blockly.BlocklyOptions => {
		const config = getWorkspaceConfig(isDarkMode, false, responsiveScale)
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
	}, [isDarkMode, responsiveScale])

	const centerWorkspace = useCallback((): void => {
		const workspace = workspaceRef.current
		if (!workspace) return

		const scale = responsiveScale
		workspace.setScale(scale)
		workspace.scrollCenter()
	}, [responsiveScale])

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

	// Track window width for responsive scaling
	useEffect((): () => void => {
		const handleResize = (): void => {
			setWindowWidth(window.innerWidth)
		}

		window.addEventListener("resize", handleResize)
		return (): void => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	// Update workspace scale when window width changes
	useEffect((): void => {
		const workspace = workspaceRef.current
		if (!workspace) return

		const scale = responsiveScale
		workspace.setScale(scale)
		Blockly.svgResize(workspace)
	}, [responsiveScale])

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
			<div className={cn(
				"flex flex-col min-h-0 border-swan border-l-2 border-t-2 border-b-2",
				"rounded-l-3xl bg-polar w-1/4"
			)}>
				{/* Question text at top - scrollable */}
				<div className="flex-1 min-h-0 overflow-y-auto p-6 flex items-start">
					<h2 className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-xl font-semibold text-question-text">
						{questionText}
					</h2>
				</div>

				{/* Buttons at bottom - always visible */}
				<div className="shrink-0 flex flex-col gap-3 pt-3 pb-4 px-4">
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
								if (currentQuestionState?.question.questionId) {
									await sendCppToPip(currentCppCode, (event.currentTarget as HTMLButtonElement).getBoundingClientRect())
									learnClass.recordCodeSent(currentQuestionState.question.questionId, currentCppCode)
								}
							}}
							className="rounded-2xl text-sm sm:text-sm md:text-sm lg:text-lg h-10 sm:h-9 md:h-9 lg:h-12"
							uploadClasses="size-3! sm:size-3! md:size-3! lg:size-4!"
						/>
					</div>
					<StopCodeButton
						className={cn(
							"h-10 sm:h-9 md:h-9 lg:h-12 w-full",
							"px-6 sm:px-5 md:px-5 lg:px-8",
							"py-3 sm:py-2.5 md:py-2.5 lg:py-4",
							"text-sm sm:text-sm md:text-sm lg:text-lg",
							"font-semibold rounded-2xl",
							"gap-2 sm:gap-2 md:gap-2 lg:gap-3"
						)}
						pauseClasses="size-3! sm:size-3! md:size-3! lg:size-4!"
					/>
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
						"duration-0 rounded-3xl"
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


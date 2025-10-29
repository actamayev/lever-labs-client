"use client"

import * as Blockly from "blockly"
import { observer } from "mobx-react"
import { BlocklyWorkspace } from "react-blockly"
import { BlocklyJson } from "@lever-labs/common-ts/types/sandbox"
import { BlockNames } from "@lever-labs/common-ts/types/blockly/blockly"
import { createChallengeToolbox } from "@lever-labs/common-ts/types/utils/blockly-helpers"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Play } from "lucide-react"
import { cn } from "../../lib/utils"
import { TactileButton } from "../buttons/tactile-button"
import learnClass from "../../classes/learn-class"
import personalInfoClass from "../../classes/personal-info-class"
import initializeBlocks from "../../utils/blockly/initialize-blocks"
import getWorkspaceConfig, { darkTheme, lightTheme } from "../../utils/blockly/workspace-config"
import getCppGenerator from "../../utils/cpp/cpp-generator"
import sendCppToPip from "../../utils/sandbox/send-cpp-to-pip"
// @ts-expect-error - No type definitions available for this plugin
import { Multiselect } from "@mit-app-inventor/blockly-plugin-workspace-multiselect"

// eslint-disable-next-line max-lines-per-function
function ActionToCodeOpenEndedQuestion(): React.ReactNode {
	const currentQuestionState = learnClass.currentQuestionState
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"
	const containerRef = useRef<HTMLDivElement>(null)
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const [blocksInitialized, setBlocksInitialized] = useState(false)
	const isFirstChangeRef = useRef(true)

	const actionToCodeOpenEnded = currentQuestionState?.question.actionToCodeOpenEnded

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
		if (!actionToCodeOpenEnded?.initialBlocklyJson) {
			return { blocks: { blocks: [] } }
		}
		return actionToCodeOpenEnded.initialBlocklyJson
	}, [actionToCodeOpenEnded?.initialBlocklyJson])

	// Create toolbox config from available blocks
	const toolboxConfig = useMemo((): Blockly.utils.toolbox.ToolboxDefinition => {
		if (!actionToCodeOpenEnded?.availableBlocks) {
			return { kind: "flyoutToolbox", contents: [] }
		}
		const blockNames = Array.from(new Set(
			actionToCodeOpenEnded.availableBlocks.map((block): BlockNames => block.blockName)
		))

		// Use createChallengeToolbox to generate the toolbox
		const blockData = createChallengeToolbox(blockNames)
		return blockData.toolboxConfig
	}, [actionToCodeOpenEnded?.availableBlocks])

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
			learnClass.setActionToCodeOpenEndedAnswer(currentQuestionState.question.questionId, newJson, cppCode)
		} catch (error) {
			console.error("Failed to generate CPP code:", error)
		}
	}, [centerWorkspace, currentQuestionState])

	const handlePlayDemo = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
		if (actionToCodeOpenEnded?.referenceSolutionCpp) {
			await sendCppToPip(
				actionToCodeOpenEnded.referenceSolutionCpp,
				(event.currentTarget as HTMLButtonElement).getBoundingClientRect()
			)
		}
	}

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
					learnClass.setActionToCodeOpenEndedAnswer(currentQuestionState.question.questionId, parsedInitialJson, cppCode)
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

	if (!actionToCodeOpenEnded) {
		return (
			<div className="text-center">
				<p className="text-gray-500 dark:text-gray-400">
					No action-to-code-open-ended data available
				</p>
			</div>
		)
	}

	const { questionText } = actionToCodeOpenEnded

	return (
		<div className="space-y-6 flex flex-col min-h-0 flex-1">
			<h2 className="text-3xl font-semibold text-question-text text-center">
				{questionText}
			</h2>

			<div className="flex justify-center">
				<TactileButton
					onClick={handlePlayDemo}
					shadowClass="shadow-charging-green-2"
					className={cn(
						"h-14 px-8 py-4 text-xl font-semibold rounded-2xl text-standard-background",
						"bg-charging-green duration-0 flex items-center gap-3"
					)}
					shadowHeight={4}
				>
					<Play className="size-6 fill-current" />
					PLAY DEMO
				</TactileButton>
			</div>
			<div
				ref={containerRef}
				className={cn("relative z-0 rounded-3xl overflow-hidden border-swan border-2 flex-1 min-h-0")}
				style={{ pointerEvents: "auto" }}
			>
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

export default observer(ActionToCodeOpenEndedQuestion)

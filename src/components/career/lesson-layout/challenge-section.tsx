"use client"

import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import isEqual from "lodash-es/isEqual"
import { useCallback, useEffect, useRef, useState } from "react"
import { BlocklyJson, CqChallengeData } from "@bluedotrobots/common-ts"
import { cn } from "../../../lib/shadcn/utils"
import ChallengeHeader from "./challenge-header"
import pipClass from "../../../classes/pip-class"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import getDuolingoColors from "../../../utils/get-duolingo-colors"
import sendCppToPip from "../../../utils/sandbox/send-cpp-to-pip"
import careerQuestClass from "../../../classes/career-quest-class"
import checkCareerQuestCode from "../../../utils/chat/check-cq-code"
import AnimatedStateButton from "../../magicui/animated-rainbow-button"
import generateCppFromJson from "../../../utils/cpp/generate-cpp-from-json"
import { stripBlockPositions } from "../../../utils/blockly/strip-blockly-positions"
import stopCurrentlyRunningCode from "../../../utils/sandbox/stop-currently-running-code"
import InteractiveMiniSandbox from "../../sandbox/interactive-mini-sandbox/interactive-mini-sandbox"
import editCareerQuestSandboxProject from "../../../utils/career-quest/edit-career-quest-sandbox-project"

function getBlockCount(blocklyJson: BlocklyJson): number {
	if (!blocklyJson.blocks?.blocks) return 0
	return blocklyJson.blocks.blocks.length
}

// Helper function to check if JSON is valid and non-empty
function isValidNonEmptyJson(blocklyJson: BlocklyJson): boolean {
	// Check if it's truly empty or just has workspace metadata

	if (!blocklyJson || typeof blocklyJson !== "object") return false

	// Must have blocks property
	if (!blocklyJson.blocks) return false

	// If blocks is empty or has no blocks array, it's empty
	if (!blocklyJson.blocks.blocks || blocklyJson.blocks.blocks.length === 0) return false

	return true
}

// eslint-disable-next-line max-lines-per-function
function ChallengeSection({ challengeData } : { challengeData: CqChallengeData }) {
	const isFirstChangeAfterInitRef = useRef(true)
	const hasInitializedRef = useRef(false)
	const hasSeenExpectedBlocksRef = useRef(false) // NEW: Track if we've seen the initial blocks load
	const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null) // NEW: Debounce saves
	const isStreaming = careerQuestClass.isChallengeStreaming(challengeData)
	const hasRetrievedData = careerQuestClass.hasRetrievedAllChallengesForCareer(challengeData.careerUUID)
	const [resetCounter, setResetCounter] = useState(0) // NEW: Track reset count

	const cppCode = careerQuestClass.getCppCode({ ...challengeData })

	const handleReset = useCallback(() => {
		const didReset = careerQuestClass.resetChallengeBlocklyJsonToInitial({ ...challengeData })
		if (!didReset) return
		setResetCounter(prev => prev + 1) // Increment reset counter to force remount
	}, [challengeData])

	// Debounced save function to prevent multiple rapid saves
	const debouncedSave = useCallback((blocklyJson: BlocklyJson) => {
		// Clear any existing timeout
		if (saveTimeoutRef.current) {
			clearTimeout(saveTimeoutRef.current)
		}

		// Set new timeout
		saveTimeoutRef.current = setTimeout(() => {
			editCareerQuestSandboxProject(challengeData.challengeUUID, blocklyJson)
			saveTimeoutRef.current = null
		}, 300) // 300ms debounce delay
	}, [challengeData.challengeUUID])

	// Add this ref to track the last processed JSON
	const lastProcessedJsonRef = useRef<BlocklyJson | null>(null)

	// Add this state to track the latest JSON that needs to be saved
	const [pendingBlocklyJson, setPendingBlocklyJson] = useState<BlocklyJson | null>(null)

	// Separate effect to handle class updates and backend saves
	useEffect(() => {
		if (!pendingBlocklyJson || !hasRetrievedData || !hasInitializedRef.current) return

		// Update career quest class
		careerQuestClass.updateBlocklyJson({ ...challengeData }, pendingBlocklyJson)

		// Save to backend with debounce
		debouncedSave(pendingBlocklyJson)

		// Update the last processed JSON ref
		lastProcessedJsonRef.current = pendingBlocklyJson

		// Clear the pending update
		setPendingBlocklyJson(null)
	}, [pendingBlocklyJson, hasRetrievedData, challengeData, debouncedSave])

	// eslint-disable-next-line complexity
	const handleJsonChange = useCallback((newBlocklyJson: BlocklyJson) => {
	// Get current JSON from class for comparison, but don't depend on it
		const currentJsonFromClass = careerQuestClass.getUpdatedBlocklyJson({ ...challengeData })
		const expectedBlockCount = getBlockCount(currentJsonFromClass)
		const actualBlockCount = getBlockCount(newBlocklyJson)

		// Skip the first change event which happens during workspace initialization
		if (isFirstChangeAfterInitRef.current) {
			isFirstChangeAfterInitRef.current = false

			// If we expect blocks but got wrong count, the workspace hasn't loaded yet
			if (expectedBlockCount > 0 && actualBlockCount !== expectedBlockCount) {
				isFirstChangeAfterInitRef.current = true // Keep skipping until workspace loads properly
				return
			}

			// Mark that we've seen the expected blocks if they match
			if (expectedBlockCount > 0 && actualBlockCount === expectedBlockCount) {
				hasSeenExpectedBlocksRef.current = true
			}

			hasInitializedRef.current = true
			lastProcessedJsonRef.current = newBlocklyJson // Set initial processed JSON
			return
		}

		// Track when we've seen the expected blocks (even after initialization)
		if (expectedBlockCount > 0 && actualBlockCount === expectedBlockCount && !hasSeenExpectedBlocksRef.current) {
			hasSeenExpectedBlocksRef.current = true
		}

		// Only skip empty JSON if we haven't seen the expected blocks yet
		if (!isValidNonEmptyJson(newBlocklyJson)) {
			if (!hasSeenExpectedBlocksRef.current && expectedBlockCount > 0) {
				isFirstChangeAfterInitRef.current = true
				hasInitializedRef.current = false
				return
			} else {
			// Continue to save the empty workspace
			}
		}

		// Compare against last processed JSON instead of class JSON to prevent loops
		const isEmptyWorkspace = !isValidNonEmptyJson(newBlocklyJson)
		const isIntentionalEmpty = isEmptyWorkspace && hasSeenExpectedBlocksRef.current

		// Check if this is the same as what we last processed
		// eslint-disable-next-line max-len
		if (lastProcessedJsonRef.current && isEqual(stripBlockPositions(newBlocklyJson), stripBlockPositions(lastProcessedJsonRef.current))) {
			return
		}

		// eslint-disable-next-line max-len
		if (!isIntentionalEmpty && lastProcessedJsonRef.current && isEqual(stripBlockPositions(newBlocklyJson), stripBlockPositions(lastProcessedJsonRef.current))) {
			return
		}

		// Update local state
		careerQuestClass.setCppCode({ ...challengeData }, generateCppFromJson(newBlocklyJson))

		// Queue the JSON for class update and backend save (handled by separate effect)
		setPendingBlocklyJson(newBlocklyJson)
	}, [challengeData])

	// Reset effects
	useEffect(() => {
		// Clear any pending saves when switching challenges
		if (saveTimeoutRef.current) {
			clearTimeout(saveTimeoutRef.current)
			saveTimeoutRef.current = null
		}

		// Clear any pending updates
		setPendingBlocklyJson(null)

		// Reset refs
		isFirstChangeAfterInitRef.current = true
		hasInitializedRef.current = false
		hasSeenExpectedBlocksRef.current = false
		lastProcessedJsonRef.current = null // Reset the last processed JSON

		// Add a small delay to ensure workspace is fully ready before processing changes
		const timer = setTimeout(() => {}, 100)

		return () => {
			clearTimeout(timer)
			// Clear save timeout on cleanup
			if (saveTimeoutRef.current) {
				clearTimeout(saveTimeoutRef.current)
				saveTimeoutRef.current = null
			}
		}
	}, [challengeData.challengeUUID, hasRetrievedData])

	// Create a stable workspace key - only change when challenge changes
	const workspaceKey = `${challengeData.challengeUUID}-${hasRetrievedData ? "retrieved" : "initial"}-${resetCounter}`
	const foxColors = getDuolingoColors("fox")

	return (
		<div className="flex flex-col h-full">
			{/* Challenge Header */}
			<ChallengeHeader challengeData={challengeData} onReset={handleReset} />

			{/* Sandbox Section - Middle (flexible height) */}
			<div className="h-full flex flex-col">
				<div className="flex-1 min-h-0">
					<InteractiveMiniSandbox
						key={workspaceKey}
						careerUUIDChallengeUUID={{ ...challengeData }}
						onJsonChange={handleJsonChange}
					/>
				</div>

				{/* Action Buttons Section - Bottom */}
				<div className="flex-shrink-0 flex gap-3 p-3">
					<AnimatedStateButton
						buttonText="SEND CODE"
						isDisabled={isEmpty(cppCode) || pipClass.isSendingCppToPip}
						onClick={(event) => sendCppToPip(cppCode, event.currentTarget.getBoundingClientRect())}
						className="flex-1 duration-150 rounded-xl text-xl h-12 font-semibold"
					/>
					<TactileButton
						className={cn(
							"flex-1 text-white flex items-center justify-center rounded-xl text-xl h-12 font-semibold",
							foxColors.bg
						)}
						shadowClass={foxColors.shadow2}
						onClick={() => checkCareerQuestCode({ ...challengeData })}
						disabled={isStreaming || isEmpty(cppCode)}
					>
						CHECK CODE
					</TactileButton>
					<TactileButton
						className="bg-cardinal text-white flex items-center justify-center w-24 rounded-xl text-xl h-12 font-semibold"
						shadowColor="rgb(150, 50, 75)"
						onClick={stopCurrentlyRunningCode}
					>
						STOP
					</TactileButton>
				</div>
			</div>
		</div>
	)
}

export default observer(ChallengeSection)

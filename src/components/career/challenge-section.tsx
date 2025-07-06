"use client"

import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import debounce from "lodash-es/debounce"
import { useCallback, useEffect, useRef, useState } from "react"
import { BlocklyJson, ChallengeData } from "@bluedotrobots/common-ts"
import { cn } from "../../lib/shadcn/utils"
import pipClass from "../../classes/pip-class"
import CqChatInterface from "./chat/cq-chat-interface"
import { TactileButton } from "../shadcn/ui/tactile-button"
import sendCppToPip from "../../utils/sandbox/send-cpp-to-pip"
import AnimatedStateButton from "../magicui/animated-rainbow-button"
import generateCppFromJson from "../../utils/cpp/generate-cpp-from-json"
import stopCurrentlyRunningCode from "../../utils/sandbox/stop-currently-running-code"
import InteractiveMiniSandbox from "../sandbox/interactive-mini-sandbox/interactive-mini-sandbox"
import editCareerQuestSandboxProject from "../../utils/career-quest/edit-career-quest-sandbox-project"
import careerQuestClass from "../../classes/career-quest-class"
import retrieveCareerQuestChallengeData from "../../utils/career-quest/retrieve-career-quest-challenge-data"

interface Props {
	challengeData: ChallengeData
	extraClasses?: string
}

// eslint-disable-next-line max-lines-per-function
function ChallengeSection(props: Props) {
	const {
		challengeData,
		extraClasses = "h-full"
	} = props

	// Initialize challenge in career quest class and get extended data
	useEffect(() => {
		careerQuestClass.initializeChallenge(challengeData)
		// Retrieve backend data (chat messages + sandbox JSON)
		retrieveCareerQuestChallengeData(challengeData.id)
	}, [challengeData])

	// Get the current blockly JSON (either initial or updated from backend)
	const currentBlocklyJson = careerQuestClass.getUpdatedBlocklyJson(challengeData.id) || challengeData.initialBlocklyJson
	const [cppCode, setCppCode] = useState(generateCppFromJson(currentBlocklyJson))
	const [isMountedLongEnough, setIsMountedLongEnough] = useState(false)

	// Update CPP code when blockly JSON changes
	useEffect(() => {
		const newCppCode = generateCppFromJson(currentBlocklyJson)
		setCppCode(newCppCode)
	}, [currentBlocklyJson])

	// Add a timer to track when component has been mounted for 1 second
	useEffect(() => {
		// This is here to prevent the edit from being triggered too early
		const timer = setTimeout(() => {
			setIsMountedLongEnough(true)
		}, 500)

		return () => clearTimeout(timer)
	}, [])

	const debouncedSaveProject = useRef(
		debounce((newBlocklyJson: BlocklyJson) => {
			editCareerQuestSandboxProject(challengeData.id, newBlocklyJson)
		}, 250)
	).current

	// Clean up debounce on unmount
	useEffect(() => {
		return () => debouncedSaveProject.cancel()
	}, [debouncedSaveProject])

	const handleJsonChange = useCallback((newBlocklyJson: BlocklyJson) => {
		if (newBlocklyJson.sandboxJson === newBlocklyJson) return

		// Update local state
		setCppCode(generateCppFromJson(newBlocklyJson))

		// Update career quest class
		careerQuestClass.updateBlocklyJson(challengeData.id, newBlocklyJson)

		// Only trigger the save if we're past the initial mounting period AND backend data has been retrieved
		if (isMountedLongEnough && careerQuestClass.hasRetrievedMessages(challengeData.id)) {
			debouncedSaveProject(newBlocklyJson)
		}
	}, [challengeData.id, isMountedLongEnough, debouncedSaveProject])

	return (
		<div className={cn("flex flex-col h-full max-h-screen overflow-hidden", extraClasses)}>
			{/* Main content area with three columns */}
			<div className="flex flex-row flex-1 gap-4 p-4 min-h-0">
				{/* Left Panel - Full height */}
				<div className="flex flex-col w-1/4 bg-standardBackground
				rounded-lg border-2 border-swan p-4 max-h-full overflow-y-auto">
					{/* Description section (2/3 height) */}
					<div className="flex-[2] mb-4">
						<h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
							What this code does:
						</h3>
						<div className="text-gray-700 dark:text-gray-300 leading-relaxed">
							{challengeData.description}
						</div>
					</div>

					{/* Before running section (1/3 height) */}
					<div className="flex-1 border-t border-gray-200 dark:border-gray-600 pt-4">
						<h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
							Before running code, make sure:
						</h3>
						<div className="text-gray-700 dark:text-gray-300 leading-relaxed">
							{challengeData.beforeRunningText}
						</div>
					</div>
				</div>

				{/* Middle Column - Sandbox + Buttons */}
				<div className="flex flex-col flex-1 max-h-full">
					<InteractiveMiniSandbox
						toolboxConfig={challengeData.toolboxConfig}
						initialBlocklyJson={currentBlocklyJson}
						extraClasses="h-full"
						onJsonChange={handleJsonChange}
					/>

					{/* Buttons section - Only under sandbox */}
					<div className="flex flex-row space-x-2 items-center justify-center pt-2 flex-shrink-0">
						<AnimatedStateButton
							buttonText="SEND CODE"
							isDisabled={isEmpty(cppCode) || pipClass.isSendingCppToPip}
							onClick={(event) => sendCppToPip(cppCode, event.currentTarget.getBoundingClientRect())}
							className="duration-150 rounded-xl text-4xl"
						/>
						<TactileButton
							className="h-full -mt-1 bg-cardinal flex items-center justify-center w-auto rounded-xl text-4xl !px-10"
							shadowColor="rgb(150, 50, 75)"
							onClick={stopCurrentlyRunningCode}
						>
							STOP
						</TactileButton>
					</div>
				</div>

				{/* Right Panel - Chat Interface Full height */}
				<div className="w-1/3 max-h-full">
					<CqChatInterface
						cppCode={cppCode}
						challengeData={challengeData}
					/>
				</div>
			</div>
		</div>
	)
}

export default observer(ChallengeSection)

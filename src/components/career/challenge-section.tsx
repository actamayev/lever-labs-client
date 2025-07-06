"use client"

import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import isEqual from "lodash-es/isEqual"
import { useCallback, useEffect, useRef, useState } from "react"
import { BlocklyJson, ChallengeData } from "@bluedotrobots/common-ts"
import { cn } from "../../lib/shadcn/utils"
import pipClass from "../../classes/pip-class"
import CqChatInterface from "./chat/cq-chat-interface"
import { TactileButton } from "../shadcn/ui/tactile-button"
import sendCppToPip from "../../utils/sandbox/send-cpp-to-pip"
import careerQuestClass from "../../classes/career-quest-class"
import AnimatedStateButton from "../magicui/animated-rainbow-button"
import generateCppFromJson from "../../utils/cpp/generate-cpp-from-json"
import { stripBlockPositions } from "../../utils/blockly/strip-blockly-positions"
import stopCurrentlyRunningCode from "../../utils/sandbox/stop-currently-running-code"
import InteractiveMiniSandbox from "../sandbox/interactive-mini-sandbox/interactive-mini-sandbox"
import editCareerQuestSandboxProject from "../../utils/career-quest/edit-career-quest-sandbox-project"
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
	const isFirstChangeAfterInitRef = useRef(true)

	// Initialize challenge in career quest class and get extended data
	useEffect(() => {
		careerQuestClass.initializeChallenge(challengeData)
		// Retrieve backend data (chat messages + sandbox JSON)
		retrieveCareerQuestChallengeData(challengeData.id)
	}, [challengeData])

	// Get the current blockly JSON (either initial or updated from backend)
	const currentBlocklyJson = careerQuestClass.getUpdatedBlocklyJson(challengeData.id) || challengeData.initialBlocklyJson
	const hasRetrievedData = careerQuestClass.hasRetrievedMessages(challengeData.id)

	const [cppCode, setCppCode] = useState(generateCppFromJson(currentBlocklyJson))

	// Update CPP code when blockly JSON changes
	useEffect(() => {
		const newCppCode = generateCppFromJson(currentBlocklyJson)
		setCppCode(newCppCode)
	}, [currentBlocklyJson])

	const handleJsonChange = useCallback((newBlocklyJson: BlocklyJson) => {
		// Skip the first change event which happens during workspace initialization
		if (isFirstChangeAfterInitRef.current) {
			isFirstChangeAfterInitRef.current = false
			return
		}

		// Compare stripped versions to ignore position changes
		const currentJson = careerQuestClass.getUpdatedBlocklyJson(challengeData.id)
		if (currentJson && isEqual(stripBlockPositions(newBlocklyJson), stripBlockPositions(currentJson))) {
			return // No meaningful changes, don't save
		}

		// Update local state with full JSON (including positions)
		setCppCode(generateCppFromJson(newBlocklyJson))

		// Update career quest class
		careerQuestClass.updateBlocklyJson(challengeData.id, newBlocklyJson)

		// Save immediately if we've retrieved messages from backend
		if (careerQuestClass.hasRetrievedMessages(challengeData.id)) {
			editCareerQuestSandboxProject(challengeData.id, newBlocklyJson)
		}
	}, [challengeData.id])

	// Reset the flag when switching between challenges
	useEffect(() => {
		isFirstChangeAfterInitRef.current = true
	}, [challengeData.id])

	const workspaceKey = `${challengeData.id}-${hasRetrievedData ? "retrieved" : "initial"}`

	return (
		<div className={cn("flex flex-col h-full max-h-screen overflow-hidden", extraClasses)}>
			{/* Main content area with three columns */}
			<div className="flex flex-row flex-1 gap-4 p-4 min-h-0">
				{/* Left Panel - Full height */}
				<div className="flex flex-col w-1/4 bg-standardBackground
				rounded-lg border-2 border-swan p-4 max-h-full overflow-y-auto">
					{/* Description section (2/3 height) */}
					<div className="flex-[2] mb-4">
						<h3 className="text-lg font-semibold mb-3 text-questionText">
							What this code does:
						</h3>
						<div className="text-eel leading-relaxed">
							{challengeData.description}
						</div>
					</div>

					{/* Before running section (1/3 height) */}
					<div className="flex-1 border-t border-swan pt-4">
						<h3 className="text-lg font-semibold mb-3 text-questionText">
							Before running code, make sure:
						</h3>
						<div className="text-eel leading-relaxed">
							{challengeData.beforeRunningText}
						</div>
					</div>
				</div>

				{/* Middle Column - Sandbox + Buttons */}
				<div className="flex flex-col flex-1 max-h-full">
					<InteractiveMiniSandbox
						key={workspaceKey} // This will force remount when data is retrieved
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

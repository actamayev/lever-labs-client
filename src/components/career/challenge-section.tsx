"use client"

import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import isEqual from "lodash-es/isEqual"
import { useCallback, useEffect, useRef, useState } from "react"
import { BlocklyJson, CqChallengeData } from "@bluedotrobots/common-ts"
import { cn } from "../../lib/shadcn/utils"
import pipClass from "../../classes/pip-class"
import { Separator } from "../shadcn/ui/separator"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { CustomLightbulb } from "../icons/custom-lightbulb"
import getDuolingoColors from "../../utils/get-duolingo-colors"
import sendCppToPip from "../../utils/sandbox/send-cpp-to-pip"
import careerQuestClass from "../../classes/career-quest-class"
import checkCareerQuestCode from "../../utils/chat/check-cq-code"
import AnimatedStateButton from "../magicui/animated-rainbow-button"
import requestCareerQuestHint from "../../utils/chat/request-cq-hint"
import generateCppFromJson from "../../utils/cpp/generate-cpp-from-json"
import { stripBlockPositions } from "../../utils/blockly/strip-blockly-positions"
import stopCurrentlyRunningCode from "../../utils/sandbox/stop-currently-running-code"
import InteractiveMiniSandbox from "../sandbox/interactive-mini-sandbox/interactive-mini-sandbox"
import editCareerQuestSandboxProject from "../../utils/career-quest/edit-career-quest-sandbox-project"

// eslint-disable-next-line max-lines-per-function
function ChallengeSection({ challengeData } : { challengeData: CqChallengeData }) {
	const isFirstChangeAfterInitRef = useRef(true)
	const isStreaming = careerQuestClass.isChallengeStreaming(challengeData)

	// Get the current blockly JSON (either initial or updated from backend)
	const currentBlocklyJson = careerQuestClass.getUpdatedBlocklyJson({ ...challengeData }) || challengeData.initialBlocklyJson
	const hasRetrievedData = careerQuestClass.hasRetrievedChallengeMessages(challengeData)

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
		const currentJson = careerQuestClass.getUpdatedBlocklyJson({ ...challengeData })
		if (currentJson && isEqual(stripBlockPositions(newBlocklyJson), stripBlockPositions(currentJson))) {
			return // No meaningful changes, don't save
		}

		// Update local state with full JSON (including positions)
		setCppCode(generateCppFromJson(newBlocklyJson))

		// Update career quest class
		careerQuestClass.updateBlocklyJson({ ...challengeData }, newBlocklyJson)

		// Save immediately if we've retrieved messages from backend
		if (careerQuestClass.hasRetrievedChallengeMessages(challengeData)) {
			editCareerQuestSandboxProject(challengeData.challengeId, newBlocklyJson)
		}
	}, [challengeData])

	// Reset the flag when switching between challenges
	useEffect(() => {
		isFirstChangeAfterInitRef.current = true
	}, [challengeData.challengeId, hasRetrievedData])

	const workspaceKey = `${challengeData.challengeId}-${hasRetrievedData ? "retrieved" : "initial"}`

	const foxColors = getDuolingoColors("fox")

	return (
		<div className="flex flex-col h-[600px] w-full overflow-hidden mb-8">
			{/* Main content area with three columns */}
			<div className="flex flex-row flex-1 gap-4 p-4 min-h-0">
				{/* Left Panel - Full height */}
				<div className="flex flex-col w-1/4 bg-standardBackground
				rounded-lg border-2 border-swan p-4 h-full overflow-y-auto">
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
					<Separator orientation="horizontal" className="rounded-full h-0.5" />

					<div className="flex-[1] pt-4 mb-4">
						<h3 className="text-lg font-semibold mb-3 text-questionText">
							Before running code, make sure:
						</h3>
						<div className="text-eel leading-relaxed">
							{challengeData.beforeRunningText}
						</div>
					</div>

					{/* Hint button section */}
					<Separator orientation="horizontal" className="rounded-full h-0.5" />

					<div className="pt-4">
						<TactileButton
							className="w-full bg-beetle-2 text-white rounded-xl text-lg font-semibold py-3"
							shadowColor="rgb(140, 80, 200)"
							onClick={() => requestCareerQuestHint({
								careerId: challengeData.careerId,
								challengeId: challengeData.challengeId
							}, cppCode)}
							disabled={isStreaming}
						>
							<CustomLightbulb className="w-4 h-4" />
							GET A HINT
						</TactileButton>
					</div>
				</div>

				{/* Middle Column - Sandbox + Buttons */}
				<div className="flex flex-col flex-1 h-full">
					<div className="flex-1 min-h-0"> {/* Container for sandbox with proper height constraint */}
						<InteractiveMiniSandbox
							key={workspaceKey} // This will force remount when data is retrieved
							toolboxConfig={challengeData.toolboxConfig}
							initialBlocklyJson={currentBlocklyJson}
							extraClasses="h-full"
							onJsonChange={handleJsonChange}
						/>
					</div>

					{/* Buttons section - Only under sandbox */}
					<div className="flex flex-row space-x-2 items-center justify-center pt-2 flex-shrink-0">
						<AnimatedStateButton
							buttonText="SEND CODE"
							isDisabled={isEmpty(cppCode) || pipClass.isSendingCppToPip}
							onClick={(event) => sendCppToPip(cppCode, event.currentTarget.getBoundingClientRect())}
							className="duration-150 rounded-xl text-3xl h-12"
						/>
						<TactileButton
							className={cn(
								"text-white flex items-center justify-center w-auto rounded-xl text-3xl h-12",
								foxColors.bg
							)}
							shadowClass={foxColors.shadow2}
							onClick={() => checkCareerQuestCode({
								careerId: challengeData.careerId,
								challengeId: challengeData.challengeId
							}, cppCode)}
							disabled={isStreaming || isEmpty(cppCode)}
						>
							CHECK CODE
						</TactileButton>
						<TactileButton
							className="bg-cardinal flex items-center justify-center w-auto rounded-xl text-4xl h-12"
							shadowColor="rgb(150, 50, 75)"
							onClick={stopCurrentlyRunningCode}
						>
							STOP
						</TactileButton>
					</div>
				</div>
			</div>
		</div>
	)
}

export default observer(ChallengeSection)

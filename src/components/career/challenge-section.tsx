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
		<div className="flex flex-col h-full p-4 gap-4">
			{/* Challenge Title */}
			<div className="text-center flex-shrink-0">
				<h2 className="text-xl font-bold text-questionText">
					{challengeData.title}
				</h2>
			</div>

			{/* Description Section with Hint Button */}
			<div className="flex-shrink-0 flex gap-4 max-h-[25%]">
				{/* Two-column description card */}
				<div className="flex-1 bg-standardBackground rounded-lg border-2 border-swan p-4 flex gap-4 overflow-hidden">
					{/* Left Column - Description */}
					<div className="flex-1 overflow-y-auto">
						<h3 className="text-base font-semibold mb-2 text-questionText">
							What this code does:
						</h3>
						<p className="text-sm text-eel leading-relaxed">
							{challengeData.description}
						</p>
					</div>

					{/* Vertical Separator */}
					<Separator orientation="vertical" className="h-full w-0.5 rounded-full" />

					{/* Right Column - Before Running */}
					<div className="flex-1 overflow-y-auto">
						{challengeData.beforeRunningText ? (
							<>
								<h3 className="text-base font-semibold mb-2 text-questionText">
									Before running code, make sure to:
								</h3>
								<p className="text-sm text-eel leading-relaxed">
									{challengeData.beforeRunningText}
								</p>
							</>
						) : (
							<div className="flex items-center justify-center h-full text-gray-400">
								<p className="text-sm">No special instructions</p>
							</div>
						)}
					</div>
				</div>

				{/* Standalone Hint Button */}
				<div className="flex-shrink-0">
					<TactileButton
						className="bg-beetle-2 text-white rounded-lg p-3 h-fit"
						shadowColor="rgb(140, 80, 200)"
						onClick={() => requestCareerQuestHint({
							careerId: challengeData.careerId,
							challengeId: challengeData.challengeId
						}, cppCode)}
						disabled={isStreaming}
					>
						<CustomLightbulb className="w-5 h-5" />
					</TactileButton>
				</div>
			</div>

			{/* Sandbox Section - Middle (flexible height) */}
			<div className="flex-1 min-h-0">
				<InteractiveMiniSandbox
					key={workspaceKey}
					toolboxConfig={challengeData.toolboxConfig}
					initialBlocklyJson={currentBlocklyJson}
					extraClasses="h-full"
					onJsonChange={handleJsonChange}
				/>
			</div>

			{/* Action Buttons Section - Bottom */}
			<div className="flex-shrink-0 flex gap-3">
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
					onClick={() => checkCareerQuestCode({
						careerId: challengeData.careerId,
						challengeId: challengeData.challengeId
					}, cppCode)}
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
	)
}

export default observer(ChallengeSection)

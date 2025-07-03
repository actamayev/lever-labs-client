"use client"

import { useState } from "react"
import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import { ChallengeData } from "@bluedotrobots/common-ts"
import { cn } from "../../lib/shadcn/utils"
import pipClass from "../../classes/pip-class"
import CqChatInterface from "./chat/cq-chat-interface"
import { TactileButton } from "../shadcn/ui/tactile-button"
import sendCppToPip from "../../utils/sandbox/send-cpp-to-pip"
import AnimatedStateButton from "../magicui/animated-rainbow-button"
import generateCppFromJson from "../../utils/cpp/generate-cpp-from-json"
import stopCurrentlyRunningCode from "../../utils/sandbox/stop-currently-running-code"
import InteractiveMiniSandbox from "../sandbox/interactive-mini-sandbox/interactive-mini-sandbox"

interface Props {
	challengeData: ChallengeData
	extraClasses?: string
}

function ChallengeSection(props: Props) {
	const {
		challengeData,
		extraClasses = "h-full"
	} = props
	const [cppCode, setCppCode] = useState(generateCppFromJson(challengeData.initialBlocklyJson))

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
						initialBlocklyJson={challengeData.initialBlocklyJson}
						extraClasses="h-full"
						onJsonChange={(newBlocklyJson) => (setCppCode(generateCppFromJson(newBlocklyJson)))}
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

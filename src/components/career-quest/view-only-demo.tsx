"use client"

import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import { useState } from "react"
import { cn } from "../../lib/shadcn/utils"
import pipClass from "../../classes/pip-class"
import { TactileButton } from "../shadcn/ui/tactile-button"
import AnimatedStateButton from "../magicui/animated-rainbow-button"
import sendCppToPip from "../../utils/sandbox/send-cpp-to-pip"
import stopCurrentlyRunningCode from "../../utils/sandbox/stop-currently-running-code"
import ChatInterface from "./chat/chat-interface"
import ViewOnlySandbox from "../sandbox/view-only-sandbox/view-only-sandbox"

interface Props {
	initialXml: string
	description: string
	beforeRunningText: string
	extraClasses?: string
}

function ViewOnlyDemo(props: Props) {
	const {
		initialXml,
		description,
		beforeRunningText,
		extraClasses = ""
	} = props

	const [cppCode, setCppCode] = useState("")

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
							{description}
						</div>
					</div>

					{/* Before running section (1/3 height) */}
					<div className="flex-1 border-t border-gray-200 dark:border-gray-600 pt-4">
						<h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
							Before running code, make sure:
						</h3>
						<div className="text-gray-700 dark:text-gray-300 leading-relaxed">
							{beforeRunningText}
						</div>
					</div>
				</div>

				{/* Middle Column - Sandbox + Buttons */}
				<div className="flex flex-col flex-1 max-h-full">
					{/* View Only Sandbox */}
					<div className="flex-1">
						<ViewOnlySandbox
							initialXml={initialXml}
							setCppCode={setCppCode}
							extraClasses="h-full"
						/>
					</div>

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
					<ChatInterface />
				</div>
			</div>
		</div>
	)
}

export default observer(ViewOnlyDemo)

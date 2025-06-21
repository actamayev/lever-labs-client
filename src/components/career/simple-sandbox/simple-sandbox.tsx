import { useState } from "react"
import isEmpty from "lodash-es/isEmpty"
import { BlocklyJson } from "@bluedotrobots/common-ts"
import { cn } from "../../../lib/shadcn/utils"
import { Button } from "../../shadcn/ui/button"
import pipClass from "../../../classes/pip-class"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import sendCppToPip from "../../../utils/sandbox/send-cpp-to-pip"
import AnimatedStateButton from "../../magicui/animated-rainbow-button"
import ViewOnlySandbox from "../../sandbox/view-only-sandbox/view-only-sandbox"
import stopCurrentlyRunningCode from "../../../utils/sandbox/stop-currently-running-code"

interface Props {
	blocklyJson: BlocklyJson
	cppCode: string
}

export default function SimpleSandbox(props: Props) {
	const { blocklyJson, cppCode } = props
	const [showCode, setShowCode] = useState(false)

	return (
		<>
			{/* Main view area with toggle button */}
			<div className="flex-1 relative">
				{/* Toggle button in top right */}
				<Button
					onClick={() => setShowCode(!showCode)}
					// eslint-disable-next-line max-len
					className="absolute top-2 right-2 z-10 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-150 shadow-md"
				>
					{showCode ? "Show Blocks" : "Show Code"}
				</Button>

				{/* Conditional content */}
				{!showCode ? (
					<ViewOnlySandbox
						blocklyJson={blocklyJson}
						extraClasses="h-full"
					/>
				) : (
					<div className="h-full border-2 border-swan rounded-lg overflow-hidden">
						<div className="h-full flex flex-col">
							{/* Code Content */}
							<div className="flex-1 overflow-auto">
								<pre className={cn(
									"h-full w-full p-4 text-sm font-mono",
									"bg-white dark:bg-gray-900",
									"text-gray-800 dark:text-gray-200",
									"whitespace-pre-wrap break-words",
									"resize-none outline-none"
								)}>
									{cppCode}
								</pre>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Buttons section - Only under main view */}
			<div className="flex flex-row space-x-2 items-center justify-center pt-2 flex-shrink-0">
				<AnimatedStateButton
					buttonText="SEND CODE"
					isDisabled={isEmpty(cppCode) || pipClass.isSendingCppToPip}
					onClick={(event) => sendCppToPip(cppCode, event.currentTarget.getBoundingClientRect())}
					className="duration-150 rounded-xl text-xl"
				/>
				<TactileButton
					className="h-full -mt-1 bg-cardinal flex items-center justify-center w-auto rounded-xl text-xl !px-10"
					shadowColor="rgb(150, 50, 75)"
					onClick={stopCurrentlyRunningCode}
				>
					STOP
				</TactileButton>
			</div>
		</>
	)
}

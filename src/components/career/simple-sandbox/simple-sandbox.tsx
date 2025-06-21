import isEmpty from "lodash-es/isEmpty"
import pipClass from "../../../classes/pip-class"
import { TactileButton } from "../../shadcn/ui/tactile-button"
import sendCppToPip from "../../../utils/sandbox/send-cpp-to-pip"
import AnimatedStateButton from "../../magicui/animated-rainbow-button"
import ViewOnlySandbox from "../../sandbox/view-only-sandbox/view-only-sandbox"
import stopCurrentlyRunningCode from "../../../utils/sandbox/stop-currently-running-code"
import { BlocklyJson } from "@bluedotrobots/common-ts"

interface Props {
	blocklyJson: BlocklyJson
	cppCode: string
}

export default function SimpleSandbox(props: Props) {
	const { blocklyJson, cppCode } = props

	return (
		<>
			<div className="flex-1">
				<ViewOnlySandbox
					blocklyJson={blocklyJson}
					extraClasses="h-full"
				/>
			</div>

			{/* Buttons section - Only under sandbox */}
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

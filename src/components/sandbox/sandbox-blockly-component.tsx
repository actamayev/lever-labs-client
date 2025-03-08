import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import { useState, useCallback, lazy, Suspense } from "react"
import { BlueTactileButton } from "../buttons/tactile-buttons"
import { usePipContext } from "../../contexts/pip-context"
import useSendCppToPip from "../../hooks/pip/send-cpp-to-pip"
import { toolboxConfig } from "../../utils/blockly/toolbox-config"

const BlocklyComponent = lazy(() => import("../blockly-component"))

function SandboxBlocklyComponent() {
	const [cppCode, setCppCode] = useState("")
	const pipClass = usePipContext()
	const sendCppToPip = useSendCppToPip()

	const sendCodeToCppCallback = useCallback(async () => {
		await sendCppToPip(cppCode)
	}, [cppCode, sendCppToPip])

	return (
		<div className="h-screen w-full p-4 mt-4">
			<Suspense>
				<BlocklyComponent
					toolboxConfig={toolboxConfig}
					setCppCode={setCppCode}
				/>
			</Suspense>
			<div className="mt-4">
				<h3 className="text-lg font-bold text-black dark:text-white">Generated C++</h3>
				<pre className="bg-sidebarButtonHover dark:text-white p-4 rounded transition-all duration-300">
					{cppCode}
				</pre>
			</div>
			<BlueTactileButton
				onClick={sendCodeToCppCallback}
				disabled={isEmpty(cppCode) || pipClass.isSendingCppToPip}
				className="mt-2"
			>
				SEND TO {pipClass.selectedPip?.pipName}
			</BlueTactileButton>
		</div>
	)
}

export default observer(SandboxBlocklyComponent)

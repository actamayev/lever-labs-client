"use client"

import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import { useState, useCallback, lazy, Suspense } from "react"
import { usePipContext } from "../../contexts/pip-context"
import useSendCppToPip from "../../hooks/pip/send-cpp-to-pip"
import { BlueTactileButton } from "../buttons/tactile-buttons"
import { toolboxConfig } from "../../utils/blockly/toolbox-config"

// TODO: Bring this component into `/sandbox/uuid`
const BlocklyComponent = lazy(() => import("./blockly-component"))

function SandboxBlocklyComponent() {
	const [cppCode, setCppCode] = useState("")
	const pipClass = usePipContext()
	const sendCppToPip = useSendCppToPip()

	const sendCodeToCppCallback = useCallback(async () => {
		await sendCppToPip(cppCode)
	}, [cppCode, sendCppToPip])

	return (
		<div className="h-screen overflow-y-auto relative w-full py-4 px-10 mt-2.5">
			{/* <Suspense>
				<BlocklyComponent
					toolboxConfig={toolboxConfig}
					setCppCode={setCppCode}
				/>
			</Suspense> */}
			<div className="mt-4">
				<h3 className="text-lg font-bold text-questionText">Generated C++</h3>
				<pre className="bg-polar text-questionText p-4 rounded duration-0 text-base">
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

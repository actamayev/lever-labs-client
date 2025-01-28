import isEmpty from "lodash-es/isEmpty"
import { observer } from "mobx-react"
import { useState, useCallback, lazy, Suspense } from "react"
import { Button } from "../shadcn/ui/button"
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
				<pre className="bg-zinc-100 dark:bg-zinc-800 dark:text-white p-4 rounded transition-all duration-300">
					{cppCode}
				</pre>
			</div>
			<Button
				onClick={sendCodeToCppCallback}
				disabled={isEmpty(cppCode) || pipClass.isSendingCppToPip}
				className="mt-2 transition-none"
				variant="tactile"
			>
				Send code to Pip
			</Button>
		</div>
	)
}

export default observer(SandboxBlocklyComponent)

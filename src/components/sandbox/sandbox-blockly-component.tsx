import isNull from "lodash-es/isNull"
import * as Blockly from "blockly"
import isEmpty from "lodash-es/isEmpty"
import { observer } from "mobx-react"
import { useState, useEffect, useCallback, useRef, lazy, Suspense } from "react"
import { Button } from "../shadcn/ui/button"
import { usePipContext } from "../../contexts/pip-context"
import useSendCppToPip from "../../hooks/pip/send-cpp-to-pip"
import { toolboxConfig } from "../../utils/blockly/toolbox-config"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"
import useInitializeBlocks from "../../hooks/blockly/initialize-blocks"
import { darkTheme, lightTheme } from "../../utils/blockly/workspace-config"

const BlocklyComponent = lazy(() => import("../blockly-component"))

function SandboxBlocklyComponent() {
	const [cppCode, setCppCode] = useState("")
	const pipClass = usePipContext()
	const sendCppToPip = useSendCppToPip()
	const initializeBlocks = useInitializeBlocks()
	const defaultSiteTheme = useDefaultSiteTheme()
	const isDarkMode = defaultSiteTheme === "dark"
	const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!containerRef.current) return

		const resizeObserver = new ResizeObserver(() => {
			if (workspaceRef.current) {
				Blockly.svgResize(workspaceRef.current)
			}
		})

		resizeObserver.observe(containerRef.current)

		return () => {
			resizeObserver.disconnect()
		}
	}, [])

	useEffect(() => {
		if (workspaceRef.current) {
			workspaceRef.current.setTheme(isDarkMode ? darkTheme : lightTheme)
		}
	}, [isDarkMode])

	const disableFlyoutAutoclose = useCallback(() => {
		if (!workspaceRef.current) return // Exit if workspace isn't ready

		const toolbox = workspaceRef.current.getToolbox()
		// const workspace = Blockly.getMainWorkspace() as Blockly.WorkspaceSvg

		// const toolbox = workspace.getToolbox()
		if (!toolbox) return

		const flyout = toolbox.getFlyout()
		if (isNull(flyout)) return
		flyout.autoClose = false
	}, [])

	useEffect(() => {
		initializeBlocks()
		disableFlyoutAutoclose()
		// TODO: Fix, not working
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		// (Blockly.Tooltip as any).HOVER_MS = 0 // Set the tooltip delay to be instant
	}, [initializeBlocks, disableFlyoutAutoclose])

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

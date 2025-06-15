"use client"

import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { useCallback, useMemo, useState } from "react"
import { cn } from "../../../lib/shadcn/utils"
import useToastOptions from "../../toast-options"
import pipClass from "../../../classes/pip-class"

function DemoButton({ demo } : { demo: Demo }) {
	const toast = useToastOptions()
	const [activeDemoName, setActiveDemoName] = useState<DemoNames | null>(null)

	const isDemoActive = useMemo(() => {
		return demo.demoTitle === activeDemoName
	}, [activeDemoName, demo.demoTitle])

	const setActiveDemo = useCallback(() => {
		if (isNull(pipClass.selectedPip)) {
			return toast.negative({ title: "Please add a Pip to your account" })
		}
		if (activeDemoName === demo.demoTitle) {
			return setActiveDemoName(null)
		}
		// if (pipClass.selectedPip.pipConnectionStatus !== "connected") {
		// 	return toast.negative({ title: "Please connect your Pip to the internet"})
		// }
		setActiveDemoName(demo.demoTitle)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeDemoName, demo.demoTitle, pipClass.selectedPip])

	return (
		<button
			className={cn(
				"p-0 border border-swan rounded-lg",
				"transition-colors text-left flex items-stretch",
				isDemoActive ? "bg-green-400 dark:bg-green-700" : "bg-inherit hover:bg-swan"
			)}
			onClick={setActiveDemo}
		>
			{/* Left Icon Section */}
			<div className="flex items-center justify-center w-24 border-r border-swan">
				<demo.demoIcon className="h-12 w-12 text-gray-900 dark:text-eel" />
			</div>

			{/* Content Section */}
			<div className="flex-1 p-4">
				<h3 className="text-lg font-semibold text-eel dark:text-eel mb-2">
					{demo.demoTitle}
				</h3>
				<p className="text-eel dark:text-wolf text-sm">
					{demo.demoDescription}
				</p>
			</div>
		</button>
	)
}

export default observer(DemoButton)

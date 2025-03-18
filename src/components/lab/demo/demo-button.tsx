"use client"

import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { useCallback, useMemo } from "react"
import { cn } from "../../../lib/shadcn/utils"
import useToastOptions from "../../toast-options"
import { usePipContext } from "../../../contexts/pip-context"
import { useLabDemoContext } from "../../../contexts/lab-demo-context"

function DemoButton({ demo } : { demo: Demo }) {
	const labDemoClass = useLabDemoContext()
	const pipClass = usePipContext()
	const toast = useToastOptions()

	const isDemoActive = useMemo(() => {
		return demo.demoTitle === labDemoClass.activeDemoName
	}, [demo.demoTitle, labDemoClass.activeDemoName])

	const setActiveDemo = useCallback(() => {
		if (isNull(pipClass.selectedPip)) {
			return toast.negative({ title: "Please add a Pip to your account" })
		}
		if (labDemoClass.activeDemoName === demo.demoTitle) {
			return labDemoClass.setActiveDemoName(null)
		}
		// if (pipClass.selectedPip.pipConnectionStatus !== "connected") {
		// 	return toast.negative({ title: "Please connect your Pip to the internet"})
		// }
		labDemoClass.setActiveDemoName(demo.demoTitle)
	}, [demo.demoTitle, labDemoClass, pipClass.selectedPip, toast])

	return (
		<button
			className={cn(
				"p-0 border border-swan rounded-lg",
				"transition-colors text-left flex items-stretch",
				isDemoActive ? "bg-green-400 dark:bg-green-700" : "bg-inherit hover:bg-swan dark:hover:bg-gray-700"
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

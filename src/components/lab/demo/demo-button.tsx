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
		if (labDemoClass.activeDemoName === demo.demoTitle) return
		if (isNull(pipClass.selectedPip)) {
			return toast.negative({ title: "Please add a Pip to your account" })
		}
		if (pipClass.selectedPip.pipConnectionStatus !== "connected") {
			return toast.negative({ title: "Please connect your Pip to the internet"})
		}
		labDemoClass.setActiveDemoName(demo.demoTitle)
	}, [demo.demoTitle, labDemoClass, pipClass.selectedPip, toast])

	return (
		<button
			className={cn(
				"p-0 border border-zinc-200 dark:border-zinc-700 rounded-lg",
				"transition-colors text-left flex items-stretch",
				isDemoActive ? "bg-green-400 dark:bg-green-500" : "bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800"
			)}
			onClick={setActiveDemo}
		>
			{/* Left Icon Section */}
			<div className="flex items-center justify-center w-24 border-r
                border-zinc-200 dark:border-zinc-700">
				<demo.demoIcon className="h-12 w-12 text-zinc-700 dark:text-zinc-300" />
			</div>

			{/* Content Section */}
			<div className="flex-1 p-4">
				<h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
					{demo.demoTitle}
				</h3>
				<p className="text-zinc-600 dark:text-zinc-400 text-sm">
					{demo.demoDescription}
				</p>
			</div>
		</button>
	)
}

export default observer(DemoButton)

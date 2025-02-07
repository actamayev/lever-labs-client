import { CircuitBoard, Hourglass } from "lucide-react"

export default function AfterCompletingSection() {
	return (
		<>
			<div className="space-y-2 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg
				bg-zinc-50 dark:bg-zinc-800/50">
				<h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
					After Completing This Element:
				</h2>
				<p className="text-lg text-zinc-600 dark:text-zinc-400">
					You'll master reading sensor data, controlling each component, and understanding the core robotics principles.
				</p>
			</div>
			<div className="space-y-2 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg
					bg-zinc-50 dark:bg-zinc-800/50">
				<div className="grid grid-cols-2 gap-4">
					<div className="text-lg text-zinc-800 dark:text-zinc-200 flex flex-row items-center justify-center gap-2">
						<CircuitBoard />
						9 Peripherals
					</div>
					<div className="text-lg text-zinc-800 dark:text-zinc-200 flex flex-row items-center justify-center gap-2">
						<Hourglass />
						10 hours
					</div>
				</div>
			</div>
		</>
	)
}

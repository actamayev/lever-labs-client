import { CircuitBoard, Hourglass } from "lucide-react"

export default function AfterCompletingSection() {
	return (
		<>
			<div className="space-y-2 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-inherit">
				<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
					After Completing This Element:
				</h2>
				<p className="text-lg text-gray-600 dark:text-gray-400">
					You'll master reading sensor data, controlling each component, and understanding core robotics principles
				</p>
			</div>
			<div className="space-y-2 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-inherit">
				<div className="grid grid-cols-2 gap-4">
					<div className="text-lg text-gray-800 dark:text-gray-200 flex flex-row items-center justify-center gap-2">
						<CircuitBoard />
						9 Peripherals
					</div>
					<div className="text-lg text-gray-800 dark:text-gray-200 flex flex-row items-center justify-center gap-2">
						<Hourglass />
						10 hours
					</div>
				</div>
			</div>
		</>
	)
}

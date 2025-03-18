"use client"

import { CircuitBoard, Hourglass } from "lucide-react"

export default function AfterCompletingSection() {
	return (
		<div className="space-y-2 p-4 border-2 border-swan rounded-lg bg-inherit">
			<div className="grid grid-cols-2 gap-4">
				<div className="text-lg text-eel dark:text-wolf flex flex-row items-center justify-center gap-2">
					<CircuitBoard />
					9 Peripherals
				</div>
				<div className="text-lg text-eel dark:text-wolf flex flex-row items-center justify-center gap-2">
					<Hourglass />
					10 hours
				</div>
			</div>
		</div>
	)
}

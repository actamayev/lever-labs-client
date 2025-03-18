"use client"

export default function InThisDemo({ demoDeliverables } : { demoDeliverables: string[]}) {
	return (
		<div className="space-y-2 p-4 border-2 border-swan rounded-lg bg-inherit">
			<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
				In this demo, you'll:
			</h2>
			<div className="grid grid-cols-2 gap-4">
				<ul className="list-disc pl-6 text-lg text-gray-600 dark:text-gray-400">
					{demoDeliverables.slice(0, 2).map((deliverable, index) => (
						<li key={index}>
							{deliverable}
						</li>
					))}
				</ul>
				<ul className="list-disc pl-6 text-lg text-gray-600 dark:text-gray-400">
					{demoDeliverables.slice(2, 4).map((deliverable, index) => (
						<li key={`second-${index}`}>
							{deliverable}
						</li>
					))}
				</ul>
			</div>
		</div>

	)
}

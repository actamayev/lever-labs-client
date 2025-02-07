export default function InThisDemo({ demoDeliverables } : { demoDeliverables: string[]}) {
	return (
		<div className="space-y-2 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg
			bg-zinc-50 dark:bg-zinc-800/50">
			<h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
				In this demo, you'll:
			</h2>
			<div className="grid grid-cols-2 gap-4">
				<ul className="list-disc pl-6 text-lg text-zinc-600 dark:text-zinc-400">
					{demoDeliverables.slice(0, 2).map((deliverable, index) => (
						<li key={index}>
							{deliverable}
						</li>
					))}
				</ul>
				<ul className="list-disc pl-6 text-lg text-zinc-600 dark:text-zinc-400">
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

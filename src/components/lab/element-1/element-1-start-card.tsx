import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/ui/card"

export default function Element1StartCard() {
	return (
		<Card className="w-[1000px] p-4 flex flex-col m-4 rounded-lg">
			<CardHeader>
				<CardTitle>
					<h1 className="text-4xl font-bold">Element 1: Sensor Basics</h1>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Getting Started Section */}
				<div className="space-y-2 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg
					bg-zinc-50 dark:bg-zinc-800/50">
					<h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
						Getting Started
					</h2>
					<p className="text-lg text-zinc-600 dark:text-zinc-400">
						First: if you have a Pip, we recommend getting it connected to the internet (it&apos;s quick & easy).
					</p>
				</div>

				{/* In This Element Section */}
				<div className="space-y-2 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg
					bg-zinc-50 dark:bg-zinc-800/50">
					<h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
						In This Element:
					</h2>
					<p className="text-lg text-zinc-600 dark:text-zinc-400">
						We&apos;ll investigate how Pip&apos;s sensors actually work under the surface, their applications,
						and you&apos;ll learn how to control them.
					</p>
					<div className="grid grid-cols-2 gap-4">
						<ul className="list-disc pl-6 text-lg text-zinc-600 dark:text-zinc-400">
							<li>LEDs</li>
							<li>Motors</li>
							<li>Buttons</li>
						</ul>
						<ul className="list-disc pl-6 text-lg text-zinc-600 dark:text-zinc-400">
							<li>Distance sensors</li>
							<li>IR sensors</li>
							<li>And much more</li>
						</ul>
					</div>
				</div>

				{/* After Completing Section */}
				<div className="space-y-2 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg
					bg-zinc-50 dark:bg-zinc-800/50">
					<h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
						After Completing This Element:
					</h2>
					<p className="text-lg text-zinc-600 dark:text-zinc-400">
						You&apos;ll be able to read, control, and understand how each of Pip&apos;s sensors works.
					</p>
				</div>
			</CardContent>
		</Card>
	)
}

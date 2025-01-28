import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../shadcn/ui/card"

export default function Element1StartCard() {
	return (
		<Card className="w-[600px] p-4 flex flex-col m-4 rounded-lg">
			<CardHeader>
				<CardTitle>
					<h1 className="text-4xl font-bold mb-6">Element 1: Sensor Basics</h1>
				</CardTitle>
				<CardDescription className="text-xl">
					Welcome to the Lab! We&apos;re happy you&apos;re here.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* Getting Started Section */}
				<div className="space-y-2 border">
					<h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
						Getting Started
					</h2>
					<p className="text-lg text-zinc-600 dark:text-zinc-400">
						First: if you have a Pip, we recommend getting it connected to the internet (it&apos;s quick & easy)
					</p>
				</div>

				{/* In This Element Section */}
				<div className="space-y-2">
					<h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
						In This Element:
					</h2>
					<p className="text-lg text-zinc-600 dark:text-zinc-400">
						We&apos;ll investigate how Pip&apos;s sensors actually work under the surface, their applications,
						and you&apos;ll learn how to control them. You&apos;ll work with:
					</p>
					<ul className="list-disc pl-6 text-lg text-zinc-600 dark:text-zinc-400">
						<li>LEDs</li>
						<li>Motors</li>
						<li>Buttons</li>
						<li>Distance sensors</li>
						<li>IR sensors</li>
						<li>And much more</li>
					</ul>
				</div>

				{/* After Completing Section */}
				<div className="space-y-2">
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

/* eslint-disable max-len */
import { Card, CardContent } from "@/components/shadcn/ui/card"
import { Button } from "@/components/shadcn/ui/button"
import {
	Wifi,
	Upload,
	Tag,
	ChevronRight
} from "lucide-react"

export default function AddPipWelcomeSection() {
	return (
		<Card className="bg-white dark:bg-zinc-800 border-2 border-purple-100 dark:border-purple-800">
			<CardContent className="pt-6">
				<div className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-6 flex justify-center">
					Have a Pip? Let&apos;s get started!
				</div>

				<div className="flex flex-col md:flex-row items-center justify-between mb-6 relative px-20">
					{/* Connection line behind the circles */}
					<div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-purple-200 dark:bg-purple-800 -z-10" />

					{/* Step 1 */}
					<div className="flex flex-col items-center mb-4 md:mb-0">
						<div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
							<Tag className="w-8 h-8 text-blue-600 dark:text-blue-400" />
						</div>
						<span className="text-sm text-gray-600 dark:text-gray-300">Name your Pip</span>
					</div>

					<div className="hidden md:flex items-center h-20">
						<ChevronRight className="w-6 h-6 text-purple-400 dark:text-purple-600" />
					</div>

					{/* Step 2 */}
					<div className="flex flex-col items-center mb-4 md:mb-0">
						<div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-2">
							<Wifi className="w-8 h-8 text-purple-600 dark:text-purple-400" />
						</div>
						<span className="text-sm text-gray-600 dark:text-gray-300">Connect to WiFi</span>
					</div>

					<div className="hidden md:flex items-center h-20">
						<ChevronRight className="w-6 h-6 text-purple-400 dark:text-purple-600" />
					</div>

					{/* Step 3 */}
					<div className="flex flex-col items-center">
						<div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-2">
							<Upload className="w-8 h-8 text-green-600 dark:text-green-400" />
						</div>
						<span className="text-sm text-gray-600 dark:text-gray-300">Upload credentials</span>
					</div>
				</div>

				<Button className="w-full bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800">
	Add Your Pip
				</Button>
			</CardContent>
		</Card>
	)
}

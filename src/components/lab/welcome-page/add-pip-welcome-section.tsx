/* eslint-disable max-len */
import {
	Wifi,
	Upload,
	Tag
} from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import RightArrow from "./right-arrow"
import SubIconText from "./sub-icon-text"
import WelcomePageCard from "./welcome-page-card"

export default function AddPipWelcomeSection() {
	return (
		<WelcomePageCard headerText="Have a Pip? Let's get started!" >
			<div className="flex flex-col md:flex-row items-center justify-between mb-6 relative px-20">
				{/* Connection line behind the circles */}
				<div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-purple-200 dark:bg-purple-800 -z-10" />

				{/* Step 1 */}
				<div className="flex flex-col items-center mb-4 md:mb-0">
					<div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
						<Tag className="w-10 h-10 text-blue-600 dark:text-blue-400" />
					</div>
					<SubIconText text="Name your Pip" />
				</div>

				<RightArrow />

				{/* Step 2 */}
				<div className="flex flex-col items-center mb-4 md:mb-0">
					<div className="w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-2">
						<Wifi className="w-10 h-10 text-purple-600 dark:text-purple-400" />
					</div>
					<SubIconText text="Connect to Wi-Fi" />
				</div>

				<RightArrow />

				{/* Step 3 */}
				<div className="flex flex-col items-center">
					<div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-2">
						<Upload className="w-10 h-10 text-green-600 dark:text-green-400" />
					</div>
					<SubIconText text="Upload credentials" />
				</div>
			</div>

			<Button className="w-full bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800">
				Add Your Pip
			</Button>
		</WelcomePageCard>
	)
}

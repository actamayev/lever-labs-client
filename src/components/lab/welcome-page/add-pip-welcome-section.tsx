/* eslint-disable max-len */
import {
	Wifi,
	Upload,
	Tag
} from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import RightArrow from "./right-arrow"
import { IconStep } from "./welcome-page-icons"
import WelcomePageCard from "./welcome-page-card"

export default function AddPipWelcomeSection() {
	return (
		<WelcomePageCard headerText="Have a Pip? Let's get started!" >
			<div className="flex flex-col md:flex-row items-center justify-between mb-6 relative px-20">
				<IconStep
					icon={Tag}
					title="Name your Pip"
				/>

				<RightArrow />

				<IconStep
					icon={Wifi}
					bgColor="bg-purple-100"
					iconColor="text-purple-600"
					darkBgColor="dark:bg-purple-900/50"
					darkIconColor="dark:text-purple-400"
					title="Connect to Wi-Fi"
				/>

				<RightArrow />

				<IconStep
					icon={Upload}
					bgColor="bg-green-100"
					iconColor="text-green-600"
					darkBgColor="dark:bg-green-900/50"
					darkIconColor="dark:text-green-400"
					title="Upload credentials"
				/>
			</div>

			<Button className="w-full bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800">
				Add Your Pip
			</Button>
		</WelcomePageCard>
	)
}

/* eslint-disable max-len */
import {
	BookOpen,
	Code,
	Play,
} from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import RightArrow from "./right-arrow"
import { IconStep } from "./welcome-page-icons"
import WelcomePageCard from "./welcome-page-card"

export default function InsideEachLesson() {
	return (
		<WelcomePageCard headerText="Inside Each Lesson">
			<div className="flex flex-col md:flex-row items-center justify-between mb-6 relative px-20">
				<IconStep
					icon={BookOpen}
					title="Read"
				/>

				<RightArrow />

				<IconStep
					icon={Play}
					bgColor="bg-purple-100"
					iconColor="text-purple-600"
					darkBgColor="dark:bg-purple-900/50"
					darkIconColor="dark:text-purple-400"
					title="Watch"
				/>

				<RightArrow />

				<IconStep
					icon={Code}
					bgColor="bg-green-100"
					iconColor="text-green-600"
					darkBgColor="dark:bg-green-900/50"
					darkIconColor="dark:text-green-400"
					title="Code"
				/>
			</div>

			<Button className="w-full bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800">
				Start Learning
			</Button>
		</WelcomePageCard>
	)
}

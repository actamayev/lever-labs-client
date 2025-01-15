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
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"

export default function InsideEachLesson() {
	const navigate = useTypedNavigate()

	return (
		<WelcomePageCard headerText="Inside Each Lesson">
			<div className="flex flex-col md:flex-row items-center justify-between mb-6 relative px-20">
				<IconStep icon={BookOpen} title="Read" />

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

			<Button
				className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800
				text-xl transition-none"
				onClick={() => navigate("/lab/element-1")}
				variant="tactile"
			>
				Start Learning
			</Button>
		</WelcomePageCard>
	)
}

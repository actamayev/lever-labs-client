import React, { useState } from "react"
import { Cpu, LucideIcon, Navigation, Scale, Shield, Users } from "lucide-react"
import Sensors from "../sensors/sensors"
import { cn } from "../../../lib/shadcn/utils"
import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/ui/card"
import { BalancingDescription, CollaborativeRobotsDescription,
	LineFollowingDescription, ObstacleDescription } from "./use-case-descriptions"

interface Category {
	title: CategoryTitle
	icon: LucideIcon
	description: React.ReactNode
}

type CategoryTitle =
	| "Line following"
	| "Obstacle Detection"
	| "Balancing"
	| "Collaborative robots"
	| "Pip's full sensor suite"

const categories: Category[] = [
	{
		title: "Line following",
		icon: Navigation,
		description: <LineFollowingDescription />
	},
	{
		title: "Obstacle Detection",
		icon: Shield,
		description: <ObstacleDescription />
	},
	{
		title: "Balancing",
		icon: Scale,
		description: <BalancingDescription />
	},
	{
		title: "Collaborative robots",
		icon: Users,
		description: <CollaborativeRobotsDescription />
	},
	{
		title: "Pip's full sensor suite",
		icon: Cpu,
		description: <></>
	},
]

interface Props {
	title: string
	content: React.ReactNode
}

function RightSideContentSkeleton(props: Props) {
	const { title, content } = props

	return (
		<Card className="h-full flex flex-col">
			<CardHeader className="p-4 lg:p-6 flex-shrink-0">
				<CardTitle className="text-xl lg:text-2xl">{title}</CardTitle>
			</CardHeader>
			<CardContent className="flex-1">
				<div className="w-full h-full">
					{content}
				</div>
			</CardContent>
		</Card>
	)
}

export default function PipUseCases() {
	const [selectedCategory, setSelectedCategory] = useState<CategoryTitle>("Line following")

	const renderRightSideContent = () => {
		if (selectedCategory === "Pip's full sensor suite") {
			return (
				<RightSideContentSkeleton
					title={selectedCategory}
					content={<Sensors />}
				/>
			)
		}

		return (
			<RightSideContentSkeleton
				title={selectedCategory}
				content={
					<div className="text-base lg:text-lg text-muted-foreground">
						{categories.find(c => c.title === selectedCategory)?.description}
					</div>
				}
			/>
		)
	}

	return (
		<div className="px-4 md:px-6 lg:px-0">
			<p className="text-center whitespace-pre-wrap text-3xl md:text-4xl lg:text-6xl
                font-medium tracking-tight text-black dark:text-white py-6">
                So what can Pip do?
			</p>
			<div className="w-full py-4 bg-transparent">
				<div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
					{/* Left side - Category cards */}
					<div className="w-full lg:w-1/5 grid grid-cols-2 lg:grid-cols-1 auto-rows-fr gap-2 lg:gap-4">
						{categories.map((category) => (
							<Card
								key={category.title}
								className={cn(
									"cursor-pointer transition-colors hover:bg-accent h-[60px] lg:h-[70px]",
									selectedCategory === category.title ? "border-primary border" : ""
								)}
								onClick={() => setSelectedCategory(category.title)}
							>
								<CardHeader className="flex flex-row items-center h-full space-y-0 p-3 lg:p-4">
									<div className="mr-2 lg:mr-4 shrink-0">
										{React.createElement(category.icon, {
											className: "w-4 h-4 lg:w-6 lg:h-6",
											"aria-hidden": "true",
										})}
									</div>
									<CardTitle className="text-sm lg:text-lg">{category.title}</CardTitle>
								</CardHeader>
							</Card>
						))}
					</div>

					{/* Right side content - Make it match the height of the buttons container */}
					<div className="w-full lg:w-4/5 h-full flex">
						<div className="w-full">
							{renderRightSideContent()}
						</div>
					</div>
				</div>
			</div>
		</div>
	)

}

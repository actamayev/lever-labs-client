/* eslint-disable max-len */
import React, { useState } from "react"
import { Cpu, LucideProps, Navigation, Scale, Shield, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/ui/card"
import { BalancingDescription, CollaborativeRobotsDescription, LineFollowingDescription, ObstacleDescription, SensorSuiteDescription } from "./use-case-descriptions"
import Sensors from "../sensors/sensors"

interface Category {
	title: CategoryTitle
	icon: React.ForwardRefExoticComponent<
		React.PropsWithoutRef<LucideProps> & React.RefAttributes<SVGSVGElement>
	>
	description: React.ReactNode
}

type CategoryTitle =
	| "Line following"
	| "Obstacle Detection"
	| "Balancing"
	| "Collaborative robots"
	| "See Pip's full sensor suite"

const categories: Category[] = [
	{
		title: "Line following",
		icon: Navigation,
		description: <LineFollowingDescription />
	},
	{
		// TODO: Make the golden treasure sparkle on hover
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
		title: "See Pip's full sensor suite",
		icon: Cpu,
		description: <SensorSuiteDescription />
	},
]

export default function PipUseCases() {
	const [selectedCategory, setSelectedCategory] = useState<CategoryTitle>("Line following")

	return (
		<div>
			<p
				className="flex justify-center text-center whitespace-pre-wrap text-6xl
				font-medium tracking-tight text-black dark:text-white pt-10 pb-12"
			>
				So what can Pip do anyway?
			</p>
			<div className="w-full p-6 bg-transparent">
				<div className="flex gap-6">
					{/* Left side - Category cards */}
					<div className="w-1/3 space-y-4">
						{categories.map((category) => (
							<Card
								key={category.title}
								className={`cursor-pointer transition-colors hover:bg-accent
									${selectedCategory === category.title ? "border-primary border" : ""}
								`}
								onClick={() => setSelectedCategory(category.title)}
							>
								<CardHeader className="flex flex-row items-center space-y-0 p-4">
									<div className="mr-4">
										{React.createElement(category.icon, {
											className: "w-6 h-6",
											"aria-hidden": "true",
										})}
									</div>
									<CardTitle className="text-lg">{category.title}</CardTitle>
								</CardHeader>
							</Card>
						))}
					</div>

					{/* Right side - Details card */}
					<div className="w-2/3">
						<Card className="h-full">
							<CardHeader className="p-6">
								<CardTitle className="text-2xl">{selectedCategory}</CardTitle>
							</CardHeader>
							<CardContent className="">
								<p className="text-lg text-muted-foreground">
									{categories.find(c => c.title === selectedCategory)?.description}
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	)
}

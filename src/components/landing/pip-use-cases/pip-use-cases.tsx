import React, { useState } from "react"
import { Cpu, LucideProps, Navigation, Scale, Shield, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/ui/card"
import Sensors from "../sensors/sensors"
import { BalancingDescription, CollaborativeRobotsDescription,
	LineFollowingDescription, ObstacleDescription } from "./use-case-descriptions"

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
		<div className="w-4/5 flex-shrink-0">
			<Card className="h-full">
				<CardHeader className="p-6">
					<CardTitle className="text-2xl">{title}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="w-full">
						{content}
					</div>
				</CardContent>
			</Card>
		</div>
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
					<p className="text-lg text-muted-foreground">
						{categories.find(c => c.title === selectedCategory)?.description}
					</p>
				}
			/>
		)
	}

	return (
		<div>
			<p
				className="flex justify-center text-center whitespace-pre-wrap text-6xl
				font-medium tracking-tight text-black dark:text-white py-6"
			>
				So what can Pip do?
			</p>
			<div className="w-full py-4 bg-transparent">
				<div className="flex gap-6">
					{/* Left side - Category cards */}
					<div className="w-1/5 space-y-7">
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

					{/* Right side - Conditional rendering */}
					{renderRightSideContent()}
				</div>
			</div>
		</div>
	)
}

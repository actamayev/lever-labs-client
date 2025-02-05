import { GraduationCap, LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/shadcn/ui/card"

interface Props {
	description: string
	Icon: LucideIcon
}

export default function DidYouKnow(props: Props) {
	const { description, Icon } = props

	return (
		<Card className="bg-teal-100 border-teal-200 dark:bg-teal-950 dark:border-teal-800">
			<CardContent className="p-0">
				<div className="flex items-stretch">
					<div className="flex items-center justify-center w-24 border-r
					border-teal-200 dark:border-teal-800 rounded-l-lg">
						<GraduationCap className="h-12 w-12 text-teal-700 dark:text-teal-300" />
					</div>

					{/* Content Section */}
					<div className="flex-1 p-6">
						<h2 className="text-lg font-semibold text-teal-900 mb-2 dark:text-teal-100">
							Did you know?
						</h2>
						<p className="text-teal-800 dark:text-teal-200 text-base">
							{description}
						</p>
					</div>

					{/* Right Icon Section */}
					<div className="flex items-center justify-center w-24 border-l
					border-teal-200 dark:border-teal-800 rounded-r-lg">
						<Icon className="h-12 w-12 text-teal-700 dark:text-teal-300" />
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

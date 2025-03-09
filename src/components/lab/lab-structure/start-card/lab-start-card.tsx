import InThisElementSection from "./in-this-element-section"
import AfterCompletingSection from "./after-completing-section"
import GettingStartedStartCard from "./getting-started-start-card"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shadcn/ui/card"

// 1/28/25 TODO: consider adding a scroll to component for the LED, motors, etc.
// should be dotted hover underline. onclick leds, auto-scrolls to led section
export default function LabStartCard() {
	return (
		<Card className="w-[1100px] p-2 flex flex-col m-2 rounded-lg bg-inherit border-2 border-gray-200 dark:border-gray-700 shadow-none">
			<CardHeader>
				<CardTitle>
					<h1 className="text-4xl font-bold">Welcome to the Lab</h1>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<GettingStartedStartCard />
				<InThisElementSection />
				<AfterCompletingSection />
			</CardContent>
		</Card>
	)
}

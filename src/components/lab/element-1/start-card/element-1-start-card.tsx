import InThisElementSection from "./in-this-element-section"
import AfterCompletingSection from "./after-completing-section"
import GettingStartedStartCard from "./getting-started-start-card"
import { Card, CardContent, CardHeader, CardTitle } from "../../../shadcn/ui/card"

// 1/28/25 TODO: consider adding a scroll to component for the LED, motors, etc.
// should be dotted hover underline. onclick leds, auto-scrolls to led section
export default function Element1StartCard() {
	return (
		<Card className="w-[1100px] p-2 flex flex-col m-2 rounded-lg">
			<CardHeader>
				<CardTitle>
					<h1 className="text-4xl font-bold">Element 1: Sensor Basics</h1>
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

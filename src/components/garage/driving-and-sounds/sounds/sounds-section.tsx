import { Speaker } from "lucide-react"

export default function SoundsSection() {
	return (
		<div>
			<div className="flex flex-row space-x-2 items-center">
				<Speaker />
				<h2 className="text-xl font-bold text-center">Speaker</h2>
			</div>
			{/* Speaker content will go here */}
		</div>
	)
}

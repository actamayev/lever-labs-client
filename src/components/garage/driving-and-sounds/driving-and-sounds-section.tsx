import { Speaker } from "lucide-react"
import DrivingControls from "./driving/driving-controls"

export default function DrivingAndSoundsSection() {
	return (
		<div className="h-1/3 flex flex-row overflow-hidden">
			<div className="w-1/2 flex flex-col items-center p-4">
				<div className="flex flex-row space-x-2 items-center">
					<Speaker />
					<h2 className="text-xl font-bold text-center">Speaker</h2>
				</div>
				{/* Speaker content will go here */}
			</div>
			<div className="w-0.5 bg-swan rounded-full"/>

			<div className="w-1/2 flex flex-col items-center p-4">
				{/* Added our DrivingControls component here */}
				<div className="flex-grow flex items-center justify-center">
					<DrivingControls />
				</div>
			</div>
		</div>
	)
}

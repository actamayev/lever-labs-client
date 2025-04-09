import DrivingControls from "./driving/driving-controls"
import SoundsSection from "./sounds/sounds-section"

export default function DrivingAndSoundsSection() {
	return (
		<div className="h-1/3 flex flex-row overflow-hidden">
			<div className="w-1/2 flex flex-col items-center p-4">
				<SoundsSection />
			</div>
			<div className="w-0.5 bg-swan rounded-full"/>

			<div className="w-1/2 flex flex-col items-center p-4">
				<DrivingControls />
			</div>
		</div>
	)
}

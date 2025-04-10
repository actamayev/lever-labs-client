import DrivingControls from "./driving/driving-controls"
import SoundsSection from "./sounds/sounds-section"

export default function DrivingAndSoundsSection() {
	return (
		<div className="h-1/3 flex flex-row overflow-hidden">
			<div className="w-1/2 flex flex-col items-center justify-center">
				<SoundsSection />
			</div>
			<div className="w-0.5 bg-swan rounded-full my-2"/>

			<div className="w-1/2 flex flex-col items-center justify-center">
				<DrivingControls />
			</div>
		</div>
	)
}

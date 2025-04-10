import useGarageSoundsUseEffect from "../../../../hooks/garage/garage-sounds-use-effect"
import SoundActionButton from "./sound-action-button"

export default function SoundsSection() {
	useGarageSoundsUseEffect()
	const sounds: Sounds[] = [
		"fart",
		"monkey",
		"elephant",
		"fanfare",
		"mariachi",
		"countdown"
	]

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="grid grid-cols-3 gap-x-6 gap-y-4">
				{sounds.map((sound, index) => (
					<div key={sound}>
						<SoundActionButton sound={sound} index={index + 1} />
					</div>
				))}
			</div>
		</div>
	)
}

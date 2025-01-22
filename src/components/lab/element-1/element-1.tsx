import Lilypad from "../lab-structure/lilypad"
import ledLessons from "./led/led-lessons-object"
import { LilypadContainer } from "../lab-structure/lilypad-container"
import NavigateThroughElementsButton from "../lab-structure/navigate-through-elements-button"

export default function Element1() {
	return (
		<div className="pt-8">
			<NavigateThroughElementsButton />
			{/* Scrollable Lilypads Container */}
			<LilypadContainer>
				{ledLessons.map((lesson, index) => (
					<div key={index}>
						<Lilypad
							lesson={lesson}
							// key={index}
						/>
					</div>
				))}
			</LilypadContainer>
		</div>
	)
}

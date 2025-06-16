"use client"

import { observer } from "mobx-react"
import { useEffect, useRef, useState } from "react"
import LabStartCard from "./start-card/lab-start-card"
import SeeAllLessonIcons from "./see-all-lesson-icons"
import LilypadContainer from "./lilypad/lilypad-container"
import CreateLilypadsAndTicks from "./create-lilypads-and-ticks"
// import LabVerticalDivider from "../lab-structure/lab-vertical-divider"
import retrieveAllActivities from "../../../utils/lab/retrieve-all-activities"

interface Section {
	ref: React.RefObject<HTMLDivElement>
	name: LessonNames
}

function TheLabPage() {
	useEffect(() => void retrieveAllActivities(), [])

	const ledSectionRef = useRef<HTMLDivElement>(null)
	// const motorSectionRef = useRef<HTMLDivElement>(null)
	const [clickedSection, setClickedSection] = useState<LessonNames>("LED")

	useEffect(() => {
		const intersectionObservers: IntersectionObserver[] = []
		const sections: Section[] = [
			{ ref: ledSectionRef, name: "LED" },
			// { ref: motorSectionRef, name: "Motor" }
		]

		sections.forEach(({ ref, name }) => {
			if (ref.current) {
				const intersectionObserver = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (entry.isIntersecting) {
								setClickedSection(name)
							}
						})
					},
					{ threshold: 0.5 }
				)

				intersectionObserver.observe(ref.current)
				intersectionObservers.push(intersectionObserver)
			}
		})

		return () => {
			intersectionObservers.forEach(intersectionObserver => intersectionObserver.disconnect())
		}
	}, [])

	return (
		<div className="h-screen overflow-y-auto relative">
			<div className="fixed mt-6 ml-2 flex flex-row items-start gap-4 z-50">
				{/* <NavigateThroughElementsButton /> */}
				<SeeAllLessonIcons
					sectionRefs={{
						LED: ledSectionRef,
						// Motor: motorSectionRef
					}}
					activeSection={clickedSection}
					setClickedSection={setClickedSection}
				/>
			</div>
			<LilypadContainer>
				<LabStartCard />
				{/* Alter this pl-32 for the auto-scroll to scroll to the correct place (need to adjust for the sidebar width) */}
				<div ref={ledSectionRef} className="flex pl-32">
					<CreateLilypadsAndTicks />
				</div>
				{/* <LabVerticalDivider /> */}
			</LilypadContainer>
		</div>
	)
}

export default observer(TheLabPage)

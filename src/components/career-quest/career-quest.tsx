"use client"

import { useEffect, useRef, useState } from "react"
import { careerData } from "../../utils/career-data"
import Workbench from "../workbench/workbench"
import SingleCareerCard from "./career-card/single-career-card"

export default function CareerQuest() {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [fixedWidth, setFixedWidth] = useState(0)

	useEffect(() => {
		const updateWidth = () => {
			if (containerRef.current) {
				setFixedWidth(containerRef.current.offsetWidth)
			}
		}

		updateWidth()
		window.addEventListener("resize", updateWidth)
		return () => window.removeEventListener("resize", updateWidth)
	}, [])

	return (
		<div className="flex flex-row h-screen overflow-y-auto relative w-full space-x-12 px-10 pt-12">
			{/* Main content area */}
			<div className="w-full lg:w-3/5 xl:w-[61.8%]">
				{careerData.map(singleCareerData => (
					<div className="mb-12 flex flex-col items-center" key={singleCareerData.careerName}>
						<SingleCareerCard careerData={singleCareerData} />
					</div>
				))}
			</div>

			{/* Fixed workbench icons */}
			<div className="hidden lg:block lg:w-2/5 xl:w-[38.2%]" ref={containerRef}>
				{/* This is the fixed element */}
				<div className="fixed top-11" style={{ width: fixedWidth + "px" }}>
					<Workbench />
				</div>
			</div>
		</div>
	)
}

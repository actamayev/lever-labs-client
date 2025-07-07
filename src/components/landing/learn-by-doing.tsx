"use client"

import LandingSectionSplit from "./landing-section-split"
import LandingSectionHeaderText from "./landing-section-header-text"
import { landingParagraph, landingTableHeader, landingTableText } from "../../utils/text-styles"

export default function LearnByDoing() {
	return (
		<LandingSectionSplit
			imagePosition="right"
			leftContent={
				<>
					<LandingSectionHeaderText text="learn by doing" />
					<p className={landingParagraph("mt-4 sm:mt-8")}>
						We bring Pip into the learning at every step to create an experience you won't
						find anywhere else. Career Quest teaches you cool concepts, and Pip shows you how they work in real life.
					</p>
				</>
			}
			rightContent={
				<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-md w-full rounded-2xl border-2 border-swan">
					{/* Header row */}
					<div className="grid grid-cols-2 text-questionText">
						<div className={landingTableHeader()}>
							In the Career Quest
						</div>
						<div className={landingTableHeader()}>
							With Pip
						</div>
					</div>

					{/* LEDs & Lighting row */}
					<div className="grid grid-cols-2 divide-x divide-gray-200
					dark:divide-gray-700 border-t border-swan">
						<div className="p-2 sm:p-4 flex items-center justify-center">
							<p className={landingTableText()}>Study how LEDs function</p>
						</div>
						<div className="p-2 sm:p-4 flex items-center justify-center">
							<p className={landingTableText()}>
								Write a program for Pip to put on a thrilling light show
							</p>
						</div>
					</div>

					{/* Motors & Movement row */}
					<div className="grid grid-cols-2 divide-x divide-gray-200
					dark:divide-gray-700 border-t border-swan">
						<div className="p-2 sm:p-4 flex items-center justify-center">
							<p className={landingTableText()}>Read about how motors work</p>
						</div>
						<div className="p-2 sm:p-4 flex items-center justify-center">
							<p className={landingTableText()}>Take Pip on a joy-ride around your home</p>
						</div>
					</div>

					{/* Algorithms & Navigation row */}
					<div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700
					border-t border-swan">
						<div className="p-2 sm:p-4 flex items-center justify-center">
							<p className={landingTableText()}>Learn about maze-solving algorithms</p>
						</div>
						<div className="p-2 sm:p-4 flex items-center justify-center">
							<p className={landingTableText()}>Watch Pip navigate a maze you created</p>
						</div>
					</div>
				</div>
			}
		/>
	)
}

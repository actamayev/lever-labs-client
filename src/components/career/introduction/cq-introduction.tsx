/* eslint-disable max-len */
"use client"

import { Suspense } from "react"
import BlocklyLoadingComponent from "../../sandbox/blockly-loading-component"
import ViewOnlyDemo from "../view-only-demo"

export default function CQIntroduction() {
	return (
		<>
			Hi! I'm Pip!
			As you're helping me through careers, you'll be writing code that I'm going to follow.
			You can think of code as a recipe, except instead of making a yummy dish, the recipe your write is going to help me complete various challenges.
			You're going to be writing a set of instructions for me to follow. Lets try it out:
			-----Please Connect Pip to get started-----

			<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-[90%]" />}>
				<ViewOnlyDemo
					description={"test"}
					beforeRunningText={"before running test"}
					extraClasses="h-full"
					cppCode=""
					blocklyJson={{}}
				/>
			</Suspense>
		</>
	)
}

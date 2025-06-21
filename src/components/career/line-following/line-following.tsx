"use client"

import { Suspense } from "react"
import ViewOnlyDemo from "../view-only-demo"
import BlocklyLoadingComponent from "../../sandbox/blockly-loading-component"

export default function LineFollowing() {
	return (
		<Suspense fallback={<BlocklyLoadingComponent extraClasses="h-[90%]" />}>
			<ViewOnlyDemo
				description={"test"}
				beforeRunningText={"before running test"}
				extraClasses="h-full"
				cppCode=""
				blocklyJson={{}}
			/>
		</Suspense>
	)
}


"use client"

import { ReactNode } from "react"


// eslint-disable-next-line @typescript-eslint/naming-convention
const OBSTACLE_AVOIDANCE_CONTENT_COMPONENTS: Record<string, (onAdvance?: () => void) => ReactNode> = {
	// Obstacle Avoidance career content
	"obstacle-avoidance-1-1": (): React.ReactNode => (
		<div>
			Test 1
		</div>
	),
	"obstacle-avoidance-1-2": (): React.ReactNode => (
		<div>
			Test 2
		</div>
	),
	"obstacle-avoidance-1-3": (): React.ReactNode => (
		<div>
			Test 3
		</div>
	),
	"obstacle-avoidance-1-4": (): React.ReactNode => (
		<div>
			Test 4
		</div>
	),
	"obstacle-avoidance-1-5": (): React.ReactNode => (
		<div>
			Test 5
		</div>
	),
	"obstacle-avoidance-2-1": (): React.ReactNode => (
		<div>
			Test 6
		</div>
	),
	"obstacle-avoidance-2-2": (): React.ReactNode => (
		<div>
			Test 7
		</div>
	),
	"obstacle-avoidance-3-1": (): React.ReactNode => (
		<div>
			Test 8
		</div>
	),
	"obstacle-avoidance-4-1": (): React.ReactNode => (
		<div>
			Test 9
		</div>
	),
	"obstacle-avoidance-5-1": (): React.ReactNode => (
		<div>
			Test 10
		</div>
	),
	"obstacle-avoidance-6-1": (): React.ReactNode => (
		<div>
			Test 11
		</div>
	)
}

export default OBSTACLE_AVOIDANCE_CONTENT_COMPONENTS

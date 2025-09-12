
"use client"

import { ReactNode } from "react"
import MEET_PIP_CONTENT_COMPONENTS from "./meet-pip-content"
import DRIVING_SCHOOL_CONTENT_COMPONENTS from "./driving-school-content"
import OBSTACLE_AVOIDANCE_CONTENT_COMPONENTS from "./obstacle-avoidance-content"

// Component registry for content components
// This allows us to store string keys in MobX state while rendering JSX components
// eslint-disable-next-line @typescript-eslint/naming-convention
const ALL_CAREER_QUEST_LEFT_CONTENT_COMPONENTS: Record<string, (onAdvance?: () => void) => ReactNode> = {
	...MEET_PIP_CONTENT_COMPONENTS,
	...DRIVING_SCHOOL_CONTENT_COMPONENTS,
	...OBSTACLE_AVOIDANCE_CONTENT_COMPONENTS
}

// Helper function to get a content component by key
export function getLeftContentComponent(key: string, onAdvance?: () => void): ReactNode {
	const component = ALL_CAREER_QUEST_LEFT_CONTENT_COMPONENTS[key]

	if (!component) {
		console.warn(`Content component "${key}" not found in registry`)
		return <div>Content not found</div> // fallback
	}
	return component(onAdvance)
}

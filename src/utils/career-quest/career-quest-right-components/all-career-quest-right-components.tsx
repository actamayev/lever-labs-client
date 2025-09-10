"use client"

import { ReactNode } from "react"
import { Bot } from "lucide-react"
import MEET_PIP_COMPONENTS from "./meet-pip-components"
import DRIVING_SCHOOL_COMPONENTS from "./driving-school-components"

// Component registry for trigger images
// This allows us to store string keys in MobX state while rendering JSX components
// eslint-disable-next-line @typescript-eslint/naming-convention
const CAREER_QUEST_RIGHT_COMPONENTS: Record<string, () => ReactNode> = {
	// Bot icons for different themes
	...MEET_PIP_COMPONENTS,
	...DRIVING_SCHOOL_COMPONENTS,
	"bot-humpback": (): ReactNode => <Bot size={120} className="text-humpback" />,
}

// Helper function to get a trigger component by key
export function getCareerQuestRightComponent(key: string): ReactNode {
	const component = CAREER_QUEST_RIGHT_COMPONENTS[key]

	if (!component) {
		console.warn(`Trigger component "${key}" not found in registry`)
		return <Bot size={120} className="text-questionText" /> // fallback
	}
	return component()
}

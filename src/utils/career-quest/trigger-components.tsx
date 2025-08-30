"use client"

import { ReactNode } from "react"
import { Bot, Navigation, Eye, Radar, Lightbulb, Cog, ArrowRight, ScanLine, Puzzle,
	Trophy, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Heart } from "lucide-react"
import IntroductionS2P3ColorPicker from "../../components/career-quest/trigger-content/introduction-s2-p3-color-picker"
import IntroductionS3P3Display from "../../components/career-quest/trigger-content/introduction-s3-p3-display"

// Component registry for trigger images
// This allows us to store string keys in MobX state while rendering JSX components
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TRIGGER_COMPONENTS: Record<string, () => ReactNode> = {
	// Bot icons for different themes
	"s2-p3-color-picker": () => <IntroductionS2P3ColorPicker />,
	"s3-p3-display": () => <IntroductionS3P3Display />,
	"bot-humpback": () => <Bot size={120} className="text-humpback" />,
	"bot-macaw": () => <Bot size={120} className="text-macaw" />,

	// Heading icons for humpback theme
	"heading1-humpback": () => <Heading1 size={120} className="text-humpback" />,
	"heading2-humpback": () => <Heading2 size={120} className="text-humpback" />,
	"heading3-humpback": () => <Heading3 size={120} className="text-humpback" />,
	"heading4-humpback": () => <Heading4 size={120} className="text-humpback" />,
	"heading5-humpback": () => <Heading5 size={120} className="text-humpback" />,
	"heading6-humpback": () => <Heading6 size={120} className="text-humpback" />,

	// Heading icons for macaw theme
	"heading1-macaw": () => <Heading1 size={120} className="text-macaw" />,
	"heading2-macaw": () => <Heading2 size={120} className="text-macaw" />,
	"heading3-macaw": () => <Heading3 size={120} className="text-macaw" />,
	"heading4-macaw": () => <Heading4 size={120} className="text-macaw" />,
	"heading5-macaw": () => <Heading5 size={120} className="text-macaw" />,
	"heading6-macaw": () => <Heading6 size={120} className="text-macaw" />,

	// Other icons for macaw theme
	"lightbulb-macaw": () => <Lightbulb size={120} className="text-macaw" />,
	"cog-macaw": () => <Cog size={120} className="text-macaw" />,
	"arrow-right-macaw": () => <ArrowRight size={120} className="text-macaw" />,
	"scan-line-macaw": () => <ScanLine size={120} className="text-macaw" />,
	"puzzle-macaw": () => <Puzzle size={120} className="text-macaw" />,
	"trophy-macaw": () => <Trophy size={120} className="text-macaw" />,

	// Other icons for humpback theme
	"navigation-humpback": () => <Navigation size={120} className="text-humpback" />,
	"eye-humpback": () => <Eye size={120} className="text-humpback" />,
	"radar-humpback": () => <Radar size={120} className="text-humpback" />,
	"heart-humpback": () => <Heart size={120} className="text-humpback" />,

	// Other icons for macaw theme
	"navigation-macaw": () => <Navigation size={120} className="text-macaw" />,
	"heart-macaw": () => <Heart size={120} className="text-macaw" />,
}

// Helper function to get a trigger component by key
export function getTriggerComponent(key: string): ReactNode {
	const component = TRIGGER_COMPONENTS[key]
	if (!component) {
		console.warn(`Trigger component "${key}" not found in registry`)
		return <Bot size={120} className="text-questionText" /> // fallback
	}
	return component()
}

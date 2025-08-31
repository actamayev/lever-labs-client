"use client"

import { ReactNode } from "react"
import { Bot, Navigation, Eye, Radar, Lightbulb, Cog, ArrowRight, ScanLine, Puzzle,
	Trophy, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Heart } from "lucide-react"
import SoundsSection from "../../components/garage/sounds-and-demos/sounds/sounds-section"
import IntroductionS3P4Display from "../../components/career-quest/trigger-content/introduction-s3-p4-display"
import IntroductionS2P3ColorPicker from "../../components/career-quest/trigger-content/introduction-s2-p3-color-picker"
import IntroductionS2P4LightShow from "../../components/career-quest/trigger-content/introduction-s2-p4-light-show"
import IntroductionS5P4ImuViz from "../../components/career-quest/trigger-content/introduction-s5-p4-imu-viz"
import IntroductionS5P5BallMoving from "../../components/career-quest/trigger-content/introduction-s5-p5-ball-moving"
import IntroductionS6P4MzViz from "../../components/career-quest/trigger-content/introduction-s6-p4-mz-viz"
import IntroductionS6P6TofsViz from "../../components/career-quest/trigger-content/introduction-s6-p6-tofs-viz"
import IntroductionS9P6EncoderViz from "../../components/career-quest/trigger-content/introduction-s9-p6-encoder-viz"
import IntroductionS8P3ColorViz from "../../components/career-quest/trigger-content/introduction-s8-p3-color-viz"

// Component registry for trigger images
// This allows us to store string keys in MobX state while rendering JSX components
// eslint-disable-next-line @typescript-eslint/naming-convention
export const TRIGGER_COMPONENTS: Record<string, () => ReactNode> = {
	// Bot icons for different themes
	"s2-p3-color-picker": () => <IntroductionS2P3ColorPicker />,
	"s2-p4-light-show": () => <IntroductionS2P4LightShow />,
	"s3-p4-display": () => <IntroductionS3P4Display />,
	"s4-p4-speaker": () => <SoundsSection />,
	"s5-p4-imu-viz": () => <IntroductionS5P4ImuViz />,
	"s5-p5-ball-moving": () => <IntroductionS5P5BallMoving />,
	"s6-p4-mz-viz": () => <IntroductionS6P4MzViz />,
	"s6-p6-tofs-viz": () => <IntroductionS6P6TofsViz />,
	"s9-p6-encoder-viz": () => <IntroductionS9P6EncoderViz />,
	"s8-p3-color-viz": () => <IntroductionS8P3ColorViz />,
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
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!component) {
		console.warn(`Trigger component "${key}" not found in registry`)
		return <Bot size={120} className="text-questionText" /> // fallback
	}
	return component()
}

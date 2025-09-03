"use client"

import { ReactNode } from "react"
import { Bot, Navigation, Eye, Radar, Lightbulb, Cog, ArrowRight, ScanLine, Puzzle,
	Trophy, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Heart } from "lucide-react"
import SoundsSection from "../../components/garage/sounds-and-demos/sounds/sounds-section"
import MeetPipS3P4Display from "../../components/career-quest/trigger-content/meet-pip-s3-p4-display"
import MeetPipS2P3ColorPicker from "../../components/career-quest/trigger-content/meet-pip-s2-p3-color-picker"
import MeetPipS5P4ImuViz from "../../components/career-quest/trigger-content/meet-pip-s5-p4-imu-viz"
import MeetPipS5P5BallMoving from "../../components/career-quest/trigger-content/meet-pip-s5-p5-ball-moving"
import MeetPipS6P4MzViz from "../../components/career-quest/trigger-content/meet-pip-s6-p4-mz-viz"
import MeetPipS6P6TofsViz from "../../components/career-quest/trigger-content/meet-pip-s6-p6-tofs-viz"
import MeetPipS9P6EncoderViz from "../../components/career-quest/trigger-content/meet-pip-s9-p6-encoder-viz"
import MeetPipS8P3ColorViz from "../../components/career-quest/trigger-content/meet-pip-s8-p3-color-viz"
import DinoLeaderboard from "../../components/career-quest/trigger-content/dino-leaderboard"

// Component registry for trigger images
// This allows us to store string keys in MobX state while rendering JSX components
// eslint-disable-next-line @typescript-eslint/naming-convention
const TRIGGER_COMPONENTS: Record<string, () => ReactNode> = {
	// Bot icons for different themes
	"s2-p3-color-picker": (): ReactNode => <MeetPipS2P3ColorPicker />,
	"s3-p4-display": (): ReactNode => <MeetPipS3P4Display />,
	"s4-p4-speaker": (): ReactNode => <SoundsSection />,
	"s5-p4-imu-viz": (): ReactNode => <MeetPipS5P4ImuViz />,
	"s5-p5-ball-moving": (): ReactNode => <MeetPipS5P5BallMoving />,
	"s6-p4-mz-viz": (): ReactNode => <MeetPipS6P4MzViz />,
	"s6-p6-tofs-viz": (): ReactNode => <MeetPipS6P6TofsViz />,
	"s8-p3-color-viz": (): ReactNode => <MeetPipS8P3ColorViz />,
	"s9-p6-encoder-viz": (): ReactNode => <MeetPipS9P6EncoderViz />,
	"dino-leaderboard": (): ReactNode => <DinoLeaderboard />,
	"bot-humpback": (): ReactNode => <Bot size={120} className="text-humpback" />,
	"bot-macaw": (): ReactNode => <Bot size={120} className="text-macaw" />,

	// Heading icons for humpback theme
	"heading1-humpback": (): ReactNode => <Heading1 size={120} className="text-humpback" />,
	"heading2-humpback": (): ReactNode => <Heading2 size={120} className="text-humpback" />,
	"heading3-humpback": (): ReactNode => <Heading3 size={120} className="text-humpback" />,
	"heading4-humpback": (): ReactNode => <Heading4 size={120} className="text-humpback" />,
	"heading5-humpback": (): ReactNode => <Heading5 size={120} className="text-humpback" />,
	"heading6-humpback": (): ReactNode => <Heading6 size={120} className="text-humpback" />,

	// Heading icons for macaw theme
	"heading1-macaw": (): ReactNode => <Heading1 size={120} className="text-macaw" />,
	"heading2-macaw": (): ReactNode => <Heading2 size={120} className="text-macaw" />,
	"heading3-macaw": (): ReactNode => <Heading3 size={120} className="text-macaw" />,
	"heading4-macaw": (): ReactNode => <Heading4 size={120} className="text-macaw" />,
	"heading5-macaw": (): ReactNode => <Heading5 size={120} className="text-macaw" />,
	"heading6-macaw": (): ReactNode => <Heading6 size={120} className="text-macaw" />,

	// Other icons for macaw theme
	"lightbulb-macaw": (): ReactNode => <Lightbulb size={120} className="text-macaw" />,
	"cog-macaw": (): ReactNode => <Cog size={120} className="text-macaw" />,
	"arrow-right-macaw": (): ReactNode => <ArrowRight size={120} className="text-macaw" />,
	"scan-line-macaw": (): ReactNode => <ScanLine size={120} className="text-macaw" />,
	"puzzle-macaw": (): ReactNode => <Puzzle size={120} className="text-macaw" />,
	"trophy-macaw": (): ReactNode => <Trophy size={120} className="text-macaw" />,

	// Other icons for humpback theme
	"navigation-humpback": (): ReactNode => <Navigation size={120} className="text-humpback" />,
	"eye-humpback": (): ReactNode => <Eye size={120} className="text-humpback" />,
	"radar-humpback": (): ReactNode => <Radar size={120} className="text-humpback" />,
	"heart-humpback": (): ReactNode => <Heart size={120} className="text-humpback" />,

	// Other icons for macaw theme
	"navigation-macaw": (): ReactNode => <Navigation size={120} className="text-macaw" />,
	"heart-macaw": (): ReactNode => <Heart size={120} className="text-macaw" />,
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

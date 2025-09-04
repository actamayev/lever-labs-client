"use client"

import { ReactNode } from "react"
import { Bot } from "lucide-react"
import MeetPipS3P4Display from "../../components/career-quest/trigger-content/meet-pip-s3-p4-display"
import MeetPipS2P3ColorPicker from "../../components/career-quest/trigger-content/meet-pip-s2-p3-color-picker"
import MeetPipS5P4ImuViz from "../../components/career-quest/trigger-content/meet-pip-s5-p4-imu-viz"
import MeetPipS5P5BallMoving from "../../components/career-quest/trigger-content/meet-pip-s5-p5-ball-moving"
import MeetPipS6P4MzViz from "../../components/career-quest/trigger-content/meet-pip-s6-p4-mz-viz"
import MeetPipS6P6TofsViz from "../../components/career-quest/trigger-content/meet-pip-s6-p6-tofs-viz"
import MeetPipS9P6EncoderViz from "../../components/career-quest/trigger-content/meet-pip-s9-p6-encoder-viz"
import MeetPipS8P3ColorViz from "../../components/career-quest/trigger-content/meet-pip-s8-p3-color-viz"
import DinoLeaderboard from "../../components/career-quest/trigger-content/dino-leaderboard"
import MeetPipS4P4 from "../../components/career-quest/trigger-content/meet-pip-s4-p4-speaker"

// Component registry for trigger images
// This allows us to store string keys in MobX state while rendering JSX components
// eslint-disable-next-line @typescript-eslint/naming-convention
const TRIGGER_COMPONENTS: Record<string, () => ReactNode> = {
	// Bot icons for different themes
	"s2-p3-color-picker": (): ReactNode => <MeetPipS2P3ColorPicker />,
	"s3-p4-display": (): ReactNode => <MeetPipS3P4Display />,
	"s4-p4-speaker": (): ReactNode => <MeetPipS4P4 />,
	"s5-p4-imu-viz": (): ReactNode => <MeetPipS5P4ImuViz />,
	"s5-p5-ball-moving": (): ReactNode => <MeetPipS5P5BallMoving />,
	"s6-p4-mz-viz": (): ReactNode => <MeetPipS6P4MzViz />,
	"s6-p6-tofs-viz": (): ReactNode => <MeetPipS6P6TofsViz />,
	"s8-p3-color-viz": (): ReactNode => <MeetPipS8P3ColorViz />,
	"s9-p6-encoder-viz": (): ReactNode => <MeetPipS9P6EncoderViz />,
	"dino-leaderboard": (): ReactNode => <DinoLeaderboard />,
	"bot-humpback": (): ReactNode => <Bot size={120} className="text-humpback" />,
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

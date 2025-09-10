"use client"

import { ReactNode } from "react"
import MeetPipS3P4Display from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s3-p4-display"
import MeetPipS2P3ColorPicker from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s2-p3-color-picker"
import MeetPipS5P4ImuViz from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s5-p4-imu-viz"
import MeetPipS5P5BallMoving from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s5-p5-ball-moving"
import MeetPipS6P4MzViz from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s6-p4-mz-viz"
import MeetPipS6P6TofsViz from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s6-p6-tofs-viz"
import MeetPipS9P6EncoderViz from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s9-p6-encoder-viz"
import MeetPipS8P3ColorViz from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s8-p3-color-viz"
import DinoLeaderboard from "../../../components/career-quest/cq-right-components/meet-pip/dino-leaderboard"
import MeetPipS4P4 from "../../../components/career-quest/cq-right-components/meet-pip/meet-pip-s4-p4-speaker"

// eslint-disable-next-line @typescript-eslint/naming-convention
const DRIVING_SCHOOL_COMPONENTS: Record<string, () => ReactNode> = {
	// Bot icons for different themes
	"driving-school-2-1-content": (): ReactNode => <MeetPipS2P3ColorPicker />,
	"driving-school-2-3-content": (): ReactNode => <MeetPipS3P4Display />,
	"driving-school-2-4-content": (): ReactNode => <MeetPipS4P4 />,
	"driving-school-3-2-content": (): ReactNode => <MeetPipS5P4ImuViz />,
	"driving-school-3-4-content": (): ReactNode => <MeetPipS5P5BallMoving />,
	"driving-school-3-5-content": (): ReactNode => <MeetPipS6P4MzViz />,
	"driving-school-4-3-content": (): ReactNode => <MeetPipS6P6TofsViz />,
	"driving-school-4-4-content": (): ReactNode => <MeetPipS8P3ColorViz />,
	"driving-school-4-5-content": (): ReactNode => <MeetPipS9P6EncoderViz />,
	"driving-school-5-1-content": (): ReactNode => <DinoLeaderboard />,
	"driving-school-5-2-content": (): ReactNode => <MeetPipS8P3ColorViz />,
	"driving-school-5-3-content": (): ReactNode => <MeetPipS9P6EncoderViz />,
	"driving-school-5-4-content": (): ReactNode => <DinoLeaderboard />,
	"driving-school-5-5-content": (): ReactNode => <MeetPipS8P3ColorViz />,
	"driving-school-5-6-content": (): ReactNode => <MeetPipS9P6EncoderViz />,
}

export default DRIVING_SCHOOL_COMPONENTS

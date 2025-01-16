import LineFollowingCode from "../components/lab/element-3/line-following/line-following-code"
import LineFollowingVideo from "../components/lab/element-3/line-following/line-following-video"
import LineFollowingReading from "../components/lab/element-3/line-following/line-following-reading"
import InvertedPendulumCode from "../components/lab/element-3/inverted-pendulum/inverted-pendulum-code"
import InvertedPendulumVideo from "../components/lab/element-3/inverted-pendulum/inverted-pendulum-video"
import InvertedPendulumReading from "../components/lab/element-3/inverted-pendulum/inverted-pendulum-reading"

const element3Routes: ElementRoutes[] = [
	{
		path: "element-3/line-following",
		children: [
			{
				path: "Reading",
				element: <LineFollowingReading />
			},
			{
				path: "Video",
				element: <LineFollowingVideo />
			},
			{
				path: "Code",
				element: <LineFollowingCode />
			}
		]
	},
	{
		path: "element-3/inverted-pendulum",
		children: [
			{
				path: "Reading",
				element: <InvertedPendulumReading />
			},
			{
				path: "Video",
				element: <InvertedPendulumVideo />
			},
			{
				path: "Code",
				element: <InvertedPendulumCode />
			}
		]
	}
]

export default element3Routes

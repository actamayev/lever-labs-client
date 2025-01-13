import ChameleonCode from "../components/lab/element-2/chameleon/chameleon-code"
import ChameleonVideo from "../components/lab/element-2/chameleon/chameleon-video"
import ChameleonReading from "../components/lab/element-2/chameleon/chameleon-reading"

const element2Routes: ElementRoutes[] = [
	{
		path: "element-2/chameleon",
		children: [
			{
				path: "Reading",
				element: <ChameleonReading />
			},
			{
				path: "Video",
				element: <ChameleonVideo />
			},
			{
				path: "Code",
				element: <ChameleonCode />
			}
		]
	}
]

export default element2Routes

import ChameleonCode from "../components/lab/element-2/chameleon/chameleon-code"
import ChameleonVideo from "../components/lab/element-2/chameleon/chameleon-video"
import ChameleonReading from "../components/lab/element-2/chameleon/chameleon-reading"

const element2Routes: ElementRoutes[] = [
	{
		path: "element-2/chameleon",
		children: [
			{
				path: "reading",
				element: <ChameleonReading />
			},
			{
				path: "video",
				element: <ChameleonVideo />
			},
			{
				path: "code",
				element: <ChameleonCode />
			}
		]
	}
]

export default element2Routes

import LedReading from "../../components/lab/element-1/led/readings/intro-to-leds/intro-to-leds-reading"
import LEDLightShow from "../../components/lab/element-1/led/demos/led-light-show"

const ledRoutes: ElementChild[] = [
	{
		path: "Reading/intro-to-leds",
		element: <LedReading />
	},
	{
		path: "Demo/led-light-show",
		element: <LEDLightShow />
	},
	{
		path: "Reading/voltage",
		element: <LedReading />
	},
	{
		path: "Demo/first-light",
		element: <LedReading />
	},
	{
		path: "Reading/rgb-leds",
		element: <LedReading />
	},
	{
		path: "Reading/intro-to-code",
		element: <LedReading />
	},
	{
		path: "Demo/blue-leds",
		element: <LedReading />
	},
	{
		path: "Demo/check-button-press",
		element: <LedReading />
	},
	{
		path: "Demo/multi-button-led-control",
		element: <LedReading />
	},
	{
		path: "Code/led-control",
		element: <LedReading />
	},
	{
		path: "Reading/leds-and-loops",
		element: <LedReading />
	},
	{
		path: "Demo/led-counting-loop",
		element: <LedReading />
	},
	{
		path: "Demo/led-breathing",
		element: <LedReading />
	},
	{
		path: "Code/breathing-leds",
		element: <LedReading />
	},
	{
		path: "Demo/check-button-press",
		element: <LedReading />
	},
	{
		path: "Reading/gpio",
		element: <LedReading />
	},
	{
		path: "Demo/led-in-circle",
		element: <LedReading />
	},
	{
		path: "Reading/led-advantages",
		element: <LedReading />
	},
	{
		path: "Reading/leds-in-robotics",
		element: <LedReading />
	},
	{
		path: "Code/warehouse-pip",
		element: <LedReading />
	},
	{
		path: "Summary",
		element: <LedReading />
	}
]

export default ledRoutes

import LEDLightShow from "../../components/lab/element-1/led/demos/led-light-show"
import AnimatedTransitionWrapper from "../../components/animated-transition-wrapper"
import IntroToLEDsReading from "../../components/lab/element-1/led/readings/intro-to-leds/intro-to-leds-reading"
import VoltageReading from "../../components/lab/element-1/led/readings/voltage/voltage-reading"
import RGBLedsReading from "../../components/lab/element-1/led/readings/rgb-leds/rgb-leds-reading"
import ColorMixing from "../../components/lab/element-1/led/demos/color-mixing"
import FirstLight from "../../components/lab/element-1/led/demos/first-light"

const ledRoutes: ElementChild[] = [
	{
		path: "Reading/intro-to-leds",
		element: <AnimatedTransitionWrapper><IntroToLEDsReading /></AnimatedTransitionWrapper>
	},
	{
		path: "Demo/led-light-show",
		element: <AnimatedTransitionWrapper><LEDLightShow /></AnimatedTransitionWrapper>
	},
	{
		path: "Reading/voltage",
		element: <AnimatedTransitionWrapper><VoltageReading /></AnimatedTransitionWrapper>
	},
	{
		path: "Demo/first-light",
		element: <AnimatedTransitionWrapper><FirstLight /></AnimatedTransitionWrapper>
	},
	{
		path: "Reading/rgb-leds",
		element: <AnimatedTransitionWrapper><RGBLedsReading /></AnimatedTransitionWrapper>
	},
	{
		path: "Demo/color-mixing",
		element: <AnimatedTransitionWrapper><ColorMixing /></AnimatedTransitionWrapper>
	},
	{
		path: "Reading/intro-to-code",
		element: <RGBLedsReading />
	},
	{
		path: "Demo/blue-leds",
		element: <RGBLedsReading />
	},
	{
		path: "Demo/check-button-press",
		element: <RGBLedsReading />
	},
	{
		path: "Demo/multi-button-led-control",
		element: <RGBLedsReading />
	},
	{
		path: "Code/led-control",
		element: <RGBLedsReading />
	},
	{
		path: "Reading/leds-and-loops",
		element: <RGBLedsReading />
	},
	{
		path: "Demo/led-counting-loop",
		element: <RGBLedsReading />
	},
	{
		path: "Demo/led-breathing",
		element: <RGBLedsReading />
	},
	{
		path: "Code/breathing-leds",
		element: <RGBLedsReading />
	},
	{
		path: "Demo/check-button-press",
		element: <RGBLedsReading />
	},
	{
		path: "Reading/gpio",
		element: <RGBLedsReading />
	},
	{
		path: "Demo/led-in-circle",
		element: <RGBLedsReading />
	},
	{
		path: "Reading/led-advantages",
		element: <RGBLedsReading />
	},
	{
		path: "Reading/leds-in-robotics",
		element: <RGBLedsReading />
	},
	{
		path: "Code/warehouse-pip",
		element: <RGBLedsReading />
	},
	{
		path: "Summary",
		element: <RGBLedsReading />
	}
]

export default ledRoutes

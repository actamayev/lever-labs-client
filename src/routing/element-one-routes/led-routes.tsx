import FirstLight from "../../components/lab/element-1/led/demos/first-light"
import ColorMixing from "../../components/lab/element-1/led/demos/color-mixing"
import LEDLightShow from "../../components/lab/element-1/led/demos/led-light-show"
import AnimatedTransitionWrapper from "../../components/animated-transition-wrapper"
import VoltageReading from "../../components/lab/element-1/led/readings/voltage/voltage-reading"
import RGBLedsReading from "../../components/lab/element-1/led/readings/rgb-leds/rgb-leds-reading"
import IntroToLEDsReading from "../../components/lab/element-1/led/readings/intro-to-leds/intro-to-leds-reading"
import IntroToCodeReading from "../../components/lab/element-1/led/readings/intro-to-code/intro-to-code-reading"
import MultiButtonLEDControl from "../../components/lab/element-1/led/demos/multi-button-led-control"
import BlueLEDs from "../../components/lab/element-1/led/demos/blue-leds"
import CheckButtonPress from "../../components/lab/element-1/led/demos/check-button-press"
import LEDControl from "../../components/lab/element-1/led/code/led-control"
import SimpleLEDControl from "../../components/lab/element-1/led/demos/simple-led-control"

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
		element: <AnimatedTransitionWrapper><IntroToCodeReading /></AnimatedTransitionWrapper>
	},
	{
		path: "Demo/blue-leds",
		element: <AnimatedTransitionWrapper><BlueLEDs /></AnimatedTransitionWrapper>
	},
	{
		path: "Demo/check-button-press",
		element: <AnimatedTransitionWrapper><CheckButtonPress /></AnimatedTransitionWrapper>
	},
	{
		path: "Demo/simple-led-control",
		element: <AnimatedTransitionWrapper><SimpleLEDControl /></AnimatedTransitionWrapper>
	},
	{
		path: "Demo/multi-button-led-control",
		element: <AnimatedTransitionWrapper><MultiButtonLEDControl /></AnimatedTransitionWrapper>
	},
	{
		path: "Code/led-control",
		element: <AnimatedTransitionWrapper><LEDControl /></AnimatedTransitionWrapper>
	},
	{
		path: "Reading/leds-and-loops",
		element: <AnimatedTransitionWrapper><RGBLedsReading /></AnimatedTransitionWrapper>
	},
	{
		path: "Demo/led-counting-loop",
		element: <AnimatedTransitionWrapper><RGBLedsReading /></AnimatedTransitionWrapper>
	},
	{
		path: "Demo/led-breathing",
		element: <AnimatedTransitionWrapper><RGBLedsReading /></AnimatedTransitionWrapper>
	},
	{
		path: "Code/breathing-leds",
		element: <AnimatedTransitionWrapper><RGBLedsReading /></AnimatedTransitionWrapper>
	},
	{
		path: "Demo/check-button-press",
		element: <AnimatedTransitionWrapper><RGBLedsReading /></AnimatedTransitionWrapper>
	},
	{
		path: "Reading/gpio",
		element: <AnimatedTransitionWrapper><RGBLedsReading /></AnimatedTransitionWrapper>
	},
	{
		path: "Demo/led-in-circle",
		element: <AnimatedTransitionWrapper><RGBLedsReading /></AnimatedTransitionWrapper>
	},
	{
		path: "Reading/led-advantages",
		element: <AnimatedTransitionWrapper><RGBLedsReading /></AnimatedTransitionWrapper>
	},
	{
		path: "Reading/leds-in-robotics",
		element: <AnimatedTransitionWrapper><RGBLedsReading /></AnimatedTransitionWrapper>
	},
	{
		path: "Code/warehouse-pip",
		element: <AnimatedTransitionWrapper><RGBLedsReading /></AnimatedTransitionWrapper>
	},
	{
		path: "Summary",
		element: <AnimatedTransitionWrapper><RGBLedsReading /></AnimatedTransitionWrapper>
	}
]

export default ledRoutes

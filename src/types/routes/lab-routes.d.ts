declare global {
	type ElementLabPages =
		| "/lab/element-1"
		| "/lab/element-2"
		| "/lab/element-3"

	// Element 1:
	type LedLabPages =
		| "/lab/element-1/led/reading/intro-to-leds"
		| "/lab/element-1/led/demo/led-light-show"
		| "/lab/element-1/led/reading/voltage"
		| "/lab/element-1/led/demo/first-light"
		| "/lab/element-1/led/reading/rgb-leds"
		| "/lab/element-1/led/demo/color-mixing"
		| "/lab/element-1/led/reading/intro-to-code"
		| "/lab/element-1/led/demo/blue-leds"
		| "/lab/element-1/led/demo/check-button-press"
		| "/lab/element-1/led/demo/simple-led-control"
		| "/lab/element-1/led/demo/multi-button-led-control"
		| "/lab/element-1/led/code/led-control"
		| "/lab/element-1/led/reading/leds-and-loops"
		| "/lab/element-1/led/demo/led-counting-loop"
		| "/lab/element-1/led/demo/led-breathing"
		| "/lab/element-1/led/code/breathing-leds"
		| "/lab/element-1/led/demo/check-button-press"
		| "/lab/element-1/led/reading/gpio"
		| "/lab/element-1/led/demo/led-in-circle"
		| "/lab/element-1/led/reading/led-advantages"
		| "/lab/element-1/led/reading/leds-in-robotics"
		| "/lab/element-1/led/code/warehouse-pip"
		| "/lab/element-1/led/summary"

	type Element1LabPages =
		| LedLabPages

	// Element 2:
	// type ChameleonLabPages =
	// 	| "/lab/element-2/chameleon/reading"
	// 	| "/lab/element-2/chameleon/video"
	// 	| "/lab/element-2/chameleon/code"

	// type ObstacleAvoidanceLabPages =
	// 	| "/lab/element-2/avoid-obstacles/reading"
	// 	| "/lab/element-2/avoid-obstacles/video"
	// 	| "/lab/element-2/avoid-obstacles/code"

	// type Element2LabPages =
	// 	| ChameleonLabPages
	// 	| ObstacleAvoidanceLabPages

	// // Element 3:
	// type LineFollowingLabPages =
	// 	| "/lab/element-3/line-following/reading"
	// 	| "/lab/element-3/line-following/video"
	// 	| "/lab/element-3/line-following/code"

	// type InvertedPendulumLabPages =
	// 	| "/lab/element-3/inverted-pendulum/reading"
	// 	| "/lab/element-3/inverted-pendulum/video"
	// 	| "/lab/element-3/inverted-pendulum/code"

	// type Element3LabPages =
	// 	| LineFollowingLabPages
	// 	| InvertedPendulumLabPages

	type LabPages =
		| "/lab/welcome"
		| ElementLabPages
		| Element1LabPages
		// | Element2LabPages
		// | Element3LabPages
}

export {}

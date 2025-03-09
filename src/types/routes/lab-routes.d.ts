declare global {
	// type ElementLabPages =
	// 	| "/lab/element-1"
		// | "/lab/element-2"
		// | "/lab/element-3"

	// Element 1:
	type LedLabPages =
		| "/lab/led/reading/intro-to-leds"
		| "/lab/led/demo/led-light-show"
		| "/lab/led/reading/voltage"
		| "/lab/led/demo/first-light"
		| "/lab/led/reading/rgb-leds"
		| "/lab/led/demo/color-mixing"
		| "/lab/led/reading/intro-to-code"
		| "/lab/led/demo/blue-leds"
		| "/lab/led/demo/check-button-press"
		| "/lab/led/demo/simple-led-control"
		| "/lab/led/demo/multi-button-led-control"
		| "/lab/led/code/led-control"
		| "/lab/led/reading/leds-and-loops"
		| "/lab/led/demo/led-counting-loop"
		| "/lab/led/demo/led-breathing"
		| "/lab/led/code/breathing-leds"
		| "/lab/led/demo/check-button-press"
		| "/lab/led/reading/gpio"
		| "/lab/led/demo/led-in-circle"
		| "/lab/led/reading/led-advantages"
		| "/lab/led/reading/leds-in-robotics"
		| "/lab/led/code/warehouse-pip"
		| "/lab/led/summary"

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
		| "/lab"
		| "/lab/welcome"
		| LedLabPages
		// | Element1LabPages
		// | Element2LabPages
		// | Element3LabPages
}

export {}

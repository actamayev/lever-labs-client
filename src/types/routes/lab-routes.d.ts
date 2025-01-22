declare global {
	type ElementLabPages =
		| "/lab/element-1"
		| "/lab/element-2"
		| "/lab/element-3"

	type ElementStartPages =
		| "/lab/element-1/start"
		| "/lab/element-2/start"
		| "/lab/element-3/start"

	// Element 1:
	type MotorLabPages =
		| "/lab/element-1/motor/reading"
		| "/lab/element-1/motor/video"
		| "/lab/element-1/motor/code"

	type LedLabPages =
		| "/lab/element-1/led/reading"
		| "/lab/element-1/led/video"
		| "/lab/element-1/led/code"
		| "/lab/element-1/led/demo"

	type EncoderLabPages =
		| "/lab/element-1/encoder/reading"
		| "/lab/element-1/encoder/video"
		| "/lab/element-1/encoder/code"

	type ButtonLabPages =
		| "/lab/element-1/button/reading"
		| "/lab/element-1/button/video"
		| "/lab/element-1/button/code"

	type ColorSensorLabPages =
		| "/lab/element-1/color-sensor/reading"
		| "/lab/element-1/color-sensor/video"
		| "/lab/element-1/color-sensor/code"

	type IRSensorArrayLabPages =
		| "/lab/element-1/ir-sensor-array/reading"
		| "/lab/element-1/ir-sensor-array/video"
		| "/lab/element-1/ir-sensor-array/code"

	type IrCommunicationSensorLabPages =
		| "/lab/element-1/ir-communication-sensor/reading"
		| "/lab/element-1/ir-communication-sensor/video"
		| "/lab/element-1/ir-communication-sensor/code"

	type TofSensorLabPages =
		| "/lab/element-1/tof/reading"
		| "/lab/element-1/tof/video"
		| "/lab/element-1/tof/code"

	type ImuLabPages =
		| "/lab/element-1/imu/reading"
		| "/lab/element-1/imu/video"
		| "/lab/element-1/imu/code"

	type Element1LabPages =
		| MotorLabPages
		| LedLabPages
		| EncoderLabPages
		| ButtonLabPages
		| ColorSensorLabPages
		| IRSensorArrayLabPages
		| IrCommunicationSensorLabPages
		| TofSensorLabPages
		| ImuLabPages

	// Element 2:
	type ChameleonLabPages =
		| "/lab/element-2/chameleon/reading"
		| "/lab/element-2/chameleon/video"
		| "/lab/element-2/chameleon/code"

	type ObstacleAvoidanceLabPages =
		| "/lab/element-2/avoid-obstacles/reading"
		| "/lab/element-2/avoid-obstacles/video"
		| "/lab/element-2/avoid-obstacles/code"

	type Element2LabPages =
		| ChameleonLabPages
		| ObstacleAvoidanceLabPages

	// Element 3:
	type LineFollowingLabPages =
		| "/lab/element-3/line-following/reading"
		| "/lab/element-3/line-following/video"
		| "/lab/element-3/line-following/code"

	type InvertedPendulumLabPages =
		| "/lab/element-3/inverted-pendulum/reading"
		| "/lab/element-3/inverted-pendulum/video"
		| "/lab/element-3/inverted-pendulum/code"

	type Element3LabPages =
		| LineFollowingLabPages
		| InvertedPendulumLabPages

	type LabPages =
		| "/lab/welcome"
		| ElementStartPages
		| ElementLabPages
		| Element1LabPages
		| Element2LabPages
		| Element3LabPages
}

export {}

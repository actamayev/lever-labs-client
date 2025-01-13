declare global {
	type ElementLabPages =
		| "/lab/element-1"
		| "/lab/element-2"
		| "/lab/element-3"

	// Element 1:
	type MotorLabPages =
		| "/lab/element-1/motor/reading"
		| "/lab/element-1/motor/video"
		| "/lab/element-1/motor/code"

	type LedLabPages =
		| "/lab/element-1/led/reading"
		| "/lab/element-1/led/video"
		| "/lab/element-1/led/code"

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

	type IrColorSensorLabPages =
		| "/lab/element-1/ir-color-sensor/reading"
		| "/lab/element-1/ir-color-sensor/video"
		| "/lab/element-1/ir-color-sensor/code"

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
		| IrColorSensorLabPages
		| IrCommunicationSensorLabPages
		| TofSensorLabPages
		| ImuLabPages

	// Element 2:
	type ChameleonLabPages =
		| "/lab/element-2/chameleon/reading"
		| "/lab/element-2/chameleon/video"
		| "/lab/element-2/chameleon/code"

	type AvoidObstaclesLabPages =
		| "/lab/element-2/chameleon/reading"
		| "/lab/element-2/chameleon/video"
		| "/lab/element-2/chameleon/code"

	type Element2LabPages =
		| ChameleonLabPages
		| AvoidObstaclesLabPages

	type LabPages =
		| "/lab/welcome"
		| ElementLabPages
		| Element1LabPages
		| Element2LabPages
}

export {}

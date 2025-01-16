/* eslint-disable max-len */
import BasicHelmet from "../../components/helmet/basic-helmet"

const labHelmetData: HelmetData = {
	"/lab": (
		<BasicHelmet
			pageTitleData="Lab"
			description="Explore guided tutorials, videos, and challenges to learn about robot sensors and control in a structured learning environment."
			url="https://www.bluedotrobots.com/lab"
		/>
	),
	"/lab/welcome": (
		<BasicHelmet
			pageTitleData="Lab Welcome"
			description="Welcome to the Lab! This is where the magic happens. Where you'll learn the same fundamental skills you need to land rockets, design self-driving cars, and build robotics that can walk (and talk)."
			url="https://www.bluedotrobots.com/lab/welcome"
		/>
	),
	// Element 1
	"/lab/element-1": (
		<BasicHelmet
			pageTitleData="Element 1: Robot Basics"
			description="Learn the fundamental components of robotics including motors, sensors, and basic control mechanisms."
			url="https://www.bluedotrobots.com/lab/element-1"
		/>
	),
	"/lab/element-1/motor/reading": (
		<BasicHelmet
			pageTitleData="Motors: How They Work"
			description="Learn about DC motors, how they function, and their role in robotics. Understand the basics of motor control and movement."
			url="https://www.bluedotrobots.com/lab/element-1/motor/reading"
		/>
	),
	"/lab/element-1/motor/video": (
		<BasicHelmet
			pageTitleData="Motors: Video Tutorial"
			description="Watch a detailed video demonstration of motor control and implementation in robotics."
			url="https://www.bluedotrobots.com/lab/element-1/motor/video"
		/>
	),
	"/lab/element-1/motor/code": (
		<BasicHelmet
			pageTitleData="Motors: Coding Exercise"
			description="Practice controlling motors through hands-on coding exercises."
			url="https://www.bluedotrobots.com/lab/element-1/motor/code"
		/>
	),
	"/lab/element-1/led/reading": (
		<BasicHelmet
			pageTitleData="LEDs: Understanding Light Control"
			description="Learn about LED functionality, control methods, and applications in robotics."
			url="https://www.bluedotrobots.com/lab/element-1/led/reading"
		/>
	),
	"/lab/element-1/led/video": (
		<BasicHelmet
			pageTitleData="LEDs: Video Tutorial"
			description="Watch a comprehensive video guide on LED control and programming."
			url="https://www.bluedotrobots.com/lab/element-1/led/video"
		/>
	),
	"/lab/element-1/led/code": (
		<BasicHelmet
			pageTitleData="LEDs: Coding Exercise"
			description="Practice LED control through interactive coding exercises and experiments."
			url="https://www.bluedotrobots.com/lab/element-1/led/code"
		/>
	),
	"/lab/element-1/encoder/reading": (
		<BasicHelmet
			pageTitleData="Encoders: Understanding Position Feedback"
			description="Learn about rotary encoders, how they measure position and speed, and their crucial role in precise robot control."
			url="https://www.bluedotrobots.com/lab/element-1/encoder/reading"
		/>
	),
	"/lab/element-1/encoder/video": (
		<BasicHelmet
			pageTitleData="Encoders: Video Tutorial"
			description="Watch a detailed video explanation of encoder functionality and implementation in robotics."
			url="https://www.bluedotrobots.com/lab/element-1/encoder/video"
		/>
	),
	"/lab/element-1/encoder/code": (
		<BasicHelmet
			pageTitleData="Encoders: Coding Exercise"
			description="Practice working with encoder data through hands-on coding exercises and position control experiments."
			url="https://www.bluedotrobots.com/lab/element-1/encoder/code"
		/>
	),
	"/lab/element-1/button/reading": (
		<BasicHelmet
			pageTitleData="Buttons: Digital Input Basics"
			description="Learn about digital inputs, button interfaces, and their use in robot control and user interaction."
			url="https://www.bluedotrobots.com/lab/element-1/button/reading"
		/>
	),
	"/lab/element-1/button/video": (
		<BasicHelmet
			pageTitleData="Buttons: Video Tutorial"
			description="Watch a comprehensive guide on implementing button controls and input handling in robotics."
			url="https://www.bluedotrobots.com/lab/element-1/button/video"
		/>
	),
	"/lab/element-1/button/code": (
		<BasicHelmet
			pageTitleData="Buttons: Coding Exercise"
			description="Practice button input handling and control flow through interactive coding exercises."
			url="https://www.bluedotrobots.com/lab/element-1/button/code"
		/>
	),
	"/lab/element-1/color-sensor/reading": (
		<BasicHelmet
			pageTitleData="Color Sensors: Understanding Color Detection"
			description="Learn about color sensing technology, RGB color space, and how robots can detect and respond to colors."
			url="https://www.bluedotrobots.com/lab/element-1/color-sensor/reading"
		/>
	),
	"/lab/element-1/color-sensor/video": (
		<BasicHelmet
			pageTitleData="Color Sensors: Video Tutorial"
			description="Watch a detailed demonstration of color sensor functionality and implementation in robotics."
			url="https://www.bluedotrobots.com/lab/element-1/color-sensor/video"
		/>
	),
	"/lab/element-1/color-sensor/code": (
		<BasicHelmet
			pageTitleData="Color Sensors: Coding Exercise"
			description="Practice color detection and response programming through hands-on coding exercises."
			url="https://www.bluedotrobots.com/lab/element-1/color-sensor/code"
		/>
	),
	"/lab/element-1/ir-sensor-array/reading": (
		<BasicHelmet
			pageTitleData="IR Sensor Array: Advanced Color Detection"
			description="Learn about infrared color sensing, its advantages, and applications in robotics and automation."
			url="https://www.bluedotrobots.com/lab/element-1/ir-sensor-array/reading"
		/>
	),
	"/lab/element-1/ir-sensor-array/video": (
		<BasicHelmet
			pageTitleData="IR Sensor Array: Video Tutorial"
			description="Watch a comprehensive guide on using IR color sensors for advanced color detection tasks."
			url="https://www.bluedotrobots.com/lab/element-1/ir-sensor-array/video"
		/>
	),
	"/lab/element-1/ir-sensor-array/code": (
		<BasicHelmet
			pageTitleData="IR Sensor Array: Coding Exercise"
			description="Practice IR color sensor programming and calibration through interactive coding exercises."
			url="https://www.bluedotrobots.com/lab/element-1/ir-sensor-array/code"
		/>
	),
	"/lab/element-1/ir-communication-sensor/reading": (
		<BasicHelmet
			pageTitleData="IR Communication: Robot Interaction"
			description="Learn about infrared communication between robots, protocols, and implementing robot-to-robot interaction."
			url="https://www.bluedotrobots.com/lab/element-1/ir-communication-sensor/reading"
		/>
	),
	"/lab/element-1/ir-communication-sensor/video": (
		<BasicHelmet
			pageTitleData="IR Communication: Video Tutorial"
			description="Watch a detailed guide on implementing IR communication between robots and handling data transfer."
			url="https://www.bluedotrobots.com/lab/element-1/ir-communication-sensor/video"
		/>
	),
	"/lab/element-1/ir-communication-sensor/code": (
		<BasicHelmet
			pageTitleData="IR Communication: Coding Exercise"
			description="Practice implementing IR communication protocols and robot interaction through coding exercises."
			url="https://www.bluedotrobots.com/lab/element-1/ir-communication-sensor/code"
		/>
	),
	"/lab/element-1/tof/reading": (
		<BasicHelmet
			pageTitleData="Time-of-Flight Sensors: Distance Measurement"
			description="Learn about ToF sensor technology, precise distance measurement, and its applications in robotics."
			url="https://www.bluedotrobots.com/lab/element-1/tof/reading"
		/>
	),
	"/lab/element-1/tof/video": (
		<BasicHelmet
			pageTitleData="Time-of-Flight Sensors: Video Tutorial"
			description="Watch a comprehensive guide on implementing ToF sensors for precise distance measurement in robotics."
			url="https://www.bluedotrobots.com/lab/element-1/tof/video"
		/>
	),
	"/lab/element-1/tof/code": (
		<BasicHelmet
			pageTitleData="Time-of-Flight Sensors: Coding Exercise"
			description="Practice working with ToF sensor data and distance-based control through coding exercises."
			url="https://www.bluedotrobots.com/lab/element-1/tof/code"
		/>
	),
	"/lab/element-1/imu/reading": (
		<BasicHelmet
			pageTitleData="IMU: Motion and Orientation"
			description="Learn about Inertial Measurement Units, understanding acceleration, gyroscope data, and orientation tracking."
			url="https://www.bluedotrobots.com/lab/element-1/imu/reading"
		/>
	),
	"/lab/element-1/imu/video": (
		<BasicHelmet
			pageTitleData="IMU: Video Tutorial"
			description="Watch a detailed guide on using IMU sensors for motion tracking and orientation control in robotics."
			url="https://www.bluedotrobots.com/lab/element-1/imu/video"
		/>
	),
	"/lab/element-1/imu/code": (
		<BasicHelmet
			pageTitleData="IMU: Coding Exercise"
			description="Practice processing IMU data and implementing orientation-based control through coding exercises."
			url="https://www.bluedotrobots.com/lab/element-1/imu/code"
		/>
	),

	// Element 2
	"/lab/element-2": (
		<BasicHelmet
			pageTitleData="Element 2: Interactive Behaviors"
			description="Explore more advanced robotics concepts and create interactive behaviors with your Pip."
			url="https://www.bluedotrobots.com/lab/element-2"
		/>
	),
	"/lab/element-2/chameleon/reading": (
		<BasicHelmet
			pageTitleData="Chameleon: Color Response Systems"
			description="Learn to create sophisticated color detection and response systems, enabling your Pip to adapt to its environment like a chameleon."
			url="https://www.bluedotrobots.com/lab/element-2/chameleon/reading"
		/>
	),
	"/lab/element-2/chameleon/video": (
		<BasicHelmet
			pageTitleData="Chameleon: Video Tutorial"
			description="Watch a comprehensive demonstration of implementing adaptive color response systems in your Pip."
			url="https://www.bluedotrobots.com/lab/element-2/chameleon/video"
		/>
	),
	"/lab/element-2/chameleon/code": (
		<BasicHelmet
			pageTitleData="Chameleon: Coding Exercise"
			description="Build and test your own color response system through hands-on coding exercises and real-time feedback."
			url="https://www.bluedotrobots.com/lab/element-2/chameleon/code"
		/>
	),
	"/lab/element-2/avoid-obstacles/reading": (
		<BasicHelmet
			pageTitleData="Obstacle Avoidance: Navigation Systems"
			description="Master the principles of autonomous navigation and obstacle detection, enabling your Pip to safely navigate complex environments."
			url="https://www.bluedotrobots.com/lab/element-2/avoid-obstacles/reading"
		/>
	),
	"/lab/element-2/avoid-obstacles/video": (
		<BasicHelmet
			pageTitleData="Obstacle Avoidance: Video Tutorial"
			description="Watch a detailed guide on implementing effective obstacle avoidance algorithms and sensor fusion techniques."
			url="https://www.bluedotrobots.com/lab/element-2/avoid-obstacles/video"
		/>
	),
	"/lab/element-2/avoid-obstacles/code": (
		<BasicHelmet
			pageTitleData="Obstacle Avoidance: Coding Exercise"
			description="Develop and test obstacle avoidance algorithms through interactive coding exercises and real-world scenarios."
			url="https://www.bluedotrobots.com/lab/element-2/avoid-obstacles/code"
		/>
	),

	// Element 3
	"/lab/element-3": (
		<BasicHelmet
			pageTitleData="Element 3: Advanced Control"
			description="Master advanced robotics concepts including autonomous navigation and complex control systems."
			url="https://www.bluedotrobots.com/lab/element-3"
		/>
	),
	"/lab/element-3/line-following/reading": (
		<BasicHelmet
			pageTitleData="Line Following: Advanced Navigation"
			description="Master the principles of line following algorithms, PID control, and sensor fusion for precise robot navigation."
			url="https://www.bluedotrobots.com/lab/element-3/line-following/reading"
		/>
	),
	"/lab/element-3/line-following/video": (
		<BasicHelmet
			pageTitleData="Line Following: Video Tutorial"
			description="Watch an in-depth guide on implementing robust line following systems with advanced control techniques."
			url="https://www.bluedotrobots.com/lab/element-3/line-following/video"
		/>
	),
	"/lab/element-3/line-following/code": (
		<BasicHelmet
			pageTitleData="Line Following: Coding Exercise"
			description="Implement and tune line following algorithms through challenging coding exercises and performance optimization tasks."
			url="https://www.bluedotrobots.com/lab/element-3/line-following/code"
		/>
	),
	"/lab/element-3/inverted-pendulum/reading": (
		<BasicHelmet
			pageTitleData="Inverted Pendulum: Balance Control"
			description="Learn advanced control theory and implementation through the classic inverted pendulum problem in robotics."
			url="https://www.bluedotrobots.com/lab/element-3/inverted-pendulum/reading"
		/>
	),
	"/lab/element-3/inverted-pendulum/video": (
		<BasicHelmet
			pageTitleData="Inverted Pendulum: Video Tutorial"
			description="Watch a detailed explanation of implementing balance control systems and stabilization algorithms."
			url="https://www.bluedotrobots.com/lab/element-3/inverted-pendulum/video"
		/>
	),
	"/lab/element-3/inverted-pendulum/code": (
		<BasicHelmet
			pageTitleData="Inverted Pendulum: Coding Exercise"
			description="Develop and tune balance control algorithms through interactive coding exercises and real-time testing."
			url="https://www.bluedotrobots.com/lab/element-3/inverted-pendulum/code"
		/>
	)
}

export default labHelmetData

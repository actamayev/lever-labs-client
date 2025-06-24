import { ChallengeData } from "@bluedotrobots/common-ts"

/* eslint-disable max-len */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const OBSTACLE_AVOIDANCE_CHALLENGE: ChallengeData = {
	id: "obstacle_avoidance_001",
	title: "Obstacle Detection with LEDs",
	description: "Write a script that checks if there's an object in front of the robot and if there is turn the LEDs red, and if there isn't turn the LEDs green",
	difficulty: "beginner",
	availableBlocks: [
		{
			type: "ultrasonic_sensor",
			category: "sensor",
			description: "Measures distance to objects in centimeters",
			codeTemplate: "int distance = ultrasonicSensor.read();"
		},
		{
			type: "led_control",
			category: "action",
			description: "Controls LED strip colors",
			codeTemplate: "setLEDColor(RED); // or GREEN, BLUE, etc."
		},
		{
			type: "if_statement",
			category: "logic",
			description: "Conditional logic block for making decisions"
		},
		{
			type: "forever_loop",
			category: "loop",
			description: "Runs code continuously in a loop"
		},
		{
			type: "delay",
			category: "action",
			description: "Pauses execution for a specified time",
			codeTemplate: "delay(100); // delay in milliseconds"
		}
	],
	availableSensors: ["ultrasonic", "LED_strip"],
	expectedBehavior: "LEDs turn red when object is detected within 10cm, green otherwise. The robot should continuously monitor for obstacles.",
	commonMistakes: [
		"Forgetting to use a forever loop to continuously check the sensor",
		"Using wrong distance threshold (too high or too low)",
		"Not handling sensor initialization properly",
		"Forgetting to add delay in the loop causing rapid flickering"
	],
	learningObjectives: [
		"Understanding how ultrasonic sensors work",
		"Using conditional logic with if statements",
		"Controlling LED output based on sensor input",
		"Creating continuous monitoring loops"
	],
	solutionCode: `void setup() {
  // Initialize sensors and LEDs
  ultrasonicSensor.init();
  LED.init();
}

void loop() {
  int distance = ultrasonicSensor.read();
  
  if (distance < 10) {
    setLEDColor(RED);
  } else {
    setLEDColor(GREEN);
  }
  
  delay(100);
}`,
	hints: {
		level1: "Think about what happens when you detect an object. What should the LEDs do? Remember to keep checking continuously!",
		level2: "You'll need a loop to continuously check the sensor, an if statement to decide LED color based on distance, and don't forget to add a small delay.",
		level3: "Use ultrasonicSensor.read() to get distance, compare it to 10cm with an if statement, and use setLEDColor(RED) or setLEDColor(GREEN) accordingly. Wrap it all in a loop() function."
	}
}

// Export additional challenges as needed
export const CHALLENGES = {
	OBSTACLE_AVOIDANCE: OBSTACLE_AVOIDANCE_CHALLENGE,
	// Add more challenges here as you create them
}

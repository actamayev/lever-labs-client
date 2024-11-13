/* eslint-disable @typescript-eslint/naming-convention */

export const PIP_BLOCK_TYPES = {
	ESP32_LED_CONTROL: "esp32_led_control",
	ESP32_DELAY: "esp32_delay",
	ESP32_LOOP: "esp32_loop"
} as const

export const PIP_FIELD_VALUES = {
	ESP32_LED_CONTROL: "led_state",
	ESP32_DELAY: "delay"
} as const

export type PipBlockNames = typeof PIP_BLOCK_TYPES[keyof typeof PIP_BLOCK_TYPES]

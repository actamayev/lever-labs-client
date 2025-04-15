/* eslint-disable @typescript-eslint/naming-convention */
export const LED_BLOCK_TYPES = {
	ESP32_LED_CONTROL: "esp32_led_control",
} as const

export const LED_FIELD_VALUES = {
	ESP32_LED_CONTROL: "led_state",
} as const

export type LEDBlockNames = typeof LED_BLOCK_TYPES[keyof typeof LED_BLOCK_TYPES]

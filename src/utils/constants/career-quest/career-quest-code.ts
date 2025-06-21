import { BlocklyJson } from "@bluedotrobots/common-ts"

interface CareerQuestCode {
	blocklyJson: BlocklyJson
	cppCode: string
}

const careerQuestCode: CareerQuestCode[] = [
	{
		blocklyJson: {
			"blocks": {
				"languageVersion": 0,
				"blocks": [
					{
						"type": "esp32_led_control",
						"id": "P)bh$Rk*Ian[~5p#G}wK",
						"x": -570,
						"y": -90,
						"fields": {
							"esp32_led_control": "WHITE"
						},
						"next": {
							"block": {
								"type": "esp32_delay",
								"id": "IGmG@OMvL^oNALZ=R:8=",
								"fields": {
									"esp32_delay": 1000
								},
								"next": {
									"block": {
										"type": "esp32_led_control",
										"id": "Y[;LU:B~*pff}w4]83Ne",
										"fields": {
											"esp32_led_control": "GREEN"
										}
									}
								}
							}
						}
					}
				]
			}
		},
		cppCode: "rgbLed.set_led_white();\ndelay(1000);\nrgbLed.set_led_green();"
	}
]

export default careerQuestCode

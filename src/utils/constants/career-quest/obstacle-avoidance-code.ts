"use client"

/* eslint-disable max-len */
import { BlocklyJson } from "@bluedotrobots/common-ts"

const obstacleAvoidanceBlocklyCode: BlocklyJson[] = [
	{
		"blocks": {
			"languageVersion": 0,
			"blocks": [
				{
					"type": "esp32_loop",
					"id": "DV*7)z}Md%_#S/,x#.mi",
					"x": -210,
					"y": -190,
					"inputs": {
						"LOOP_BODY": {
							"block": {
								"type": "controls_if_else",
								"id": "=bbpYv/MIWr+9-;7:OvG",
								"inputs": {
									"IF1": {
										"block": {
											"type": "side_tof_read",
											"id": "cL)^+ijfz;.*ocdA5l/D",
											"fields": {
												"side_tof_value": "LEFT"
											}
										}
									},
									"DO1": {
										"block": {
											"type": "esp32_led_control",
											"id": "AECg#s!~}alEZVLhkwbv",
											"fields": {
												"esp32_led_control": "RED"
											}
										}
									},
									"ELSE": {
										"block": {
											"type": "esp32_led_control",
											"id": "-pYsxkxq:,+82lvjLZBc",
											"fields": {
												"esp32_led_control": "GREEN"
											}
										}
									}
								}
							}
						}
					}
				}
			]
		}
	}
]

export default obstacleAvoidanceBlocklyCode

/* eslint-disable max-len */
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
						}
					}
				]
			}
		},
		cppCode: "rgbLed.set_led_white();"
	},
	{
		blocklyJson: {
			"blocks": {
				"languageVersion": 0,
				"blocks": [
					{
						"type": "esp32_led_control",
						"id": "P)bh$Rk*Ian[~5p#G}wK",
						"x": -430,
						"y": -110,
						"fields": {
							"esp32_led_control": "WHITE"
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
				]
			}
		},
		cppCode: "rgbLed.set_led_white();\nrgbLed.set_led_green();"
	},
	{
		blocklyJson: {
			"blocks": {
				"languageVersion": 0,
				"blocks": [
					{
						"type": "esp32_led_control",
						"id": "P)bh$Rk*Ian[~5p#G}wK",
						"x": -510,
						"y": -170,
						"fields": {
							"esp32_led_control": "WHITE"
						},
						"next": {
							"block": {
								"type": "esp32_delay",
								"id": "}6uEENZW6:]pL_2s,_D[",
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
	},
	{
		blocklyJson: {
			"blocks": {
				"languageVersion": 0,
				"blocks": [
					{
						"type": "esp32_led_control",
						"id": "P)bh$Rk*Ian[~5p#G}wK",
						"x": -490,
						"y": -110,
						"fields": {
							"esp32_led_control": "WHITE"
						},
						"next": {
							"block": {
								"type": "esp32_delay",
								"id": "}6uEENZW6:]pL_2s,_D[",
								"fields": {
									"esp32_delay": 1000
								},
								"next": {
									"block": {
										"type": "esp32_led_control",
										"id": "Y[;LU:B~*pff}w4]83Ne",
										"fields": {
											"esp32_led_control": "GREEN"
										},
										"next": {
											"block": {
												"type": "esp32_delay",
												"id": "I?cXqAqPTH!VdrXIw[}?",
												"fields": {
													"esp32_delay": 1000
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
		},
		cppCode: "rgbLed.set_led_white();\ndelay(1000);\nrgbLed.set_led_green();\ndelay(1000);"
	},
	{
		blocklyJson: {
			"blocks": {
				"languageVersion": 0,
				"blocks": [
					{
						"type": "esp32_loop",
						"id": "/jbBHT[@AMeOANw;%#U!",
						"x": -510,
						"y": -190,
						"inputs": {
							"LOOP_BODY": {
								"block": {
									"type": "esp32_led_control",
									"id": "P)bh$Rk*Ian[~5p#G}wK",
									"fields": {
										"esp32_led_control": "WHITE"
									},
									"next": {
										"block": {
											"type": "esp32_delay",
											"id": "}6uEENZW6:]pL_2s,_D[",
											"fields": {
												"esp32_delay": 1000
											},
											"next": {
												"block": {
													"type": "esp32_led_control",
													"id": "Y[;LU:B~*pff}w4]83Ne",
													"fields": {
														"esp32_led_control": "GREEN"
													},
													"next": {
														"block": {
															"type": "esp32_delay",
															"id": "I?cXqAqPTH!VdrXIw[}?",
															"fields": {
																"esp32_delay": 1000
															}
														}
													}
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
		},
		cppCode: "while(true) {\n\trgbLed.set_led_white();\n\tdelay(1000);\n\trgbLed.set_led_green();\n\tdelay(1000);\n}"
	},
	{
		blocklyJson: {
			"blocks": {
				"languageVersion": 0,
				"blocks": [
					{
						"type": "esp32_loop",
						"id": "/jbBHT[@AMeOANw;%#U!",
						"x": -510,
						"y": -190,
						"inputs": {
							"LOOP_BODY": {
								"block": {
									"type": "esp32_led_control",
									"id": "P)bh$Rk*Ian[~5p#G}wK",
									"fields": {
										"esp32_led_control": "WHITE"
									},
									"next": {
										"block": {
											"type": "esp32_delay",
											"id": "}6uEENZW6:]pL_2s,_D[",
											"fields": {
												"esp32_delay": 1000
											},
											"next": {
												"block": {
													"type": "esp32_led_control",
													"id": "Y[;LU:B~*pff}w4]83Ne",
													"fields": {
														"esp32_led_control": "GREEN"
													},
													"next": {
														"block": {
															"type": "esp32_delay",
															"id": "I?cXqAqPTH!VdrXIw[}?",
															"fields": {
																"esp32_delay": 1000
															}
														}
													}
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
		},
		cppCode: "while(true) {\n\trgbLed.set_led_white();\n\tdelay(1000);\n\trgbLed.set_led_green();\n\tdelay(1000);\n}"
	},
	{
		blocklyJson: {
			"blocks": {
				"languageVersion": 0,
				"blocks": [
					{
						"type": "button_press_start",
						"id": "^j2/Ka|WegPZ%B2ECV,+",
						"x": -510,
						"y": -170,
						"next": {
							"block": {
								"type": "esp32_loop",
								"id": "g@W=~tzM4T4;N{rSaq%]",
								"inputs": {
									"LOOP_BODY": {
										"block": {
											"type": "esp32_led_control",
											"id": "P)bh$Rk*Ian[~5p#G}wK",
											"fields": {
												"esp32_led_control": "WHITE"
											},
											"next": {
												"block": {
													"type": "esp32_delay",
													"id": "}6uEENZW6:]pL_2s,_D[",
													"fields": {
														"esp32_delay": 1000
													},
													"next": {
														"block": {
															"type": "esp32_led_control",
															"id": "Y[;LU:B~*pff}w4]83Ne",
															"fields": {
																"esp32_led_control": "GREEN"
															},
															"next": {
																"block": {
																	"type": "esp32_delay",
																	"id": "I?cXqAqPTH!VdrXIw[}?",
																	"fields": {
																		"esp32_delay": 1000
																	}
																}
															}
														}
													}
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
		},
		cppCode: "wait_for_button_press();\nwhile(true) {\n\trgbLed.set_led_white();\n\tdelay(1000);\n\trgbLed.set_led_green();\n\tdelay(1000);\n}"
	}
]

export default careerQuestCode

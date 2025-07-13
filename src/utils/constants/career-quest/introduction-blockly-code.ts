"use client"

/* eslint-disable max-len */
import { BlocklyJson } from "@bluedotrobots/common-ts"

const introductionBlocklyCode: BlocklyJson[] = [
	{
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
	{
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
	{
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
	{
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
	{
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
	{
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
	{
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
	{
		"blocks": {
			"languageVersion": 0,
			"blocks": [
				{
					"type": "esp32_loop",
					"id": "-Vk!.3uhZz;^JL3m6jWX",
					"x": -416,
					"y": -241,
					"inputs": {
						"LOOP_BODY": {
							"block": {
								"type": "controls_if_else",
								"id": "]w%8VB?=?X[wF$;K8JNo",
								"inputs": {
									"IF1": {
										"block": {
											"type": "side_tof_read",
											"id": "aAP#53hsDBfvw@C`{h^~",
											"fields": {
												"side_tof_value": "LEFT"
											}
										}
									},
									"DO1": {
										"block": {
											"type": "esp32_led_control",
											"id": "P)bh$Rk*Ian[~5p#G}wK",
											"fields": {
												"esp32_led_control": "RED"
											}
										}
									},
									"ELSE": {
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
					}
				}
			]
		}
	},
	{
		"blocks": {
			"languageVersion": 0,
			"blocks": [
				{
					"type": "esp32_loop",
					"id": "-Vk!.3uhZz;^JL3m6jWX",
					"x": -416,
					"y": -241,
					"inputs": {
						"LOOP_BODY": {
							"block": {
								"type": "controls_if_else",
								"id": "]w%8VB?=?X[wF$;K8JNo",
								"inputs": {
									"IF1": {
										"block": {
											"type": "center_tof_read",
											"id": "lKj={O$6.SoKcu:m](l!"
										}
									},
									"DO1": {
										"block": {
											"type": "esp32_led_control",
											"id": "P)bh$Rk*Ian[~5p#G}wK",
											"fields": {
												"esp32_led_control": "RED"
											}
										}
									},
									"ELSE": {
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
					}
				}
			]
		}
	},
	{
		"blocks": {
			"languageVersion": 0,
			"blocks": [
				{
					"type": "esp32_loop",
					"id": "-Vk!.3uhZz;^JL3m6jWX",
					"x": -416,
					"y": -241,
					"inputs": {
						"LOOP_BODY": {
							"block": {
								"type": "controls_if_else",
								"id": "]w%8VB?=?X[wF$;K8JNo",
								"inputs": {
									"IF1": {
										"block": {
											"type": "side_tof_read",
											"id": "aAP#53hsDBfvw@C`{h^~",
											"fields": {
												"side_tof_value": "RIGHT"
											}
										}
									},
									"DO1": {
										"block": {
											"type": "esp32_led_control",
											"id": "P)bh$Rk*Ian[~5p#G}wK",
											"fields": {
												"esp32_led_control": "RED"
											}
										}
									},
									"ELSE": {
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
					}
				}
			]
		}
	}
]

export default introductionBlocklyCode

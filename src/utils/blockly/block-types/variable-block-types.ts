"use client"

/* eslint-disable @typescript-eslint/naming-convention */

export const VARIABLE_BLOCK_TYPES = {
	VARIABLE_DECLARE: "variable_declare",
	VARIABLE_ASSIGN: "variable_assign",
	VARIABLE_GET: "variable_get"
} as const

export const VARIABLE_FIELD_VALUES = {
	VARIABLE_NAME: "VAR_NAME",
	VARIABLE_VALUE: "VAR_VALUE"
} as const

export type VariableBlockNames = typeof VARIABLE_BLOCK_TYPES[keyof typeof VARIABLE_BLOCK_TYPES]

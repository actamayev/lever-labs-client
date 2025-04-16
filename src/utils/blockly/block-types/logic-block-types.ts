"use client"

/* eslint-disable @typescript-eslint/naming-convention */

export enum VARIABLE_BLOCK_TYPES {
    VARIABLE_DECLARE = "variable_declare",
    VARIABLE_ASSIGN = "variable_assign",
    VARIABLE_GET = "variable_get",
    VARIABLE_DECLARE_INT = "variable_declare_int",
    VARIABLE_DECLARE_BOOL = "variable_declare_bool",
    VARIABLE_GET_INT = "variable_get_int",
    VARIABLE_GET_BOOL = "variable_get_bool"
}

export enum VARIABLE_FIELD_VALUES {
    VARIABLE_NAME = "VAR_NAME",
    VARIABLE_VALUE = "VAR_VALUE"
}

export enum CONDITIONAL_BLOCK_TYPES {
    IF = "controls_if",
    IF_ELSE = "controls_if_else",
    IF_ELSEIF_ELSE = "controls_if_elseif",
    IF_2ELSEIF_ELSE = "controls_if_2elseif"
}

export enum CONDITIONAL_FIELD_VALUES {
    IF_CONDITION = "IF0",
    IF_DO = "DO0",
    IF1_CONDITION = "IF1",
    IF1_DO = "DO1",
    IF2_CONDITION = "IF2",
    IF2_DO = "DO2",
    IF3_CONDITION = "IF3",
    IF3_DO = "DO3",
    ELSE_DO = "ELSE",
    IF_ELSE_BLOCK = "ELSE_BLOCK" // Renamed from IF_ELSE to avoid duplicate
}

export enum MATH_BLOCK_TYPES {
    COMPARE = "logic_compare",
    OPERATION = "logic_operation",
    NEGATE = "logic_negate",
    NUMBER = "math_number",
    ARITHMETIC = "math_arithmetic",
    MATH_SINGLE = "math_single"
}

export enum MATH_FIELD_VALUES {
    COMPARE_A = "COMPARE_A",       // Renamed
    COMPARE_B = "COMPARE_B",       // Renamed
    COMPARE_OP = "COMPARE_OP",     // Renamed
    OPERATION_A = "OPERATION_A",   // Renamed
    OPERATION_B = "OPERATION_B",   // Renamed
    OPERATION_OP = "OPERATION_OP", // Renamed
    NEGATE_BOOL = "BOOL",
    NUMBER_NUM = "NUMBER_NUM",     // Renamed
    ARITHMETIC_A = "ARITHMETIC_A", // Renamed
    ARITHMETIC_B = "ARITHMETIC_B", // Renamed
    ARITHMETIC_OP = "ARITHMETIC_OP", // Renamed
    MATH_SINGLE_NUM = "MATH_SINGLE_NUM", // Renamed
    MATH_SINGLE_OP = "MATH_SINGLE_OP",   // Renamed
    MATH_CONSTRAIN_VALUE = "VALUE",
    MATH_CONSTRAIN_LOW = "LOW",
    MATH_CONSTRAIN_HIGH = "HIGH"
}

export enum LOOP_BLOCK_TYPES {
    WHILE_UNTIL = "controls_whileUntil",
    REPEAT = "controls_repeat_ext",
    ESP32_DELAY = "esp32_delay",
    ESP32_LOOP = "esp32_loop"
}

export enum LOOP_FIELD_VALUES {
    WHILE_MODE = "MODE",
    WHILE_BOOL = "BOOL",
    WHILE_DO = "WHILE_DO",       // Renamed
    REPEAT_TIMES = "TIMES",
    REPEAT_DO = "REPEAT_DO",     // Renamed
    ESP32_DELAY = "delay"
}

// For ease of use, we'll create a namespace object that combines all block types
export type LOGIC_BLOCK_TYPES =
	| VARIABLE_BLOCK_TYPES
	| CONDITIONAL_BLOCK_TYPES
	| MATH_BLOCK_TYPES
	| LOOP_BLOCK_TYPES

export type LOGIC_FIELD_VALUES =
	| VARIABLE_FIELD_VALUES
	| CONDITIONAL_FIELD_VALUES
	| MATH_FIELD_VALUES
	| LOOP_FIELD_VALUES

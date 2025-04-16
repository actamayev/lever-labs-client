"use client"

/**
 * Enum representing operator precedence in code generation.
 * Higher values indicate lower precedence.
 */
export enum Order {
    /** Literals, identifiers, array literals [1, 2, 3] and other atomic expressions */
    ATOMIC = 0,
    /** Member expressions: obj.prop, array[index] */
    MEMBER = 1,
    /** Function calls: func() */
    FUNCTION_CALL = 2,
    /** Increment operator: x++ */
    INCREMENT = 3,
    /** Decrement operator: x-- */
    DECREMENT = 4,
    /** Logical NOT: !x */
    LOGICAL_NOT = 5,
    /** Bitwise NOT: ~x */
    BITWISE_NOT = 6,
    /** Unary plus: +x */
    UNARY_PLUS = 7,
    /** Unary minus: -x */
    UNARY_MINUS = 8,
    /** Multiplication, division, remainder: *, /, % */
    MULTIPLICATION = 9,
    /** Addition, subtraction: +, - */
    ADDITION = 10,
    /** Bitwise shift operators: <<, >> */
    BITWISE_SHIFT = 11,
    /** Relational operators: <, <=, >, >= */
    RELATIONAL = 12,
    /** Equality operators: ==, != */
    EQUALITY = 13,
    /** Bitwise AND: & */
    BITWISE_AND = 14,
    /** Bitwise XOR: ^ */
    BITWISE_XOR = 15,
    /** Bitwise OR: | */
    BITWISE_OR = 16,
    /** Logical AND: && */
    LOGICAL_AND = 17,
    /** Logical OR: || */
    LOGICAL_OR = 18,
    /** Conditional (ternary) operator: ?: */
    CONDITIONAL = 19,
    /** Assignment operators: =, +=, -=, *=, /=, %=, <<=, >>= ... */
    ASSIGNMENT = 20,
    /** Comma operator: , */
    COMMA = 21,
    /** Parenthesized expressions: (...) */
    NONE = 99
}

"use client"

export const Order = {
	ATOMIC: 0,            // 0 "" ...
	MEMBER: 1,           // . []
	FUNCTION_CALL: 2,    // ()
	INCREMENT: 3,        // ++
	DECREMENT: 4,        // --
	LOGICAL_NOT: 5,      // !
	BITWISE_NOT: 6,      // ~
	UNARY_PLUS: 7,       // +
	UNARY_MINUS: 8,      // -
	MULTIPLICATION: 9,   // * / %
	ADDITION: 10,        // + -
	BITWISE_SHIFT: 11,   // << >>
	RELATIONAL: 12,      // < <= > >=
	EQUALITY: 13,        // == !=
	BITWISE_AND: 14,     // &
	BITWISE_XOR: 15,     // ^
	BITWISE_OR: 16,      // |
	LOGICAL_AND: 17,     // &&
	LOGICAL_OR: 18,      // ||
	CONDITIONAL: 19,     // ?:
	ASSIGNMENT: 20,      // = += -= *= /= %= <<= >>= ...
	COMMA: 21,           // ,
	NONE: 99            // (...)
} as const

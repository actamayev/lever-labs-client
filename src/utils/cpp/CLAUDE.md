# C++ Generator

## Purpose
C++ code generation from Blockly visual blocks.

## Files
| File | Purpose |
|------|---------|
| `cpp-generator.ts` | Main C++ code generator class |

## CppGenerator Class
Converts Blockly workspace to C++ code:
- `ensureInitialized()` - Async initialization of Blockly generator
- `valueToCode()` - Generate code for value blocks
- `statementToCode()` - Generate code for statement blocks
- `blockToCode()` - Generate code for any block
- `generateCode()` - Generate complete C++ program from workspace JSON

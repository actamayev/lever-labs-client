# Sandbox Utils

## Purpose
Utilities for Blockly sandbox project management and code execution.

## Files
| File | Purpose |
|------|---------|
| `create-sandbox-project.ts` | Create new sandbox project |
| `date-formatting.ts` | Format dates for display |
| `delete-sandbox-project.ts` | Delete a sandbox project |
| `edit-sandbox-project.ts` | Save project changes |
| `edit-sandbox-project-name.ts` | Rename a project |
| `edit-sandbox-project-notes.ts` | Update project notes |
| `remove-sandbox-project-share.ts` | Remove project sharing |
| `retrieve-all-sandbox-projects.ts` | Fetch all user projects |
| `retrieve-single-sandbox-project.ts` | Fetch single project |
| `search-by-username.ts` | Search projects by username |
| `search-helpers.ts` | Search utility functions |
| `send-cpp-to-pip.ts` | Send compiled code to pip (USB or WiFi) |
| `share-sandbox-project.ts` | Share project with others |
| `star-sandbox-project.ts` | Star/favorite a project |
| `stop-currently-running-code.ts` | Stop code execution on pip |

## Key Function: `sendCppToPip`
Handles code upload to pip device:
- Supports USB (serial) and WiFi connections
- Validates connection state
- Shows appropriate error toasts
- Fires confetti on success

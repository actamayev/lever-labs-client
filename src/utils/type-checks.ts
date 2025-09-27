"use client"

import { ErrorResponse, ErrorResponses, MessageResponse,
	NonSuccessResponse, ValidationErrorResponse } from "@lever-labs/common-ts/types/api"
import { allPages } from "./constants/page-constants"

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isErrorResponse(data: any): data is ErrorResponse {
	return data && typeof data.error === "string"
}

export function isValidationErrorResponse(data: any): data is ValidationErrorResponse {
	return data && typeof data.validationError === "string"
}

export function isMessageResponse(data: any): data is MessageResponse {
	return data && typeof data.message === "string"
}

export function isNonSuccessResponse(data: any): data is NonSuccessResponse {
	return isErrorResponse(data) || isValidationErrorResponse(data) || isMessageResponse(data)
}

export function isErrorResponses(data: any): data is ErrorResponses {
	return isErrorResponse(data) || isValidationErrorResponse(data)
}

export function isValidRoute(route: string): route is PageNames {
	// First check if it's a direct match in allPages
	if (allPages.includes(route as any)) return true

	// Then check if it's a sandbox project route
	if (route.startsWith("/sandbox/")) {
	// Validate that what comes after '/sandbox/' matches a ProjectUUID pattern
	// This regex matches the UUID format: 8-4-4-4-12 hexadecimal characters
		const uuidPattern = /^\/sandbox\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
		return uuidPattern.test(route)
	}
	if (route.startsWith("/class-manager/")) {
		const classCodePattern = /^\/class-manager\/[a-zA-Z0-9]{5}$/i
		return classCodePattern.test(route)
	}
	if (route.startsWith("/whiteboard/")) {
		const classCodePattern = /^\/whiteboard\/[a-zA-Z0-9]{5}$/i
		return classCodePattern.test(route)
	}
	if (route.startsWith("/scoreboard/")) {
		// Check for /scoreboard/classCode/scoreboardId pattern
		const scoreboardPattern = /^\/scoreboard\/[a-zA-Z0-9]{5}\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
		return scoreboardPattern.test(route)
	}

	return false
}

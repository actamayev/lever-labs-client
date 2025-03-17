"use client"

import { allPages } from "./constants"

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

export function isValidSiteTheme(value: any): value is SiteThemes {
	return ["light", "dark"].includes(value)
}

export function isValidSidebarState(value: any): value is SidebarStates {
	return ["expanded", "collapsed"].includes(value)
}

export function isValidRoute(route: string): route is PageNames {
	return allPages.includes(route as PageNames)
}

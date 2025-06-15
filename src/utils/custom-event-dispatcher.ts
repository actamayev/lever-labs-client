"use client"

import { SavedWiFiNetwork } from "@bluedotrobots/common-ts"

interface MessageSentData {
	content: string
	timestamp: Date
	isBinary?: boolean
}

interface DeviceDetectedMessage {
	isKnownRobot: boolean
}

// Define all possible custom events and their payload types
export type CustomEventMap = {
	"connected": undefined
	"disconnected": undefined
	"rawMessage": string
	"messageSent": MessageSentData
	"error": string
	"deviceDetected": DeviceDetectedMessage
	"deviceRemoved": undefined
	"savedNetworksReceived": SavedWiFiNetwork[]
}

// Event names derived from the keys
export type CustomEventNames = keyof CustomEventMap

// Type-safe utility function for creating custom events
export function createCustomEvent<T extends CustomEventNames>(
	eventName: T,
	detail?: CustomEventMap[T]
): CustomEvent {
	return new CustomEvent(eventName, detail !== undefined ? { detail } : undefined)
}

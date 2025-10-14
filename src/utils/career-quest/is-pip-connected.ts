"use client"

import pipClass from "../../classes/pip-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

/**
 * Checks if a pip is currently connected via USB serial or WiFi
 * @returns true if pip is connected via either method, false otherwise
 */
export default function isPipConnected(): boolean {
	// Check USB serial connection
	if (serialConnectionManagerClass.pipTurnedOn) {
		return true
	}

	// Check WiFi connection
	const selectedPip = pipClass.selectedPip
	if (
		selectedPip &&
		(selectedPip.pipConnectionStatus === "connected online to you" ||
		selectedPip.pipConnectionStatus === "connected to serial to you")
	) {
		return true
	}

	return false
}


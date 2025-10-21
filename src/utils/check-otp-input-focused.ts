/**
 * Utility function to check if the OTP input for Pip connection is currently focused
 * This prevents keyboard event conflicts between the WiFi connection section and question components
 */
export default function isOtpInputFocused(): boolean {
	const otpInput = document.querySelector("input[autocomplete='one-time-code']") as HTMLInputElement
	return otpInput === document.activeElement
}

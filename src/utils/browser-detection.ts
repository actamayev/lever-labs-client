/**
 * Browser detection utilities
 */

export type BrowserType =
	| "chrome"
	| "edge"
	| "firefox"
	| "opera"
	| "safari"
	| "brave"
	| "samsung"
	| "vivaldi"
	| "yandex"
	| "uc"
	| "ie"
	| "unknown"

export interface BrowserInfo {
	type: BrowserType
	name: string
	isUsbSerialSupported: boolean
}

/**
 * Detects the current browser and whether it supports USB Serial API
 */
// eslint-disable-next-line max-lines-per-function, complexity
export function detectBrowser(): BrowserInfo {
	if (typeof window === "undefined" || typeof navigator === "undefined") {
		return {
			type: "unknown",
			name: "Unknown",
			isUsbSerialSupported: false
		}
	}

	const userAgent = navigator.userAgent.toLowerCase()

	// Check for Chrome (but not Edge, which also contains "chrome")
	if (userAgent.includes("chrome") && !userAgent.includes("edg")) {
		return {
			type: "chrome",
			name: "Google Chrome",
			isUsbSerialSupported: true
		}
	}

	// Check for Edge
	if (userAgent.includes("edg")) {
		return {
			type: "edge",
			name: "Microsoft Edge",
			isUsbSerialSupported: true
		}
	}

	// Check for Brave (must be before Chrome check)
	if (userAgent.includes("brave")) {
		return {
			type: "brave",
			name: "Brave",
			isUsbSerialSupported: true
		}
	}

	// Check for Samsung Internet
	if (userAgent.includes("samsungbrowser")) {
		return {
			type: "samsung",
			name: "Samsung Internet",
			isUsbSerialSupported: true
		}
	}

	// Check for Vivaldi
	if (userAgent.includes("vivaldi")) {
		return {
			type: "vivaldi",
			name: "Vivaldi",
			isUsbSerialSupported: true
		}
	}

	// Check for Yandex Browser
	if (userAgent.includes("yabrowser")) {
		return {
			type: "yandex",
			name: "Yandex Browser",
			isUsbSerialSupported: true
		}
	}

	// Check for Opera
	if (userAgent.includes("opera") || userAgent.includes("opr")) {
		return {
			type: "opera",
			name: "Opera",
			isUsbSerialSupported: true
		}
	}

	// Check for UC Browser
	if (userAgent.includes("ucbrowser") || userAgent.includes("uc browser")) {
		return {
			type: "uc",
			name: "UC Browser",
			isUsbSerialSupported: false
		}
	}

	// Check for Internet Explorer
	if (userAgent.includes("msie") || userAgent.includes("trident")) {
		return {
			type: "ie",
			name: "Internet Explorer",
			isUsbSerialSupported: false
		}
	}

	// Check for Firefox
	if (userAgent.includes("firefox")) {
		return {
			type: "firefox",
			name: "Mozilla Firefox",
			isUsbSerialSupported: false
		}
	}

	// Check for Safari (but not Chrome, which also contains "safari")
	if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
		return {
			type: "safari",
			name: "Safari",
			isUsbSerialSupported: false
		}
	}

	// Default to unknown
	return {
		type: "unknown",
		name: "Unknown Browser",
		isUsbSerialSupported: false
	}
}

/**
 * Checks if the current browser supports USB Serial API
 */
export function isUsbSerialSupported(): boolean {
	return detectBrowser().isUsbSerialSupported
}

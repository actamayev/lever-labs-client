"use client"

export default async function checkInternetConnectivity(): Promise<boolean> {
	try {
		const controller = new AbortController()
		const timeoutId = setTimeout(() => controller.abort(), 300)

		try {
			// With no-cors, we only care if the fetch succeeds or fails
			// Success = we have internet = not on ESP AP
			// Failure = no internet = likely on ESP AP
			await fetch("https://www.google.com/generate_204", {
				method: "GET",
				cache: "no-store",
				mode: "no-cors",
				signal: controller.signal
			})

			clearTimeout(timeoutId)
			return true // If we get here, we have internet
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			clearTimeout(timeoutId)
			return false // If fetch fails, we likely don't have internet
		}
	} catch (error) {
		console.error("Error checking internet connectivity:", error)
		return false
	}
}

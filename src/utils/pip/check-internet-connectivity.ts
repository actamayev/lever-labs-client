export default async function checkInternetConnectivity(): Promise<boolean> {
	try {
		const controller = new AbortController()
		const timeoutId = setTimeout(() => controller.abort(), 300) // 300ms timeout

		try {
			const response = await fetch("https://cloudflare.com/cdn-cgi/trace", {
				method: "GET",
				cache: "no-cache",
				signal: controller.signal
			})

			clearTimeout(timeoutId)
			return response.ok
		} catch (error) {
			// Handle both timeout and network errors
			console.error(error)
			return false
		}
	} catch (error) {
		// Handle any other unexpected errors
		console.error("Error checking internet connectivity:", error)
		return false
	}
}

export default async function checkEspConnectivity(): Promise<boolean> {
	try {
		const controller = new AbortController()
		const timeoutId = setTimeout(() => controller.abort(), 500) // Keep timeout short since ESP should respond quickly

		try {
			const response = await fetch("http://192.168.4.1/ping", {
				method: "GET",
				cache: "no-store",
				signal: controller.signal,
			})
			console.log(response)

			clearTimeout(timeoutId)
			return response.ok && response.status === 200
		} catch (error) {
			console.log(error)
			clearTimeout(timeoutId)
			console.debug("Not connected to ESP AP:", error)
			return false
		}
	} catch (error) {
		console.error("Error checking ESP connectivity:", error)
		return false
	}
}

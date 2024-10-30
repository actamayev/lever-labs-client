import { createContext, useContext, useMemo } from "react"
import AuthDataService from "../services/auth-data-service"
import FortunaHttpClient from "../classes/blue-dot-http-client"

class BlueDotApiClient {
	public httpClient: FortunaHttpClient = new FortunaHttpClient()
	public authDataService: AuthDataService = new AuthDataService(this.httpClient)

	constructor() {
	}

	private initializeServices() {
		this.httpClient = new FortunaHttpClient()
		this.authDataService = new AuthDataService(this.httpClient)
	}

	public logout() {
		this.httpClient.accessToken = null
		this.initializeServices()
	}
}

const BlueDotApiClientContext = createContext(new BlueDotApiClient())

export default function BlueDotApiClientProvider ({ children }: { children: React.ReactNode }) {
	const apiClientClass = useMemo(() => new BlueDotApiClient(), [])

	return (
		<BlueDotApiClientContext.Provider value={apiClientClass}>
			{children}
		</BlueDotApiClientContext.Provider>
	)
}

export const useApiClientContext = () => useContext(BlueDotApiClientContext)

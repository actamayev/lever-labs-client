import { createContext, useContext, useMemo } from "react"
import PipDataService from "../services/pip-data-service"
import AuthDataService from "../services/auth-data-service"
import BlueDotHttpClient from "../classes/blue-dot-http-client"
import PersonalInfoDataService from "../services/personal-info-data-service"

class BlueDotApiClient {
	public httpClient: BlueDotHttpClient = new BlueDotHttpClient()
	public authDataService: AuthDataService = new AuthDataService(this.httpClient)
	public personalInfoDataService: PersonalInfoDataService = new PersonalInfoDataService(this.httpClient)
	public pipDataService: PipDataService = new PipDataService(this.httpClient)

	constructor() {
	}

	private initializeServices() {
		this.httpClient = new BlueDotHttpClient()
		this.authDataService = new AuthDataService(this.httpClient)
		this.personalInfoDataService = new PersonalInfoDataService(this.httpClient)
		this.pipDataService = new PipDataService(this.httpClient)
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

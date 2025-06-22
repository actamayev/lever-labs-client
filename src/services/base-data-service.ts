import BlueDotHttpClient from "../classes/blue-dot-http-client"

export abstract class BaseDataService {
	protected readonly httpClient: BlueDotHttpClient
	protected readonly pathHeader: EndpointHeaders

	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		this.httpClient = httpClient
		this.pathHeader = pathHeader
	}

	// You can add common methods here that all services might need
	protected buildUrl(endpoint: string): string {
		return `${this.pathHeader}${endpoint}`
	}
}

import LeverLabsHttpClient from "../classes/lever-labs-http-client"

export abstract class BaseDataService {
	protected readonly httpClient: LeverLabsHttpClient
	protected readonly pathHeader: EndpointHeaders

	constructor(httpClient: LeverLabsHttpClient, pathHeader: EndpointHeaders) {
		this.httpClient = httpClient
		this.pathHeader = pathHeader
	}

	// You can add common methods here that all services might need
	protected buildUrl(endpoint: string): string {
		return `${this.pathHeader}${endpoint}`
	}
}

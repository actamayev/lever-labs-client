import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class MiscDataService {
	private readonly pathHeader: EndpointHeaders = "/misc"

	constructor(private readonly httpClient: BlueDotHttpClient) {
	}

	async subscribeForUpdates(email: string): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			`${this.pathHeader}/subscribe-for-email-updates`, { email }, { headers: { "No-Auth-Required": "true" }}
		)
	}
}

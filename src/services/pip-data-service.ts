import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class PipDataService {
	private readonly pathHeader: EndpointHeaders = "/pip"

	constructor(private readonly httpClient: BlueDotHttpClient) {
	}

	async addPip(addPipToAccountData: IncompletePipData): Promise<AxiosResponse<AddNewPipResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<AddNewPipResponse | NonSuccessResponse>(
			`${this.pathHeader}/add-pip-to-account`, { addPipToAccountData }
		)
	}

	async requestToConnectToPip(pipUUID: PipUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			`${this.pathHeader}/client-connect-to-pip-request`, { pipUUID }
		)
	}

	async retrievePreviouslyAddedPips(): Promise<AxiosResponse<PreviouslyAddedPipsResponse | ErrorResponse>> {
		return await this.httpClient.http.get<PreviouslyAddedPipsResponse | ErrorResponse>(
			`${this.pathHeader}/retrieve-previously-added-pips`
		)
	}

	async checkIfPipUUIDIsValid(pipUUID: PipUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.get<AllCommonResponses>(
			`${this.pathHeader}/check-if-pip-uuid-is-valid/${pipUUID}`
		)
	}
}

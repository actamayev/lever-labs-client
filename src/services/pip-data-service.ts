import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class PipDataService {
	private readonly pathHeader: PathHeaders = "/pip"

	constructor(private readonly httpClient: BlueDotHttpClient) {
	}

	async addPip(addPipToAccountData: IncompletePipData): Promise<AxiosResponse<AddNewPipResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<AddNewPipResponse | NonSuccessResponse>(
			`${this.pathHeader}/add-pip-to-account`, { addPipToAccountData }
		)
	}

	async retrievePreviouslyAddedPips(): Promise<AxiosResponse<PreviouslyAddedPipsResponse | ErrorResponse>> {
		return await this.httpClient.http.get<PreviouslyAddedPipsResponse | ErrorResponse>(
			`${this.pathHeader}/retrieve-previously-added-pips`
		)
	}
}

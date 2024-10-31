import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class PipDataService {
	private readonly pathHeader: PathHeaders = "/pip"

	constructor(private readonly httpClient: BlueDotHttpClient) {
	}

	async addPip(addPipToAccountData: PipData): Promise<AxiosResponse<AddNewPipResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<AddNewPipResponse | NonSuccessResponse>(
			`${this.pathHeader}/add-pip-to-account`, { addPipToAccountData }
		)
	}
}

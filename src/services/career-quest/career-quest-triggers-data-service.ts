import { AxiosResponse } from "axios"
import { ErrorResponses, PipUUID, SuccessResponse } from "@bluedotrobots/common-ts"
import { BaseDataService } from "../base-data-service"
import BlueDotHttpClient from "../../classes/blue-dot-http-client"

export default class CareerQuestTriggersDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async introS1P7(pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/intro-s1-p7/${pipUUID}`)
		)
	}
}

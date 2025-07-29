import { AxiosResponse } from "axios"
import { BlocklyJson, CareerQuestChallengeData, ChallengeUUID, ErrorResponses, SuccessResponse } from "@bluedotrobots/common-ts"
import { BaseDataService } from "./base-data-service"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class CareerQuestDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async editCareerQuestSandboxProject(
		challengeUUID: ChallengeUUID,
		newBlocklyJson: BlocklyJson
	): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/edit-career-quest-sandbox-project/${challengeUUID}`),
			{ newBlocklyJson }
		)
	}

	async retrieveCareerQuestChallengeData(
		challengeUUID: ChallengeUUID
	): Promise<AxiosResponse<CareerQuestChallengeData | ErrorResponses>> {
		return await this.httpClient.http.get<CareerQuestChallengeData | ErrorResponses>(
			this.buildUrl(`/get-career-quest-challenge-data/${challengeUUID}`)
		)
	}
}

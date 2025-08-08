import { AxiosResponse } from "axios"
import { BlocklyJson, CareerProgressData, CareerUUID, ChallengeUUID, ErrorResponses, SuccessResponse } from "@bluedotrobots/common-ts"
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
			this.buildUrl(`/edit-challenge-sandbox-project/${challengeUUID}`),
			{ newBlocklyJson }
		)
	}

	async retrieveCareerChallengeData(careerUUID: CareerUUID): Promise<AxiosResponse<CareerProgressData | ErrorResponses>> {
		return await this.httpClient.http.get<CareerProgressData | ErrorResponses>(
			this.buildUrl(`/get-career-challenge-data/${careerUUID}`)
		)
	}

	async updateCareerQuestUserProgress(
		currentId: string,
		careerUUID: CareerUUID
	): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl("/update-career-quest-user-progress"),
			{ currentId, careerUUID }
		)
	}

	async markChallengeAsSeen(challengeUUID: ChallengeUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl(`/mark-challenge-as-seen/${challengeUUID}`)
		)
	}
}

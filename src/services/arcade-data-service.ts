import { AxiosResponse } from "axios"
import { ArcadeScoreRequest, ErrorResponse, SuccessResponse, ErrorResponses } from "@actamayev/lever-labs-common-ts/types/api"
import { BaseDataService } from "./base-data-service"
import LeverLabsHttpClient from "../classes/lever-labs-http-client"
import { ArcadeGameType } from "@actamayev/lever-labs-common-ts/types/arcade"

export default class ArcadeDataService extends BaseDataService {
	constructor(httpClient: LeverLabsHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async retrieveAllArcadeScores(): Promise<AxiosResponse<ArcadeScoreRequest | ErrorResponse>> {
		return await this.httpClient.http.get<ArcadeScoreRequest | ErrorResponse>(
			this.buildUrl("/retrieve-all-arcade-scores")
		)
	}

	async addArcadeScore(arcadeGameName: ArcadeGameType, score: number): Promise<AxiosResponse<SuccessResponse | ErrorResponses	>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl("/add-arcade-score"),
			{ arcadeGameName, score }
		)
	}
}

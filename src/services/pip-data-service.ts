"use client"

import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"
import { AddNewPipResponse, AddPipData, AllCommonResponses, ErrorResponse,
	NonSuccessResponse, PipUUID, PreviouslyAddedPipsResponse, RetrieveIsPipUUIDValidResponse } from "@bluedotrobots/common-ts"

export default class PipDataService {
	private readonly pathHeader: EndpointHeaders = "/pip"

	constructor(private readonly httpClient: BlueDotHttpClient) {
	}

	async addPip(addPipToAccountData: AddPipData): Promise<AxiosResponse<AddNewPipResponse | NonSuccessResponse>> {
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

	async retrievePipUUIDStatus(pipUUID: PipUUID): Promise<AxiosResponse<RetrieveIsPipUUIDValidResponse | NonSuccessResponse>> {
		return await this.httpClient.http.get<RetrieveIsPipUUIDValidResponse | NonSuccessResponse>(
			`${this.pathHeader}/retrieve-pip-uuid-status/${pipUUID}`
		)
	}

	async disconnectFromPip(pipUUID: PipUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			`${this.pathHeader}/disconnect-from-pip`, { pipUUID }
		)
	}
}

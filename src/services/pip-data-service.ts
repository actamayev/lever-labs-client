import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"
import { AddNewPipResponse, AddPipData, AllCommonResponses, ErrorResponse,
	NonSuccessResponse, PipUUID, PreviouslyAddedPipsResponse, RetrieveIsPipUUIDValidResponse } from "@bluedotrobots/common-ts"
import { BaseDataService } from "./base-data-service"

export default class PipDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async addPip(addPipToAccountData: AddPipData): Promise<AxiosResponse<AddNewPipResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<AddNewPipResponse | NonSuccessResponse>(
			this.buildUrl("/add-pip-to-account"), { addPipToAccountData }
		)
	}

	async requestToConnectToPip(pipUUID: PipUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/client-connect-to-pip-request"), { pipUUID }
		)
	}

	async retrievePreviouslyAddedPips(): Promise<AxiosResponse<PreviouslyAddedPipsResponse | ErrorResponse>> {
		return await this.httpClient.http.get<PreviouslyAddedPipsResponse | ErrorResponse>(
			this.buildUrl("/retrieve-previously-added-pips")
		)
	}

	async retrievePipUUIDStatus(pipUUID: PipUUID): Promise<AxiosResponse<RetrieveIsPipUUIDValidResponse | NonSuccessResponse>> {
		return await this.httpClient.http.get<RetrieveIsPipUUIDValidResponse | NonSuccessResponse>(
			this.buildUrl(`/retrieve-pip-uuid-status/${pipUUID}`)
		)
	}

	async disconnectFromPip(pipUUID: PipUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/disconnect-from-pip"), { pipUUID }
		)
	}

	async stopSensorPolling(pipUUID: PipUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/stop-sensor-polling"), { pipUUID }
		)
	}
}

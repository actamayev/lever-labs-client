import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"
import { AllCommonResponses, NonSuccessResponse, RetrieveIsPipUUIDValidResponse } from "@bluedotrobots/common-ts/types/api"
import { PipUUID } from "@bluedotrobots/common-ts/types/utils"
import { BaseDataService } from "./base-data-service"

export default class PipDataService extends BaseDataService {
	constructor(httpClient: BlueDotHttpClient, pathHeader: EndpointHeaders) {
		super(httpClient, pathHeader)
	}

	async requestToConnectToPip(pipUUID: PipUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/client-connect-to-pip-request"), { pipUUID }
		)
	}

	async retrievePipUUIDStatus(pipUUID: PipUUID): Promise<AxiosResponse<RetrieveIsPipUUIDValidResponse | NonSuccessResponse>> {
		return await this.httpClient.http.post<RetrieveIsPipUUIDValidResponse | NonSuccessResponse>(
			this.buildUrl("/retrieve-pip-uuid-status"), { pipUUID }
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

	async setSerialConnectionStatus(pipUUID: PipUUID, connected: boolean): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			this.buildUrl("/set-serial-connection"), { pipUUID, connected }
		)
	}
}

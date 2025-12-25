import { AxiosResponse } from "axios"
import { AllCommonResponses, NonSuccessResponse,
	RetrieveIsPipUUIDValidResponse, SuccessResponse, ErrorResponses } from "@actamayev/lever-labs-common-ts/types/api"
import { PipUUID } from "@actamayev/lever-labs-common-ts/types/utils"
import { BaseDataService } from "./base-data-service"
import LeverLabsHttpClient from "../classes/lever-labs-http-client"

export default class PipDataService extends BaseDataService {
	constructor(httpClient: LeverLabsHttpClient, pathHeader: EndpointHeaders) {
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

	async pipTurningOff(pipUUID: PipUUID): Promise<AxiosResponse<SuccessResponse | ErrorResponses>> {
		return await this.httpClient.http.post<SuccessResponse | ErrorResponses>(
			this.buildUrl("/pip-turning-off-serial-connection"), { pipUUID }
		)
	}
}

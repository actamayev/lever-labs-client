import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class LabDemoDataService {
	private readonly pathHeader: EndpointHeaders = "/lab-demo"

	constructor(private readonly httpClient: BlueDotHttpClient) {
	}

	// TODO: Remove this endpoint since we're over WS now
	async motorControl(motorControlData: MotorControlDataToSend): Promise<AxiosResponse<ErrorResponses | SuccessResponse>> {
		return await this.httpClient.http.post<ErrorResponses | SuccessResponse>(
			`${this.pathHeader}/motor-control`, { motorControlData }
		)
	}
}

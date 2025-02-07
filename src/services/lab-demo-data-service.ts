import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class LabDemoDataService {
	private readonly pathHeader: EndpointHeaders = "/lab-demo"

	constructor(private readonly httpClient: BlueDotHttpClient) {
	}

	async motorControl(motorControlData: MotorControl): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			`${this.pathHeader}/motor-control`, { motorControlData }
		)
	}
}

"use client"

import { AxiosResponse } from "axios"
import BlueDotHttpClient from "../classes/blue-dot-http-client"

export default class GarageDataService {
	private readonly pathHeader: EndpointHeaders = "/garage"

	constructor(private readonly httpClient: BlueDotHttpClient) {
	}

	async lightsAnimation(lightAnimation: LightAnimation, pipUUID: PipUUID): Promise<AxiosResponse<AllCommonResponses>> {
		return await this.httpClient.http.post<AllCommonResponses>(
			`${this.pathHeader}/lights-animation`, { lightAnimation, pipUUID }
		)
	}
}

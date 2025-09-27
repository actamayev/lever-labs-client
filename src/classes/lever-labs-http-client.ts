"use client"

import axios, { AxiosInstance } from "axios"

export default class LeverLabsHttpClient {
	public readonly http: AxiosInstance

	constructor() {
		this.http = axios.create({
			baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
			withCredentials: true,
			headers: {
				"Content-Type": "application/json"
			}
		})
	}

	// No logout method needed: cookies are cleared by server endpoint
}

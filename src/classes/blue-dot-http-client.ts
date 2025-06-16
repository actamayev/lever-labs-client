"use client"

import axios, { AxiosInstance } from "axios"

export default class BlueDotHttpClient {
	public readonly http: AxiosInstance

	constructor() {
		this.http = axios.create({
			baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,
			withCredentials: true,
			headers: {
				"Content-Type": "application/json"
			}
		})

		this.http.interceptors.request.use((config) => {
			if (config.headers["No-Auth-Required"]) {
				delete config.headers["No-Auth-Required"]
				delete config.headers["Authorization"]
			}
			return config
		}, (error) => {
			return Promise.reject(error)
		})
	}

	get accessToken(): string | null {
		return this.http.defaults.headers["Authorization"] as string || null
	}

	// Simplified setter - just sets/deletes the header
	public setAuthHeader(accessToken: string): void {
		this.http.defaults.headers["Authorization"] = accessToken
	}

	public logout(): void {
		delete this.http.defaults.headers["Authorization"]
	}
}

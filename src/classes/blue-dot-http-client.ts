"use client"

import axios, { AxiosInstance } from "axios"
import isNull from "lodash-es/isNull"

export default class BlueDotHttpClient {
	public readonly http: AxiosInstance
	private _accessToken: string | null = null

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
				return config
			}

			if (!isNull(this.accessToken)) {
				config.headers["Authorization"] = this.accessToken
			} else {
				throw new Error("Access token is not set.")
			}
			return config
		}, (error) => {
			return Promise.reject(error)
		})
	}

	get accessToken(): string | null {
		return this._accessToken
	}

	set accessToken(accessToken: string | null) {
		this._accessToken = accessToken
		if (!isNull(accessToken)) {
			this.http.defaults.headers["authorization"] = accessToken
		} else {
			delete this.http.defaults.headers["authorization"]
		}
	}
}

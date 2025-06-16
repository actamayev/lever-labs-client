"use client"

import isNull from "lodash-es/isNull"
import { action, makeAutoObservable } from "mobx"
import socketClass from "./socket-class"
import blueDotApiClientClass from "./blue-dot-api-client-class"

class AuthClass {
	private _accessToken: string | null = null
	public showLoginOrRegister: LoginOrRegister = "Register"
	public isAuthenticating = false

	constructor() {
		makeAutoObservable(this)
		this.getAuthDataFromStorage()
	}

	get isLoggedIn(): boolean {
		return !isNull(this._accessToken)
	}

	get accessToken(): string | null {
		return this._accessToken
	}

	public getAuthDataFromStorage(): string | null {
		if (typeof window === "undefined") return null
		const storedAccessToken = localStorage.getItem("Access Token")
		if (!isNull(storedAccessToken)) this.setAccessToken(storedAccessToken)
		return this._accessToken
	}

	public setAccessToken = action((accessToken: string | null): void => {
		this._accessToken = accessToken
		if (isNull(accessToken)) {
			if (typeof window === "undefined") return
			localStorage.removeItem("Access Token")
			return
		}
		blueDotApiClientClass.httpClient.setAuthHeader(accessToken)
		socketClass.connect(accessToken)
		if (typeof window === "undefined") return
		localStorage.setItem("Access Token", accessToken as string)
	})

	public setAuthenticating = action((authenticating: boolean): void => {
		this.isAuthenticating = authenticating
	})

	public setShowLoginOrRegister = action((loginOrRegister: LoginOrRegister): void => {
		this.showLoginOrRegister = loginOrRegister
	})

	public logout() {
		this.setAccessToken(null)
		this.setShowLoginOrRegister("Register")
		this.setAuthenticating(false)
	}
}

const authClass = new AuthClass()

export default authClass

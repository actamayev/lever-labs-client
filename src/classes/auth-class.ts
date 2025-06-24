"use client"

import isNull from "lodash-es/isNull"
import { action, makeAutoObservable } from "mobx"
import socketClass from "./socket-class"
import personalInfoClass from "./personal-info-class"
import blueDotApiClientClass from "./blue-dot-api-client-class"

class AuthClass {
	private _accessToken: string | null = null
	public showLoginOrRegister: LoginOrRegister = "Register"
	public isAuthenticating = false

	constructor() {
		makeAutoObservable(this)
		this.getAuthDataFromStorage()
	}

	get accessToken(): string | null {
		return this._accessToken
	}

	get isLoggedIn(): boolean {
		return !isNull(this._accessToken)
	}

	get isFinishedWithSignup(): boolean {
		// This is to make sure that users are both logged in, and they've set a username
		// (Google users can be logged in, but haven't set a username yet)
		return (this.isLoggedIn && !isNull(personalInfoClass.username))
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
			return localStorage.removeItem("Access Token")
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

	public logout(): void {
		this.setAccessToken(null)
		this.setShowLoginOrRegister("Register")
		this.setAuthenticating(false)
	}
}

const authClass = new AuthClass()

export default authClass

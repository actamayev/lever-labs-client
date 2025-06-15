"use client"

import isNull from "lodash-es/isNull"
import { action, makeAutoObservable } from "mobx"

class AuthClass {
	private _accessToken: string | null = null
	public showLoginOrRegister: LoginOrRegister = "Register"
	public isAuthenticating = false

	constructor() {
		makeAutoObservable(this)
	}

	get isLoggedIn(): boolean {
		return !isNull(this._accessToken)
	}

	public getAuthDataFromStorage(): string | null {
		if (typeof window === "undefined") return null
		const storedAccessToken = localStorage.getItem("Access Token")
		if (!isNull(storedAccessToken)) this.setAccessToken(storedAccessToken)
		return this._accessToken
	}

	public setAccessToken = action((accessToken: string | null, saveToStorage = false): void => {
		this._accessToken = accessToken
		if (typeof window === "undefined") return
		if (!isNull(accessToken) && saveToStorage === true) {
			localStorage.setItem("Access Token", accessToken as string)
		} else if (isNull(accessToken) && saveToStorage === true) {
			localStorage.removeItem("Access Token")
		}
	})

	public setAuthenticating = action((authenticating: boolean): void => {
		this.isAuthenticating = authenticating
	})

	public setShowLoginOrRegister = action((loginOrRegister: LoginOrRegister): void => {
		this.showLoginOrRegister = loginOrRegister
	})

	public logout() {
		this.setAccessToken(null, true)
		this.setShowLoginOrRegister("Register")
		this.setAuthenticating(false)
	}
}

const authClass = new AuthClass()

export default authClass

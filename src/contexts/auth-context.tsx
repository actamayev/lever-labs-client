"use client"

import isNull from "lodash-es/isNull"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext } from "react"

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

const authInstance = new AuthClass()

const AuthContext = createContext(authInstance)

export default function AuthProvider ({ children }: { children: React.ReactNode }) {
	return (
		<AuthContext.Provider value={authInstance}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => useContext(AuthContext)

"use client"

import { action, makeAutoObservable } from "mobx"
import getSocketClass from "./socket-class"

class AuthClass {
	public showLoginOrRegister: LoginOrRegister = "Register"
	public isAuthenticating = false

	// Auth state is now managed by server middleware, but we keep these for UI state
	private _isAuthenticated = false
	private _hasCompletedSignup = false
	public isLoggingOut = false  // NEW

	constructor() {
		makeAutoObservable(this)
	}

	// Getters for compatibility with existing code
	get isLoggedIn(): boolean {
		return this._isAuthenticated
	}

	get isFinishedWithSignup(): boolean {
		return this._isAuthenticated && this._hasCompletedSignup
	}


	// Update auth state from server (called by components that receive server auth state)
	public setAuthState = action((authState: {
		isAuthenticated: boolean
		hasCompletedSignup: boolean
	}): void => {
		this._isAuthenticated = authState.isAuthenticated
		this._hasCompletedSignup = authState.hasCompletedSignup

		// Auto-connect socket when authenticated
		if (this._isAuthenticated) {
			getSocketClass().connect()
		}
	})

	public setAuthenticating = action((authenticating: boolean): void => {
		this.isAuthenticating = authenticating
	})

	public setShowLoginOrRegister = action((loginOrRegister: LoginOrRegister): void => {
		this.showLoginOrRegister = loginOrRegister
	})

	public setLoggingOut = action((state: boolean): void => {
		this.isLoggingOut = state
	})

	public logout = action((): void => {
		// Just reset local auth state - your logout util handles the rest
		this._isAuthenticated = false
		this._hasCompletedSignup = false
		this.setShowLoginOrRegister("Register")
		this.setAuthenticating(false)
	})
}

let authClassInstance: AuthClass | null = null

export const getAuthClass = (): AuthClass => {
	if (!authClassInstance) {
		authClassInstance = new AuthClass()
	}
	return authClassInstance
}

export default getAuthClass

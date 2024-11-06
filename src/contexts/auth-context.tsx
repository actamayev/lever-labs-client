import _ from "lodash"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"

class AuthClass {
	private _accessToken: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	get isLoggedIn(): boolean {
		return !_.isNull(this._accessToken)
	}

	public getAuthDataFromStorage(): string | null {
		const storedAccessToken = localStorage.getItem("Access Token")
		if (!_.isNull(storedAccessToken)) this.setAccessToken(storedAccessToken)
		return this._accessToken
	}

	public setAccessToken = action((accessToken: string | null, saveToStorage = false): void => {
		this._accessToken = accessToken
		if (!_.isNull(accessToken) && saveToStorage === true) {
			localStorage.setItem("Access Token", accessToken as string)
		} else if (_.isNull(accessToken) && saveToStorage === true) {
			localStorage.removeItem("Access Token")
		}
	})

	public logout() {
		this.setAccessToken(null, true)
	}
}

const AuthContext = createContext(new AuthClass())

export default function AuthProvider ({ children }: { children: React.ReactNode }) {
	const authClass = useMemo(() => new AuthClass(), [])

	return (
		<AuthContext.Provider value={authClass}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = () => useContext(AuthContext)

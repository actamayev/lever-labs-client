"use client"

import { createContext, useContext } from "react"
import { action, makeAutoObservable } from "mobx"
import { isValidSiteTheme } from "../utils/type-checks"

class PersonalInfoClass {
	public username: string | null = null
	public email: string | null = null

	public isRetrievingPersonalInfo = false
	public retrievedPeronsalInfo = false
	public defaultSiteTheme: SiteThemes = "light"
	public profilePictureUrl: string | null = null

	constructor() {
		makeAutoObservable(this)
		this.setDefaultsFromLocalStorage()
	}

	private setDefaultsFromLocalStorage(): void {
		if (typeof window === "undefined") return
		const locallyStoredDefaultSiteTheme = localStorage.getItem("defaultSiteTheme")
		if (!isValidSiteTheme(locallyStoredDefaultSiteTheme)) {
			return this.setDefaultSiteTheme("light")
		}
		this.setDefaultSiteTheme(locallyStoredDefaultSiteTheme)
	}

	public setIsRetrievingPersonalDetails = action((newState: boolean): void => {
		this.isRetrievingPersonalInfo = newState
	})

	public setRetrievedPersonalInfo = action((newState: boolean): void => {
		this.retrievedPeronsalInfo = newState
	})

	public setRetrievedPersonalData = action((retrievedData: PersonalInfoResponse): void => {
		this.username = retrievedData.username
		this.email = retrievedData.email
		this.setProfilePictureUrl(retrievedData.profilePictureUrl)
		this.setDefaultSiteTheme(retrievedData.defaultSiteTheme)
	})

	public setDefaultSiteTheme = action((newSiteTheme: SiteThemes, addToLocalStorage: boolean = true): void => {
		this.defaultSiteTheme = newSiteTheme
		if (typeof window === "undefined") return
		if (addToLocalStorage === true) localStorage.setItem("defaultSiteTheme", newSiteTheme)
		if (newSiteTheme === "dark") document.documentElement.classList.add("dark")
		else document.documentElement.classList.remove("dark")
	})

	public setProfilePictureUrl = action((newProfilePictureUrl: string | null): void => {
		this.profilePictureUrl = newProfilePictureUrl
	})

	public setUsername = action((newUsername: string): void => {
		this.username = newUsername
	})

	public logout() {
		this.username = null
		this.email = null
		this.setIsRetrievingPersonalDetails(false)
		this.setRetrievedPersonalInfo(false)
		this.setProfilePictureUrl(null)
		this.setDefaultSiteTheme("light")
		// this.setDefaultSidebarState("expanded")
	}
}

const personalInfoInstance = new PersonalInfoClass()

const PersonalInfoContext = createContext(personalInfoInstance)

export default function PersonalInfoProvider ({ children }: { children: React.ReactNode }) {
	return (
		<PersonalInfoContext.Provider value={personalInfoInstance}>
			{children}
		</PersonalInfoContext.Provider>
	)
}

export const usePersonalInfoContext = () => useContext(PersonalInfoContext)

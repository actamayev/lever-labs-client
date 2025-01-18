import { action, makeAutoObservable } from "mobx"
import { createContext, useContext, useMemo } from "react"
import { isValidSidebarState, isValidSiteTheme } from "../utils/type-checks"

class PersonalInfoClass {
	public username: string | null = null
	public email: string | null = null

	public isRetrievingPersonalInfo = false
	public defaultSiteTheme: SiteThemes = "light"
	public defaultSidebarState: SidebarStates = "expanded"
	public profilePictureUrl: string | null = null

	constructor() {
		makeAutoObservable(this)
		this.setDefaultsFromLocalStorage()
	}

	private setDefaultsFromLocalStorage(): void {
		const locallyStoredDefaultSiteTheme = localStorage.getItem("defaultSiteTheme")
		if (!isValidSiteTheme(locallyStoredDefaultSiteTheme)) {
			this.setDefaultSiteTheme("light")
			return
		}
		this.setDefaultSiteTheme(locallyStoredDefaultSiteTheme)
		const locallyStoredDefaultSidebarState = localStorage.getItem("defaultSidebarState")
		if (!isValidSidebarState(locallyStoredDefaultSidebarState)) {
			this.setDefaultSidebarState("expanded")
			return
		}
		this.setDefaultSidebarState(locallyStoredDefaultSidebarState)
	}

	public setIsRetrievingPersonalDetails = action((newState: boolean): void => {
		this.isRetrievingPersonalInfo = newState
	})

	public setRetrievedPersonalData = action((retrievedData: PersonalInfoResponse): void => {
		this.username = retrievedData.username
		this.email = retrievedData.email
		this.setProfilePictureUrl(retrievedData.profilePictureUrl)
		this.setDefaultSiteTheme(retrievedData.defaultSiteTheme)
		this.setDefaultSidebarState(retrievedData.defaultSidebarState)
	})

	public setDefaultSiteTheme = action((newSiteTheme: SiteThemes, addToLocalStorage: boolean = true): void => {
		this.defaultSiteTheme = newSiteTheme
		if (addToLocalStorage === true) localStorage.setItem("defaultSiteTheme", newSiteTheme)
		if (newSiteTheme === "dark") document.documentElement.classList.add("dark")
		else document.documentElement.classList.remove("dark")
	})

	public setDefaultSidebarState = action((newSidebarState: SidebarStates): void => {
		this.defaultSidebarState = newSidebarState
		localStorage.setItem("defaultSidebarState", newSidebarState)
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
		this.setProfilePictureUrl(null)
		this.setDefaultSiteTheme("light")
		this.setDefaultSidebarState("expanded")
	}
}

const PersonalInfoContext = createContext(new PersonalInfoClass())

export default function PersonalInfoProvider ({ children }: { children: React.ReactNode }) {
	const value = useMemo(() => new PersonalInfoClass(), [])

	return (
		<PersonalInfoContext.Provider value={value}>
			{children}
		</PersonalInfoContext.Provider>
	)
}

export const usePersonalInfoContext = () => useContext(PersonalInfoContext)

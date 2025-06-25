"use client"

import { action, makeAutoObservable } from "mobx"
import { isValidSiteTheme } from "../utils/type-checks"
import { PersonalInfoResponse, SiteThemes } from "@bluedotrobots/common-ts"

class PersonalInfoClass {
	public username: string | null = null
	public email: string | null = null
	public name: string | null = null

	public isRetrievingPersonalInfo = false
	public retrievedPersonalInfo = false
	public defaultSiteTheme: SiteThemes = "light"
	public sandboxNotesOpen: boolean = false
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

	private setRetrievedPersonalInfo = action((newState: boolean): void => {
		this.retrievedPersonalInfo = newState
	})

	public setRetrievedPersonalData = action((retrievedData: PersonalInfoResponse): void => {
		this.username = retrievedData.username
		this.email = retrievedData.email
		this.setName(retrievedData.name)
		this.setSandboxNotesOpen(retrievedData.sandboxNotesOpen)
		this.setProfilePictureUrl(retrievedData.profilePictureUrl)
		this.setDefaultSiteTheme(retrievedData.defaultSiteTheme)
		this.setRetrievedPersonalInfo(true)
		this.setIsRetrievingPersonalDetails(false)
	})

	public setRegisteredValues = action((username: string, email: string, defaultSiteTheme: SiteThemes): void => {
		this.username = username
		this.email = email
		this.setDefaultSiteTheme(defaultSiteTheme)
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

	public setName = action((newName: string | null): void => {
		this.name = newName
	})

	public setSandboxNotesOpen = action((newSandboxNotesOpen: boolean): void => {
		this.sandboxNotesOpen = newSandboxNotesOpen
	})

	public setUsername = action((newUsername: string): void => {
		this.username = newUsername
	})

	public logout(): void {
		this.username = null
		this.email = null
		this.setIsRetrievingPersonalDetails(false)
		this.setRetrievedPersonalInfo(false)
		this.setProfilePictureUrl(null)
		this.setDefaultSiteTheme("light")
		this.setSandboxNotesOpen(false)
		this.setName(null)
	}
}

const personalInfoClass = new PersonalInfoClass()

export default personalInfoClass

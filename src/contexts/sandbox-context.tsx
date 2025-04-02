"use client"

import { action, makeAutoObservable } from "mobx"
import { createContext, useContext } from "react"

class SandboxClass {
	public isRetrievingAllSandboxProjects = false
	public hasRetrievedAllSandboxProjects = false // Fixed typo here
	public sandboxProjects: Map<ProjectUUID, SandboxProject> = new Map()

	constructor() {
		makeAutoObservable(this)
	}

	public setIsRetrievingAllSandboxProjects = action((newIsRetrievingAllSandboxProjects: boolean): void => {
		this.isRetrievingAllSandboxProjects = newIsRetrievingAllSandboxProjects
	})

	public setHasRetrievedAllSandboxProjects = action((newHasRetrievedAllSandboxProjects: boolean): void => {
		this.hasRetrievedAllSandboxProjects = newHasRetrievedAllSandboxProjects // Fixed typo here
	})

	public setSandboxProjects = action((sandboxProjects: SandboxProject[]): void => {
		sandboxProjects.forEach(sandboxProject => this.addSandboxProject(sandboxProject))
	})

	public addSandboxProject = action((sandboxProject: SandboxProject): void => {
		this.sandboxProjects.set(sandboxProject.projectUUID, sandboxProject)
	})

	public logout() {
		this.setIsRetrievingAllSandboxProjects(false)
		this.setHasRetrievedAllSandboxProjects(false)
		this.sandboxProjects = new Map()
	}
}

const sandboxInstance = new SandboxClass()

const SandboxContext = createContext(sandboxInstance)

export default function SandboxProvider ({ children }: { children: React.ReactNode }) {
	return (
		<SandboxContext.Provider value={sandboxInstance}>
			{children}
		</SandboxContext.Provider>
	)
}

export const useSandboxContext = () => useContext(SandboxContext)

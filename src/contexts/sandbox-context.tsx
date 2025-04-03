"use client"

import isUndefined from "lodash-es/isUndefined"
import { action, makeAutoObservable } from "mobx"
import { createContext, useContext } from "react"

class SandboxClass {
	public isRetrievingAllSandboxProjects = false
	public hasRetrievedAllSandboxProjects = false
	public sandboxProjects: Map<ProjectUUID, SandboxProject> = new Map()
	public retrievingSingleProjects: Map<ProjectUUID, boolean> = new Map()
	public showCode = false

	constructor() {
		makeAutoObservable(this)
	}

	public setIsRetrievingAllSandboxProjects = action((newIsRetrievingAllSandboxProjects: boolean): void => {
		this.isRetrievingAllSandboxProjects = newIsRetrievingAllSandboxProjects
	})

	public setHasRetrievedAllSandboxProjects = action((newHasRetrievedAllSandboxProjects: boolean): void => {
		this.hasRetrievedAllSandboxProjects = newHasRetrievedAllSandboxProjects
	})

	public setSandboxProjects = action((sandboxProjects: SandboxProject[]): void => {
		sandboxProjects.forEach(sandboxProject => this.addSandboxProject(sandboxProject))
	})

	public addSandboxProject = action((sandboxProject: SandboxProject): void => {
		this.sandboxProjects.set(sandboxProject.projectUUID, sandboxProject)
	})

	public setIsRetrievingSingleProject = action((projectUUID: ProjectUUID, isRetrieving: boolean): void => {
		this.retrievingSingleProjects.set(projectUUID, isRetrieving)
	})

	public isRetrievingSingleProject = (projectUUID: ProjectUUID): boolean => {
		return this.retrievingSingleProjects.get(projectUUID) || false
	}

	public setShowCode = action((show: boolean): void => {
		this.showCode = show
	})

	public updateStarStatus = action((projectUUID: ProjectUUID): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return
		project.isStarred = !project.isStarred
	})

	public updateProjectName = action((projectUUID: ProjectUUID, newName: string): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		project.projectName = newName
	})

	public updateProjectNotes = action((projectUUID: ProjectUUID, newNotes: string): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		project.projectNotes = newNotes
	})

	// Method to update project XML in the store
	public updateProjectXml = action((projectUUID: ProjectUUID, newXml: string): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		project.sandboxXml = newXml
	})

	public deleteSandboxProject = action((projectUUID: ProjectUUID): void => {
		this.sandboxProjects.delete(projectUUID)
	})

	public logout() {
		this.setIsRetrievingAllSandboxProjects(false)
		this.setHasRetrievedAllSandboxProjects(false)
		this.sandboxProjects = new Map()
		this.retrievingSingleProjects = new Map()
		this.setShowCode(false)
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

"use client"

import isUndefined from "lodash-es/isUndefined"
import { action, makeAutoObservable } from "mobx"
import { BlocklyJson, ProjectUUID, SandboxProject } from "@bluedotrobots/common-ts"

class SandboxClass {
	public isRetrievingAllSandboxProjects = false
	public hasRetrievedAllSandboxProjects = false
	public sandboxProjects: Map<ProjectUUID, SandboxProject> = new Map()
	public retrievingSingleProjects: Map<ProjectUUID, boolean> = new Map()

	constructor() {
		makeAutoObservable(this)
	}

	public setIsRetrievingAllSandboxProjects = action((newIsRetrievingAllSandboxProjects: boolean): void => {
		this.isRetrievingAllSandboxProjects = newIsRetrievingAllSandboxProjects
	})

	private setHasRetrievedAllSandboxProjects = action((newHasRetrievedAllSandboxProjects: boolean): void => {
		this.hasRetrievedAllSandboxProjects = newHasRetrievedAllSandboxProjects
	})

	public setSandboxProjects = action((sandboxProjects: SandboxProject[]): void => {
		sandboxProjects.forEach(sandboxProject => this.addSandboxProject(sandboxProject))
		this.setHasRetrievedAllSandboxProjects(true)
		this.setIsRetrievingAllSandboxProjects(false)
	})

	public addSandboxProject = action((sandboxProject: SandboxProject): void => {
		this.sandboxProjects.set(sandboxProject.projectUUID, sandboxProject)
		this.setIsRetrievingSingleProject(sandboxProject.projectUUID, false)
	})

	public setIsRetrievingSingleProject = action((projectUUID: ProjectUUID, isRetrieving: boolean): void => {
		this.retrievingSingleProjects.set(projectUUID, isRetrieving)
	})

	public isRetrievingSingleProject = (projectUUID: ProjectUUID): boolean => {
		return this.retrievingSingleProjects.get(projectUUID) || false
	}

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

	public updateProjectLastUpdated = action((projectUUID: ProjectUUID): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		project.updatedAt = new Date()
	})

	// Method to update project JSON in the store
	public updateProjectJson = action((projectUUID: ProjectUUID, newJson: BlocklyJson): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		project.sandboxJson = newJson
	})

	public deleteSandboxProject = action((projectUUID: ProjectUUID): void => {
		this.sandboxProjects.delete(projectUUID)
	})

	public logout(): void {
		this.setIsRetrievingAllSandboxProjects(false)
		this.setHasRetrievedAllSandboxProjects(false)
		this.sandboxProjects = new Map()
		this.retrievingSingleProjects = new Map()
	}
}

const sandboxClass = new SandboxClass()

export default sandboxClass

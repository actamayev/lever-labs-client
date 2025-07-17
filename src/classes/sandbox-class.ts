"use client"

import isUndefined from "lodash-es/isUndefined"
import { action, makeAutoObservable } from "mobx"
import { BlocklyJson, ProjectUUID, SandboxProject, SandboxChatMessage,
	SandboxChatbotStreamStartOrCompleteEvent, SandboxChatbotStreamChunkEvent } from "@bluedotrobots/common-ts"
import normalizeSandboxJson from "../utils/sandbox/normalize-sandbox-json"

// Extended interface for internal state management
interface SandboxProjectWithStreaming extends SandboxProject {
	isStreaming: boolean
	currentStreamingMessageId: string | null
}

class SandboxClass {
	public isRetrievingAllSandboxProjects = false
	public hasRetrievedAllSandboxProjects = false
	public sandboxProjects: Map<ProjectUUID, SandboxProjectWithStreaming> = new Map()
	public retrievingSingleProjects: Map<ProjectUUID, boolean> = new Map()
	public currentStreamIds: Map<ProjectUUID, string | null> = new Map()

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
		// Normalize the sandboxJson to ensure consistent format
		const normalizedSandboxJson = normalizeSandboxJson(sandboxProject.sandboxJson)
		// Add streaming state to the project
		const projectWithStreaming: SandboxProjectWithStreaming = {
			...sandboxProject,
			sandboxJson: normalizedSandboxJson,
			isStreaming: false,
			currentStreamingMessageId: null
		}
		this.sandboxProjects.set(sandboxProject.projectUUID, projectWithStreaming)
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

	// Chat-related methods
	public addUserMessage = action((projectUUID: ProjectUUID, content: string): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		const message: SandboxChatMessage = {
			role: "user",
			content,
			timestamp: new Date()
		}

		project.sandboxChatMessages.push(message)
	})

	public startStreaming = action((event: SandboxChatbotStreamStartOrCompleteEvent): void => {
		const project = this.sandboxProjects.get(event.sandboxProjectUUID)
		if (isUndefined(project)) return

		// Create streaming message placeholder
		const streamingMessage: SandboxChatMessage = {
			role: "assistant",
			content: "",
			timestamp: new Date()
		}

		// Generate a unique ID for the streaming message
		const streamingMessageId = `streaming-${Date.now()}`

		project.sandboxChatMessages.push(streamingMessage)
		project.isStreaming = true
		project.currentStreamingMessageId = streamingMessageId
	})

	public addStreamingChunk = action((event: SandboxChatbotStreamChunkEvent): void => {
		const project = this.sandboxProjects.get(event.sandboxProjectUUID)
		if (isUndefined(project)) return

		if (!project.isStreaming || !project.currentStreamingMessageId) {
			console.warn("Received chunk but not streaming for project:", event.sandboxProjectUUID)
			return
		}

		// Find the last message (which should be the streaming one)
		const lastMessage = project.sandboxChatMessages[project.sandboxChatMessages.length - 1]
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (lastMessage && lastMessage.role === "assistant") {
			lastMessage.content += event.content
		}
	})

	public completeStreaming = action((event: SandboxChatbotStreamStartOrCompleteEvent): void => {
		const project = this.sandboxProjects.get(event.sandboxProjectUUID)
		if (isUndefined(project) || !project.isStreaming) return

		// Reset streaming state
		project.isStreaming = false
		project.currentStreamingMessageId = null
	})

	public clearChatMessages = action((projectUUID: ProjectUUID): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		project.sandboxChatMessages = []
	})

	// Update the resetChatStreamingState method to also clear stream ID:
	public resetChatStreamingState = action((projectUUID: ProjectUUID): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		project.isStreaming = false
		project.currentStreamingMessageId = null
		this.setCurrentStreamId(projectUUID, null)
	})

	// Check if currently streaming for a project
	public isStreaming(projectUUID: ProjectUUID): boolean {
		const project = this.sandboxProjects.get(projectUUID)
		return project?.isStreaming || false
	}

	// Get chat messages for a project
	public getChatMessages(projectUUID: ProjectUUID): SandboxChatMessage[] {
		const project = this.sandboxProjects.get(projectUUID)
		return project?.sandboxChatMessages || []
	}

	public setCurrentStreamId = action((projectUUID: ProjectUUID, streamId: string | null): void => {
		this.currentStreamIds.set(projectUUID, streamId)
	})

	public getCurrentStreamId(projectUUID: ProjectUUID): string | null {
		return this.currentStreamIds.get(projectUUID) || null
	}

	// Update logout method to clear stream IDs:
	public logout(): void {
		this.setIsRetrievingAllSandboxProjects(false)
		this.setHasRetrievedAllSandboxProjects(false)
		this.sandboxProjects = new Map()
		this.retrievingSingleProjects = new Map()
		this.currentStreamIds.clear()
	}
}

const sandboxClass = new SandboxClass()

export default sandboxClass

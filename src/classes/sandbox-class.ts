"use client"

import isUndefined from "lodash-es/isUndefined"
import { action, makeAutoObservable } from "mobx"
import normalizeSandboxJson from "../utils/sandbox/normalize-sandbox-json"
import { SandboxProjectUUID } from "@lever-labs/common-ts/types/utils"
import { BlocklyJson, SandboxProject } from "@lever-labs/common-ts/types/sandbox"
import { SandboxChatMessage, SandboxChatbotStreamChunkEvent,
	SandboxChatbotStreamStartOrCompleteEvent } from "@lever-labs/common-ts/types/chat"

class SandboxClass {
	public isRetrievingAllSandboxProjects = false
	public hasRetrievedAllSandboxProjects = false
	public sandboxProjects: Map<SandboxProjectUUID, SandboxProjectWithStreaming> = new Map()
	public retrievingSingleProjects: Map<SandboxProjectUUID, boolean> = new Map()
	public currentStreamIds: Map<SandboxProjectUUID, string | null> = new Map()
	public isRenameDialogOpen = false
	public renameDialogProjectUUID: SandboxProjectUUID | null = null
	public newProjectName = ""

	constructor() {
		makeAutoObservable(this)
	}

	public setIsRetrievingAllSandboxProjects = action((newIsRetrievingAllSandboxProjects: boolean): void => {
		this.isRetrievingAllSandboxProjects = newIsRetrievingAllSandboxProjects
	})

	private setHasRetrievedAllSandboxProjects = action((newHasRetrievedAllSandboxProjects: boolean): void => {
		this.hasRetrievedAllSandboxProjects = newHasRetrievedAllSandboxProjects
	})

	public setSandboxProjects = action(async (sandboxProjects: SandboxProject[]): Promise<void> => {
		await Promise.all(sandboxProjects.map((sandboxProject): Promise<void> => this.addSandboxProject(sandboxProject)))
		this.setHasRetrievedAllSandboxProjects(true)
		this.setIsRetrievingAllSandboxProjects(false)
	})

	public addSandboxProject = action(async (sandboxProject: SandboxProject): Promise<void> => {
		// Normalize the sandboxJson to ensure consistent format
		const normalizedSandboxJson = normalizeSandboxJson(sandboxProject.sandboxJson)
		const { default: getCppGenerator } = await import("../utils/cpp/cpp-generator")
		// Add streaming state to the project
		const projectWithStreaming: SandboxProjectWithStreaming = {
			...sandboxProject,
			sandboxJson: normalizedSandboxJson,
			isStreaming: false,
			isWaitingForResponse: false,
			currentStreamingMessageId: null,
			cppCode: await getCppGenerator().generateCppFromJson(normalizedSandboxJson)
		}
		this.setSandboxProject(sandboxProject.sandboxProjectUUID, projectWithStreaming)
		this.setIsRetrievingSingleProject(sandboxProject.sandboxProjectUUID, false)
	})

	private setSandboxProject = action((projectUUID: SandboxProjectUUID, projectWithStreaming: SandboxProjectWithStreaming): void => {
		this.sandboxProjects.set(projectUUID, projectWithStreaming)
	})

	public setIsRetrievingSingleProject = action((projectUUID: SandboxProjectUUID, isRetrieving: boolean): void => {
		this.retrievingSingleProjects.set(projectUUID, isRetrieving)
	})

	public isRetrievingSingleProject = (projectUUID: SandboxProjectUUID): boolean => {
		return this.retrievingSingleProjects.get(projectUUID) || false
	}

	public updateStarStatus = action((projectUUID: SandboxProjectUUID): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return
		project.isStarred = !project.isStarred
	})

	public updateProjectName = action((projectUUID: SandboxProjectUUID, newName: string): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		project.projectName = newName
		project.updatedAt = new Date()
	})

	public updateProjectNotes = action((projectUUID: SandboxProjectUUID, newNotes: string): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		project.projectNotes = newNotes
	})

	public updateProjectLastUpdated = action((projectUUID: SandboxProjectUUID): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		project.updatedAt = new Date()
	})

	// Method to update project JSON without regenerating CPP (when CPP is already generated)
	public updateProjectJsonWithCpp = action((projectUUID: SandboxProjectUUID, newJson: BlocklyJson, cppCode: string): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		project.sandboxJson = newJson
		project.cppCode = cppCode
	})

	public getCppCode = action((projectUUID: SandboxProjectUUID): string => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return ""
		return project.cppCode
	})

	public setCppCode = action((projectUUID: SandboxProjectUUID, cppCode: string): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return
		project.cppCode = cppCode
	})

	public deleteSandboxProject = action((projectUUID: SandboxProjectUUID): void => {
		this.sandboxProjects.delete(projectUUID)
	})

	public getProjectNotes = action((projectUUID: SandboxProjectUUID): string => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return ""
		return project.projectNotes || ""
	})

	// Chat-related methods
	public addUserMessage = action((projectUUID: SandboxProjectUUID, content: string): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		// Set waiting for response when sending user message
		project.isWaitingForResponse = true

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

		// Set waiting for response to false when streaming starts
		project.isWaitingForResponse = false

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

	public clearChatMessages = action((projectUUID: SandboxProjectUUID): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return
		project.sandboxChatMessages = []
		this.resetChatStreamingState(projectUUID)
	})

	// Update the resetChatStreamingState method to also clear stream ID:
	public resetChatStreamingState = action((projectUUID: SandboxProjectUUID): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		project.isStreaming = false
		project.currentStreamingMessageId = null
		this.setCurrentStreamId(projectUUID, null)
	})

	// Check if currently streaming for a project
	public isStreaming(projectUUID: SandboxProjectUUID): boolean {
		const project = this.sandboxProjects.get(projectUUID)
		return project?.isStreaming || false
	}

	// Check if waiting for response for a project
	public isWaitingForResponse(projectUUID: SandboxProjectUUID): boolean {
		const project = this.sandboxProjects.get(projectUUID)
		return project?.isWaitingForResponse || false
	}

	// Set waiting for response state
	public setWaitingForResponse = action((projectUUID: SandboxProjectUUID, isWaiting: boolean): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return
		project.isWaitingForResponse = isWaiting
	})

	// Get chat messages for a project
	public getChatMessages(projectUUID: SandboxProjectUUID): SandboxChatMessage[] {
		const project = this.sandboxProjects.get(projectUUID)
		return project?.sandboxChatMessages || []
	}

	public setCurrentStreamId = action((projectUUID: SandboxProjectUUID, streamId: string | null): void => {
		this.currentStreamIds.set(projectUUID, streamId)
	})

	public getCurrentStreamId(projectUUID: SandboxProjectUUID): string | null {
		return this.currentStreamIds.get(projectUUID) || null
	}

	// Rename dialog management
	public openRenameDialog = action((projectUUID: SandboxProjectUUID): void => {
		const project = this.sandboxProjects.get(projectUUID)
		if (isUndefined(project)) return

		this.renameDialogProjectUUID = projectUUID
		this.newProjectName = project.projectName || ""
		this.isRenameDialogOpen = true
	})

	public closeRenameDialog = action((): void => {
		this.isRenameDialogOpen = false
		this.renameDialogProjectUUID = null
		this.newProjectName = ""
	})

	public setNewProjectName = action((name: string): void => {
		this.newProjectName = name
	})

	// Update logout method to clear stream IDs:
	public logout(): void {
		this.setIsRetrievingAllSandboxProjects(false)
		this.setHasRetrievedAllSandboxProjects(false)
		this.sandboxProjects = new Map()
		this.retrievingSingleProjects = new Map()
		this.currentStreamIds.clear()
		this.isRenameDialogOpen = false
		this.renameDialogProjectUUID = null
		this.newProjectName = ""
	}
}

const sandboxClass = new SandboxClass()

export default sandboxClass

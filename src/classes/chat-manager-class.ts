"use client"

import { action, makeAutoObservable, observable } from "mobx"
import {
	InteractionType,
	ChallengeChatbotStreamStartEvent,
	ChallengeChatbotStreamChunkEvent,
	ChallengeChatbotStreamCompleteEvent,
	BinaryEvaluationResult,
	CqChallengeData,
	CareerUUID,
	BlocklyJson,
	ChallengeUUID,
	CareerChatbotStreamStartOrCompleteEvent,
	CareerChatbotChunkEvent
} from "@bluedotrobots/common-ts"

// Chat and streaming state interfaces
interface ChatData {
	messages: ChallengeChatMessage[]
	isWaitingForResponse: boolean
}

interface StreamingState {
	isStreaming: boolean
	currentStreamingMessageId: string | null
	currentStreamId: string | null
	currentInteractionType: InteractionType | null
	isWaitingForCodeCheck: boolean
}

interface ChallengeInstance extends ChatData, StreamingState {
	challengeData: CqChallengeData
	isCompleted: boolean
	blocklyJson: BlocklyJson
	cppCode: string
}

// omit interactionType:
interface CareerChatData extends Omit<StreamingState, "interactionType"> {
	messages: CareerChatMessage[]
	isWaitingForResponse: boolean
}

interface CareerUUIDChallengeUUID {
	careerUUID: CareerUUID
	challengeUUID: ChallengeUUID
}

export class ChatManagerClass {
	// Challenge chat data: careerUUID -> challengeUUID -> ChallengeInstance
	public challengeChats = observable.map<CareerUUID, Map<ChallengeUUID, ChallengeInstance>>()

	// Career chat data: careerUUID -> CareerChatData
	public careerChats = observable.map<CareerUUID, CareerChatData>()

	constructor() {
		makeAutoObservable(this)
	}

	// ========================================
	// INITIALIZATION & HELPERS
	// ========================================

	public initializeCareerChat = action((careerUUID: CareerUUID): void => {
		if (this.careerChats.has(careerUUID)) return

		this.careerChats.set(careerUUID, {
			messages: [],
			isWaitingForResponse: false,
			isStreaming: false,
			currentStreamingMessageId: null,
			currentStreamId: null,
			currentInteractionType: null,
			isWaitingForCodeCheck: false
		})
	})

	public initializeChallengeChat = action((
		careerUUID: CareerUUID,
		challengeUUID: ChallengeUUID,
		challengeData: CqChallengeData,
		blocklyJson: BlocklyJson,
		cppCode: string,
		isCompleted: boolean = false
	// eslint-disable-next-line max-params
	): void => {
		if (!this.challengeChats.has(careerUUID)) {
			this.challengeChats.set(careerUUID, new Map<ChallengeUUID, ChallengeInstance>())
		}

		const careerChallenges = this.challengeChats.get(careerUUID)
		if (!careerChallenges) return
		if (careerChallenges.has(challengeUUID)) return

		careerChallenges.set(challengeUUID, {
			challengeData,
			messages: [],
			isWaitingForResponse: false,
			isStreaming: false,
			currentStreamingMessageId: null,
			currentStreamId: null,
			currentInteractionType: null,
			isWaitingForCodeCheck: false,
			isCompleted,
			blocklyJson,
			cppCode
		})
	})

	private getChallenge(cqInformation: CareerUUIDChallengeUUID): ChallengeInstance | undefined {
		const careerChallenges = this.challengeChats.get(cqInformation.careerUUID)
		return careerChallenges?.get(cqInformation.challengeUUID)
	}

	private getCareerChat(careerUUID: CareerUUID): CareerChatData | undefined {
		return this.careerChats.get(careerUUID)
	}

	// ========================================
	// CHALLENGE MESSAGE MANAGEMENT
	// ========================================

	public getChallengeMessages(cqInformation: CareerUUIDChallengeUUID): ChallengeChatMessage[] {
		const challenge = this.getChallenge(cqInformation)
		return challenge?.messages || []
	}

	public addChallengeUserMessage = action((cqInformation: CareerUUIDChallengeUUID, content: string): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return

		// Hide hint button from all messages when a new message is added
		this.hideChallengeHintButtons(cqInformation)

		challenge.isWaitingForResponse = true

		const message: ChallengeChatMessage = {
			id: `user-${Date.now()}`,
			role: "user",
			content,
			timestamp: new Date()
		}

		challenge.messages.push(message)
	})

	public addChallengeHintRequestMessage = action((cqInformation: CareerUUIDChallengeUUID): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return

		this.hideChallengeHintButtons(cqInformation)
		challenge.isWaitingForResponse = true

		const message: ChallengeChatMessage = {
			id: `hint-request-${Date.now()}`,
			role: "user",
			content: "?",
			timestamp: new Date(),
			isHintRequest: true
		}

		challenge.messages.push(message)
	})

	public addChallengeCheckCodeRequestMessage = action((cqInformation: CareerUUIDChallengeUUID): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return

		this.hideChallengeHintButtons(cqInformation)
		challenge.isWaitingForResponse = true

		const message: ChallengeChatMessage = {
			id: `check-code-request-${Date.now()}`,
			role: "user",
			content: "?",
			timestamp: new Date(),
			isCheckCodeRequest: true
		}

		challenge.messages.push(message)
	})

	public addChallengeEvaluationResultMessage = action((
		cqInformation: CareerUUIDChallengeUUID,
		evaluationResult: BinaryEvaluationResult,
		onChallengeCompleted?: (careerUUID: CareerUUID, challengeUUID: ChallengeUUID) => void
	): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return

		challenge.isWaitingForResponse = false
		challenge.isWaitingForCodeCheck = false

		const message: ChallengeChatMessage = {
			id: `evaluation-result-${Date.now()}`,
			role: "assistant",
			content: evaluationResult.feedback,
			timestamp: new Date(),
			evaluationResult,
			shouldShowHintButton: !evaluationResult.isCorrect
		}

		challenge.messages.push(message)

		// Mark challenge as completed if correct
		if (!evaluationResult.isCorrect) return
		challenge.isCompleted = true

		// Notify the parent class about completion
		if (onChallengeCompleted) {
			onChallengeCompleted(cqInformation.careerUUID, cqInformation.challengeUUID)
		}
	})

	public isCodeCorrect(cqInformation: CareerUUIDChallengeUUID): boolean {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return false
		return challenge.isCompleted
	}

	private hideChallengeHintButtons = action((cqInformation: CareerUUIDChallengeUUID): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return

		challenge.messages.forEach((message): void => {
			if (message.shouldShowHintButton) {
				message.shouldShowHintButton = false
			}
		})
	})

	public clearChallengeMessages = action((cqInformation: CareerUUIDChallengeUUID): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return
		challenge.messages = []
		this.resetChallengeStreamingState(cqInformation)
	})

	// ========================================
	// CAREER MESSAGE MANAGEMENT
	// ========================================

	public getCareerChatMessages(careerUUID: CareerUUID): CareerChatMessage[] {
		const careerChat = this.getCareerChat(careerUUID)
		return careerChat?.messages || []
	}

	public addCareerUserMessage = action((careerUUID: CareerUUID, content: string): void => {
		const careerChat = this.getCareerChat(careerUUID)
		if (!careerChat) return
		careerChat.isWaitingForResponse = true

		const message: CareerChatMessage = {
			id: `user-${Date.now()}`,
			role: "user",
			content,
			timestamp: new Date()
		}

		careerChat.messages.push(message)
	})

	public clearCareerChatMessages = action((careerUUID: CareerUUID): void => {
		const careerChat = this.getCareerChat(careerUUID)
		if (!careerChat) return
		careerChat.messages = []
		this.resetCareerStreamingState(careerUUID)
	})

	public setCareerChatRetrievedData = action((careerUUID: CareerUUID, messages: CareerChatMessage[]): void => {
		const careerChat = this.getCareerChat(careerUUID)
		if (!careerChat) return

		// Set the retrieved messages in the career chat data
		careerChat.messages = messages

		// Reset any streaming states since these are retrieved messages
		careerChat.isWaitingForResponse = false
		careerChat.isStreaming = false
		careerChat.currentStreamingMessageId = null
		careerChat.currentStreamId = null
	})

	// ========================================
	// CHALLENGE STREAMING MANAGEMENT
	// ========================================

	public startChallengeStreaming = action((startEvent: ChallengeChatbotStreamStartEvent): void => {
		const challenge = this.getChallenge({ ...startEvent })
		if (!challenge) return

		challenge.isWaitingForResponse = false

		const streamingMessage: ChallengeChatMessage = {
			id: `streaming-${Date.now()}`,
			role: "assistant",
			content: "",
			timestamp: new Date(),
			isStreaming: true,
			isHintResponse: startEvent.interactionType === "hint"
		}

		challenge.messages.push(streamingMessage)
		this.setChallengeStreaming({ ...startEvent }, true)
		challenge.currentStreamingMessageId = streamingMessage.id
		challenge.currentInteractionType = startEvent.interactionType
	})

	public setChallengeStreaming = action((cqInformation: CareerUUIDChallengeUUID, streaming: boolean): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return
		challenge.isStreaming = streaming
	})

	public setChallengeWaitingForCodeCheck = action((cqInformation: CareerUUIDChallengeUUID, isWaitingForCodeCheck: boolean): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return
		challenge.isWaitingForCodeCheck = isWaitingForCodeCheck
	})

	public addChallengeStreamingChunk = action((chunkEvent: ChallengeChatbotStreamChunkEvent): void => {
		const challenge = this.getChallenge({ ...chunkEvent })
		if (!challenge) return

		if (!challenge.isStreaming || !challenge.currentStreamingMessageId) {
			console.warn("Received chunk but not streaming for challenge:", chunkEvent.challengeUUID)
			return
		}

		const streamingMessage = challenge.messages.find(
			(msg): boolean => msg.id === challenge.currentStreamingMessageId
		)

		if (streamingMessage) {
			streamingMessage.content += chunkEvent.content
		}
	})

	public completeChallengeStreaming = action((completeEvent: ChallengeChatbotStreamCompleteEvent): void => {
		const challenge = this.getChallenge({ ...completeEvent })
		if (
			!challenge ||
			!challenge.currentStreamingMessageId
		) return

		const streamingMessage = challenge.messages.find(
			(msg): boolean => msg.id === challenge.currentStreamingMessageId
		)

		if (streamingMessage) {
			streamingMessage.isStreaming = false
		}

		// Reset streaming state
		challenge.isStreaming = false
		challenge.currentStreamingMessageId = null
		challenge.currentInteractionType = null
		challenge.currentStreamId = null
		challenge.isWaitingForCodeCheck = false
	})

	public resetChallengeStreamingState = action((cqInformation: CareerUUIDChallengeUUID): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return

		challenge.isStreaming = false
		challenge.currentStreamingMessageId = null
		challenge.currentInteractionType = null
		challenge.currentStreamId = null
	})

	// Stream ID management
	public setChallengeStreamId = action((cqInformation: CareerUUIDChallengeUUID, streamId: string | null): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return
		challenge.currentStreamId = streamId
	})

	public getChallengeStreamId(cqInformation: CareerUUIDChallengeUUID): string | null {
		const challenge = this.getChallenge(cqInformation)
		return challenge?.currentStreamId || null
	}

	// ========================================
	// CAREER STREAMING MANAGEMENT
	// ========================================

	public startCareerStreaming = action((startEvent: CareerChatbotStreamStartOrCompleteEvent): void => {
		const careerChat = this.getCareerChat(startEvent.careerUUID)
		if (!careerChat) return

		careerChat.isWaitingForResponse = false

		const streamingMessage: CareerChatMessage = {
			id: `streaming-${Date.now()}`,
			role: "assistant",
			content: "",
			timestamp: new Date(),
			isStreaming: true
		}

		careerChat.messages.push(streamingMessage)
		careerChat.isStreaming = true
		careerChat.currentStreamingMessageId = streamingMessage.id
	})

	public addCareerStreamingChunk = action((chunkEvent: CareerChatbotChunkEvent): void => {
		const careerChat = this.getCareerChat(chunkEvent.careerUUID)
		if (!careerChat) return

		if (!careerChat.isStreaming || !careerChat.currentStreamingMessageId) {
			console.warn("Received chunk but not streaming for career:", chunkEvent.careerUUID)
			return
		}

		const streamingMessage = careerChat.messages.find(
			(msg): boolean => msg.id === careerChat.currentStreamingMessageId
		)

		if (streamingMessage) {
			streamingMessage.content += chunkEvent.content
		}
	})

	public completeCareerStreaming = action((completeEvent: CareerChatbotStreamStartOrCompleteEvent): void => {
		const careerChat = this.getCareerChat(completeEvent.careerUUID)
		if (
			!careerChat ||
			!careerChat.isStreaming ||
			!careerChat.currentStreamingMessageId
		) return

		const streamingMessage = careerChat.messages.find(
			(msg): boolean => msg.id === careerChat.currentStreamingMessageId
		)

		if (streamingMessage) {
			streamingMessage.isStreaming = false
		}

		careerChat.isStreaming = false
		careerChat.currentStreamingMessageId = null
		careerChat.currentInteractionType = null
		careerChat.currentStreamId = null
	})

	public resetCareerStreamingState = action((careerUUID: CareerUUID): void => {
		const careerChat = this.getCareerChat(careerUUID)
		if (!careerChat) return

		careerChat.isStreaming = false
		careerChat.currentStreamingMessageId = null
		careerChat.currentInteractionType = null
		careerChat.currentStreamId = null
	})

	public setCareerStreamId = action((careerUUID: CareerUUID, streamId: string | null): void => {
		const careerChat = this.getCareerChat(careerUUID)
		if (!careerChat) return
		careerChat.currentStreamId = streamId
	})

	public getCareerStreamId(careerUUID: CareerUUID): string | null {
		const careerChat = this.getCareerChat(careerUUID)
		return careerChat?.currentStreamId || null
	}

	// ========================================
	// STATE GETTERS
	// ========================================

	public isChallengeStreaming(cqChallengeData: CqChallengeData): boolean {
		const challenge = this.getChallenge({ ...cqChallengeData })
		return challenge?.isStreaming || false
	}

	public isChallengeWaitingForResponse(cqChallengeData: CqChallengeData): boolean {
		const challenge = this.getChallenge({ ...cqChallengeData })
		return challenge?.isWaitingForResponse || false
	}

	public isChallengeWaitingForCodeCheck(cqChallengeData: CqChallengeData): boolean {
		const challenge = this.getChallenge({ ...cqChallengeData })
		return challenge?.isWaitingForCodeCheck || false
	}

	public isCareerStreaming(careerUUID: CareerUUID): boolean {
		const careerChat = this.getCareerChat(careerUUID)
		return careerChat?.isStreaming || false
	}

	public isCareerWaitingForResponse(careerUUID: CareerUUID): boolean {
		const careerChat = this.getCareerChat(careerUUID)
		return careerChat?.isWaitingForResponse || false
	}

	// ========================================
	// CHALLENGE DATA MANAGEMENT
	// ========================================

	public setChallengeRetrievedData = action((
		cqInformation: CareerUUIDChallengeUUID,
		messages: ChallengeChatMessage[],
		sandboxJson: BlocklyJson | null,
		isCompleted: boolean,
		onChallengeCompleted?: (careerUUID: CareerUUID, challengeUUID: ChallengeUUID) => void
	// eslint-disable-next-line max-params
	): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return

		challenge.messages = messages
		challenge.isCompleted = isCompleted

		// Update blockly JSON if provided
		if (sandboxJson) {
			challenge.blocklyJson = sandboxJson
			// Note: cppCode generation will need to be handled by the parent class
		}

		if (isCompleted && onChallengeCompleted) {
			onChallengeCompleted(cqInformation.careerUUID, cqInformation.challengeUUID)
		}
	})

	public getUpdatedBlocklyJson(cqInformation: CareerUUIDChallengeUUID): BlocklyJson {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return {}
		return challenge.blocklyJson
	}

	public updateBlocklyJson = action((cqInformation: CareerUUIDChallengeUUID, newBlocklyJson: BlocklyJson, cppCode: string): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return
		challenge.blocklyJson = newBlocklyJson
		challenge.cppCode = cppCode
	})

	public getCppCode(cqInformation: CareerUUIDChallengeUUID): string {
		const challenge = this.getChallenge(cqInformation)
		return challenge?.cppCode || ""
	}

	public setCppCode = action((cqInformation: CareerUUIDChallengeUUID, cppCode: string): void => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return
		challenge.cppCode = cppCode
	})

	public resetChallengeBlocklyJsonToInitial = action((cqInformation: CareerUUIDChallengeUUID): boolean => {
		const challenge = this.getChallenge(cqInformation)
		if (!challenge) return false

		// This will need to be coordinated with the parent class to get initial JSON and generate CPP
		return false
	})

	// ========================================
	// CLEANUP
	// ========================================

	public logout(): void {
		this.challengeChats.clear()
		this.careerChats.clear()
	}
}

const chatManagerClass = new ChatManagerClass()
export default chatManagerClass

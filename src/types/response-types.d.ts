declare global {
	// Common Responses:
	type SuccessResponse = { success: string }
	type MessageResponse = { message: string }
	type ValidationErrorResponse = { validationError: string }
	type ErrorResponse = { error: string }
	type ErrorResponses = ValidationErrorResponse | ErrorResponse
	type NonSuccessResponse = MessageResponse | ErrorResponses
	type AllCommonResponses = SuccessResponse | NonSuccessResponse

	//Auth Responses:
	type RegisterSuccess = {
		accessToken: string
	}
	type LoginSuccess = RegisterSuccess & {
		userPipData: PipData[]
	}
	type GoogleAuthSuccess = LoginSuccess & { isNewUser: boolean }

	// Lab Activity Tracking Responses:
	type RetrievedUserActivityProgressResponse = {
		userActivityProgress: UserActivityProgress[]
	}

	type RetrievedQuestionsResponse = {
		quizAttempts: RetrievedQuestions[]
	}

	// Personal Info Responses:
	type PersonalInfoResponse = {
		username: string
		email: string | null
		defaultSiteTheme: SiteThemes
		profilePictureUrl: string | null
		sandboxNotesOpen: boolean
		name: string | null
	}
	type ProfilePictureUrl = { profilePictureUrl: string }

	// Pip Responses
	type AddNewPipResponse = {
		pipName: string
		userPipUUIDId: number
		pipConnectionStatus: PipConnectionStatus
	}
	type PreviouslyAddedPipsResponse = {
		userPipData: PipData[]
	}

	type RetrieveIsPipUUIDValidResponse = {
		pipName: string | null
		pipConnectionStatus: ESPConnectionStatus
	}

	type DemoResponse = {
		demoStarted: boolean
	}

	// Sandbox Routes
	type RetrieveSandboxProjectResponse = {
		sandboxProject: SandboxProject
	}

	type RetrieveSandboxProjectsResponse = {
		sandboxProjects: SandboxProject[]
	}
}

export {}

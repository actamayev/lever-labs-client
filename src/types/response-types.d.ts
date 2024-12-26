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

	// Personal Info Responses:
	type PersonalInfoResponse = {
		username: string
		email: string | null
		defaultSiteTheme: SiteThemes
		profilePictureUrl: string | null
		defaultSidebarState: SidebarStates
	}

	// Pip Responses
	type AddNewPipResponse = {
		pipName: string
		userPipUUIDId: number
		pipConnectionStatus: PipConnectionStatus
	}
	type PreviouslyAddedPipsResponse = {
		userPipData: PipData[]
	}

	type IsValidPipUUIDResponse = {
		pipName: string | null
		pipConnectionStatus: ESPConnectionStatus
	}

	// Socket Events:
	type PipStatusUpdate = {
		pipUUID: PipUUID
		newConnectionStatus: PipConnectionStatus
	}
}

export {}

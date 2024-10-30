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
	type LoginOrRegisterSuccess = {
		accessToken: string
		publicKey: string
	}
	type GoogleAuthSuccess = LoginOrRegisterSuccess & { isNewUser: boolean }

	// Personal Info Responses:
	type PersonalInfoResponse = {
		username: string
		email: string | null
		defaultSiteTheme: SiteThemes
	}
}

export {}

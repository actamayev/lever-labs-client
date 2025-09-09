"use client"

import getPipClass from "../../classes/pip-class"
import getAuthClass from "../../classes/auth-class"
import getSocketClass from "../../classes/socket-class"
import getGarageClass from "../../classes/garage-class"
import getSandboxClass from "../../classes/sandbox-class"
import getStudentClass from "../../classes/student-class"
import getTeacherClass from "../../classes/teacher-class"
import getWorkbenchClass from "../../classes/workbench-class"
import getCareerQuestClass from "../../classes/career-quest-class"
import getPersonalInfoClass from "../../classes/personal-info-class"
import getBlueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import serialMessageManagerClass from "../../classes/serial-message-manager-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"
import careerQuestTriggersClass from "../../classes/career-quest-triggers-class"
import getSensorDataClass from "../../classes/sensor-data-class"
import getChatManagerClass from "../../classes/chat-manager-class"
import getNavigationManagerClass from "../../classes/navigation-manager-class"

export default async function logout(): Promise<void> {
	getAuthClass().setLoggingOut(true)

	try {
		// Call logout API (this clears the HTTP cookie on the server via clearAuthCookie)
		await getBlueDotApiClientClass().authDataService.logout()

		// Clear all client state
		getPersonalInfoClass().logout()
		getPipClass().logout()
		getSocketClass().logout()
		getCareerQuestClass().logout()
		getNavigationManagerClass().logout()
		getChatManagerClass().logout()
		careerQuestTriggersClass.logout()
		getAuthClass().logout()
		getWorkbenchClass().logout()
		getSandboxClass().logout()
		getGarageClass().logout()
		getSensorDataClass().logout()
		serialMessageManagerClass.logout()
		getStudentClass().logout()
		getTeacherClass().logout()
		await serialConnectionManagerClass.logout()

		// Redirect to home page
		if (typeof window !== "undefined") {
			window.location.href = "/"
		}

	} catch (error) {
		console.error("Logout error:", error)

		// Even if API fails, clear local state and redirect
		getPersonalInfoClass().logout()
		getPipClass().logout()
		getSocketClass().logout()
		getCareerQuestClass().logout()
		getNavigationManagerClass().logout()
		getChatManagerClass().logout()
		careerQuestTriggersClass.logout()
		getAuthClass().logout()
		getWorkbenchClass().logout()
		getSandboxClass().logout()
		getGarageClass().logout()
		getSensorDataClass().logout()
		serialMessageManagerClass.logout()
		getStudentClass().logout()
		getTeacherClass().logout()
		await serialConnectionManagerClass.logout()

		if (typeof window !== "undefined") {
			window.location.href = "/"
		}
	} finally {
		getAuthClass().setLoggingOut(false)
	}
}

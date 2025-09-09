"use client"

import pipClass from "../../classes/pip-class"
import authClass from "../../classes/auth-class"
import socketClass from "../../classes/socket-class"
import garageClass from "../../classes/garage-class"
import sandboxClass from "../../classes/sandbox-class"
import studentClass from "../../classes/student-class"
import teacherClass from "../../classes/teacher-class"
import workbenchClass from "../../classes/workbench-class"
import careerQuestClass from "../../classes/career-quest-class"
import personalInfoClass from "../../classes/personal-info-class"
import blueDotApiClient from "../../classes/blue-dot-api-client-class"
import serialMessageManagerClass from "../../classes/serial-message-manager-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"
import careerQuestTriggersClass from "../../classes/career-quest-triggers-class"
import sensorDataClass from "../../classes/sensor-data-class"
import chatManagerClass from "../../classes/chat-manager-class"
import getNavigationManagerClass from "../../classes/navigation-manager-class"

export default async function logout(): Promise<void> {
	authClass.setLoggingOut(true)

	try {
		// Call logout API (this clears the HTTP cookie on the server via clearAuthCookie)
		await blueDotApiClient.authDataService.logout()

		// Clear all client state
		personalInfoClass.logout()
		pipClass.logout()
		socketClass.logout()
		careerQuestClass.logout()
		getNavigationManagerClass().logout()
		chatManagerClass.logout()
		careerQuestTriggersClass.logout()
		authClass.logout()
		workbenchClass.logout()
		sandboxClass.logout()
		garageClass.logout()
		sensorDataClass.logout()
		serialMessageManagerClass.logout()
		studentClass.logout()
		teacherClass.logout()
		await serialConnectionManagerClass.logout()

		// Redirect to home page
		if (typeof window !== "undefined") {
			window.location.href = "/"
		}

	} catch (error) {
		console.error("Logout error:", error)

		// Even if API fails, clear local state and redirect
		personalInfoClass.logout()
		pipClass.logout()
		socketClass.logout()
		careerQuestClass.logout()
		getNavigationManagerClass().logout()
		chatManagerClass.logout()
		careerQuestTriggersClass.logout()
		authClass.logout()
		workbenchClass.logout()
		sandboxClass.logout()
		garageClass.logout()
		sensorDataClass.logout()
		serialMessageManagerClass.logout()
		studentClass.logout()
		teacherClass.logout()
		await serialConnectionManagerClass.logout()

		if (typeof window !== "undefined") {
			window.location.href = "/"
		}
	} finally {
		authClass.setLoggingOut(false)
	}
}

"use client"

import pipClass from "../../classes/pip-class"
import authClass from "../../classes/auth-class"
import socketClass from "../../classes/socket-class"
import garageClass from "../../classes/garage-class"
import getSandboxClass from "../../classes/sandbox-class"
import studentClass from "../../classes/student-class"
import teacherClass from "../../classes/teacher-class"
import workbenchClass from "../../classes/workbench-class"
import getCareerQuestClass from "../../classes/career-quest-class"
import personalInfoClass from "../../classes/personal-info-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import serialMessageManagerClass from "../../classes/serial-message-manager-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"
import careerQuestTriggersClass from "../../classes/career-quest-triggers-class"
import sensorDataClass from "../../classes/sensor-data-class"
import getChatManagerClass from "../../classes/chat-manager-class"
import navigationManagerClass from "../../classes/navigation-manager-class"

export default async function logout(): Promise<void> {
	authClass.setLoggingOut(true)

	try {
		// Call logout API (this clears the HTTP cookie on the server via clearAuthCookie)
		await blueDotApiClientClass.authDataService.logout()

		// Clear all client state
		personalInfoClass.logout()
		pipClass.logout()
		socketClass.logout()
		getCareerQuestClass().logout()
		navigationManagerClass.logout()
		getChatManagerClass().logout()
		careerQuestTriggersClass.logout()
		authClass.logout()
		workbenchClass.logout()
		getSandboxClass().logout()
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
		getCareerQuestClass().logout()
		navigationManagerClass.logout()
		getChatManagerClass().logout()
		careerQuestTriggersClass.logout()
		authClass.logout()
		workbenchClass.logout()
		getSandboxClass().logout()
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

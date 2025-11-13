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
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"
import serialMessageManagerClass from "../../classes/serial-message-manager-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"
import careerQuestTriggersClass from "../../classes/career-quest-triggers-class"
import sensorDataClass from "../../classes/sensor-data-class"
import chatManagerClass from "../../classes/chat-manager-class"
import navigationManagerClass from "../../classes/navigation-manager-class"
import { soundManager } from "../../classes/utility/sound-manager-class"
import questClass from "../../classes/quest-class"
import gamesClass from "../../classes/games-class"

export default async function logout(): Promise<void> {
	authClass.setLoggingOut(true)

	try {
		await serialConnectionManagerClass.logout()
		// Call logout API (this clears the HTTP cookie on the server via clearAuthCookie)
		await leverLabsApiClient.authDataService.logout()
		authClass.logout()
		soundManager.cleanup()

		questClass.logout()
		gamesClass.logout()
		// Clear all client state
		personalInfoClass.logout()
		pipClass.logout()
		socketClass.logout()
		careerQuestClass.logout()
		navigationManagerClass.logout()
		chatManagerClass.logout()
		careerQuestTriggersClass.logout()
		workbenchClass.logout()
		sandboxClass.logout()
		garageClass.logout()
		sensorDataClass.logout()
		serialMessageManagerClass.logout()
		studentClass.logout()
		teacherClass.logout()
	} catch (error) {
		console.error("Logout error:", error)
		authClass.logout()
		soundManager.cleanup()

		questClass.logout()
		gamesClass.logout()
		// Even if API fails, clear local state and redirect
		personalInfoClass.logout()
		pipClass.logout()
		socketClass.logout()
		careerQuestClass.logout()
		navigationManagerClass.logout()
		chatManagerClass.logout()
		careerQuestTriggersClass.logout()
		workbenchClass.logout()
		sandboxClass.logout()
		garageClass.logout()
		sensorDataClass.logout()
		serialMessageManagerClass.logout()
		studentClass.logout()
		teacherClass.logout()
		await serialConnectionManagerClass.logout()
	} finally {
		authClass.setLoggingOut(false)
	}
}

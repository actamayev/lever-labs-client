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
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import serialMessageManagerClass from "../../classes/serial-message-manager-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"
import careerQuestTriggersClass from "../../classes/career-quest-triggers-class"
import sensorDataClass from "../../classes/sensor-data-class"
import chatManagerClass from "../../classes/chat-manager-class"

export default async function logout(): Promise<void> {
	authClass.setLoggingOut(true) // ADD this first line
	try {
		await blueDotApiClientClass.authDataService.logout()
		personalInfoClass.logout()
		pipClass.logout()
		socketClass.logout()
		careerQuestClass.logout()
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
	} catch (error) {
		console.error("Logout error:", error)
		personalInfoClass.logout()
		pipClass.logout()
		socketClass.logout()
		careerQuestClass.logout()
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
	} finally {
		authClass.setLoggingOut(false)
	}
}

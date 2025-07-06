"use client"

import pipClass from "../../classes/pip-class"
import authClass from "../../classes/auth-class"
import socketClass from "../../classes/socket-class"
import garageClass from "../../classes/garage-class"
import sandboxClass from "../../classes/sandbox-class"
import workbenchClass from "../../classes/workbench-class"
import labReadingClass from "../../classes/lab-reading-class"
import careerQuestClass from "../../classes/career-quest-class"
import personalInfoClass from "../../classes/personal-info-class"
import activityProgressClass from "../../classes/activity-progress-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import serialMessageManagerClass from "../../classes/serial-message-manager-class"
import serialConnectionManagerClass from "../../classes/serial-connection-manager-class"

export default async function logout(): Promise<void> {
	personalInfoClass.logout()
	pipClass.logout()
	socketClass.logout()
	careerQuestClass.logout()
	authClass.logout()
	blueDotApiClientClass.logout()
	labReadingClass.logout()
	activityProgressClass.logout()
	workbenchClass.logout()
	sandboxClass.logout()
	garageClass.logout()
	serialMessageManagerClass.logout()
	await serialConnectionManagerClass.logout()
}

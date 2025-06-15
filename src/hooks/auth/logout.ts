"use client"

import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import pipClass from "../../classes/pip-class"
import authClass from "../../classes/auth-class"
import socketClass from "../../classes/socket-class"
import garageClass from "../../classes/garage-class"
import sandboxClass from "../../classes/sandbox-class"
import workbenchClass from "../../classes/workbench-class"
import labReadingClass from "../../classes/lab-reading-class"
import personalInfoClass from "../../classes/personal-info-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import pageTransitionClass from "../../classes/page-transition-class"
import activityProgressClass from "../../classes/activity-progress-class"
import serialMessageManagerClass from "../../classes/serial-message-manager-class"

export default function useLogout(): () => Promise<void> {
	const navigate = useTypedNavigate()

	return useCallback(async (): Promise<void> => {
		personalInfoClass.logout()
		pipClass.logout()
		socketClass.logout()
		authClass.logout()
		blueDotApiClientClass.logout()
		labReadingClass.logout()
		pageTransitionClass.logout()
		activityProgressClass.logout()
		workbenchClass.logout()
		sandboxClass.logout()
		garageClass.logout()
		await serialMessageManagerClass.logout()
		navigate("/")
	}, [navigate])
}

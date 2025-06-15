"use client"

import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { usePipContext } from "../../classes/pip-context"
import authClass from "../../classes/auth-class"
import { useSocketContext } from "../../classes/socket-context"
import garageClass from "../../classes/garage-class"
import { useSandboxContext } from "../../classes/sandbox-context"
import { useWorkbenchContext } from "../../classes/workbench-context"
import labReadingClass from "../../classes/lab-reading-class"
import personalInfoClass from "../../classes/personal-info-class"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"
import pageTransitionClass from "../../classes/page-transition-class"
import activityProgressClass from "../../classes/activity-progress-class"
import { useSerialMessageManagerContext } from "../../classes/serial-message-manager"

export default function useLogout(): () => Promise<void> {
	const pipClass = usePipContext()
	const socketClass = useSocketContext()
	const navigate = useTypedNavigate()
	const workbenchClass = useWorkbenchContext()
	const sandboxClass = useSandboxContext()
	const serialMessageManagerClass = useSerialMessageManagerContext()

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
	}, [personalInfoClass, pipClass, pageTransitionClass, sandboxClass, garageClass, socketClass,
		labReadingClass, workbenchClass, serialMessageManagerClass, navigate])
}

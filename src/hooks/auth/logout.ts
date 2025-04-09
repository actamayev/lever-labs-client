"use client"

import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { usePipContext } from "../../contexts/pip-context"
import { useAuthContext } from "../../contexts/auth-context"
import { useSocketContext } from "../../contexts/socket-context"
import { useAddPipContext } from "../../contexts/add-pip-context"
import { useSandboxContext } from "../../contexts/sandbox-context"
import { useWorkbenchContext } from "../../contexts/workbench-context"
import { useLabReadingContext } from "../../contexts/lab-reading-context"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"
import { usePageTransitionContext } from "../../contexts/page-transition-context"
import { useActivityProgressContext } from "../../contexts/activity-progress-context"
import { useGarageContext } from "../../contexts/garage-context"

export default function useLogout(): () => void {
	const authClass = useAuthContext()
	const blueDotApiClient = useApiClientContext()
	const personalInfoClass = usePersonalInfoContext()
	const pipClass = usePipContext()
	const addPipClass = useAddPipContext()
	const socketClass = useSocketContext()
	const labReadingClass = useLabReadingContext()
	const navigate = useTypedNavigate()
	const pageTransitionClass = usePageTransitionContext()
	const activityProgressClass = useActivityProgressContext()
	const workbenchClass = useWorkbenchContext()
	const sandboxClass = useSandboxContext()
	const garageClass = useGarageContext()

	return useCallback((): void => {
		personalInfoClass.logout()
		pipClass.logout()
		addPipClass?.store.logout()
		addPipClass?.form.reset()
		socketClass.logout()
		authClass.logout()
		blueDotApiClient.logout()
		labReadingClass.logout()
		pageTransitionClass.logout()
		activityProgressClass.logout()
		workbenchClass.logout()
		sandboxClass.logout()
		garageClass.logout()
		navigate("/")
	}, [personalInfoClass, pipClass, addPipClass?.store, addPipClass?.form, pageTransitionClass, sandboxClass, garageClass,
		socketClass, authClass, blueDotApiClient, labReadingClass, activityProgressClass, workbenchClass, navigate])
}

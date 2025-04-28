"use client"

import isNull from "lodash-es/isNull"
import { useCallback } from "react"
import useTypedNavigate from "../navigate/typed-navigate"
import { useAddPipContext } from "../../contexts/add-pip-context"
import { PageToNavigateAfterLogin } from "../../utils/constants"

export default function useExitAfterAddPip(): () => void {
	const addPipClass = useAddPipContext()
	const navigate = useTypedNavigate()

	return useCallback(() => {
		if (isNull(addPipClass)) return
		addPipClass.store.resetAddPipMethods()
		addPipClass.form.reset()
		navigate(PageToNavigateAfterLogin)
	}, [addPipClass, navigate])
}

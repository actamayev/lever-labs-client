import { useMemo } from "react"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useDefaultSidebarState (): SidebarStates {
	const personalInfoClass = usePersonalInfoContext()

	return useMemo(() => {
		return personalInfoClass.defaultSidebarState
	}, [personalInfoClass.defaultSidebarState])
}

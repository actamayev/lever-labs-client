import { useMemo } from "react"
import { usePersonalInfoContext } from "../../contexts/personal-info-context"

export default function useUsername (): string | null {
	const personalInfoClass = usePersonalInfoContext()

	return useMemo(() => {
		return personalInfoClass.username
	}, [personalInfoClass.username])
}

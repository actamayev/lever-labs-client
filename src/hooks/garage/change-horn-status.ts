import { useCallback } from "react"
import { useSocketContext } from "../../contexts/socket-context"
import { useGarageContext } from "../../contexts/garage-context"
import { usePipContext } from "../../contexts/pip-context"
import { useApiClientContext } from "../../contexts/blue-dot-api-client-context"

export default function useChangeHornStatus(): () => void {
	const socketClass = useSocketContext()
	const garageClass = useGarageContext()
	const pipClass = usePipContext()
	const blueDotApiClient = useApiClientContext()

	return useCallback(() => {
		if ()
	}, [])
}

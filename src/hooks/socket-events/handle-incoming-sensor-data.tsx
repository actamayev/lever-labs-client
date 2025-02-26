import { useCallback } from "react"
import useToastOptions from "../../components/toast-options"

export default function useHandleIncomingSensorData(): (data: IncomingSensorData) => void {
	const toast = useToastOptions()

	return useCallback((data: IncomingSensorData) =>  {
		console.log(data.sensorPayload)
		// if (data.success) return

		// return toast.negative({
		// 	title: "Unable to control motor",
		// 	description: data.error
		// })
	}, [toast])
}

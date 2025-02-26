import { useCallback } from "react"

export default function useHandleIncomingSensorData(): (data: IncomingSensorData) => void {
	return useCallback((data: IncomingSensorData) =>  {
		console.log(data.sensorPayload)
		// if (data.success) return

		// return toast.negative({
		// 	title: "Unable to control motor",
		// 	description: data.error
		// })
	}, [])
}

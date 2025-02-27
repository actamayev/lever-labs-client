import { useCallback } from "react"
import { useLabDemoContext } from "../../contexts/lab-demo-context"

export default function useHandleIncomingSensorData(): (data: IncomingSensorData) => void {
	const labDemoClass = useLabDemoContext()

	return useCallback((data: IncomingSensorData) =>  {
		console.log(data.sensorPayload)
		labDemoClass.setSensorData(data)
		// if (data.success) return

		// return toast.negative({
		// 	title: "Unable to control motor",
		// 	description: data.error
		// })
	}, [labDemoClass])
}

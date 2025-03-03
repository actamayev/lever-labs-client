import { useCallback } from "react"
import useToastOptions from "../../components/toast-options"

export default function useHandleMotorControlAck(): (data: MotorControlAck) => void {
	const toast = useToastOptions()

	return useCallback((data: MotorControlAck) =>  {
		if (data.success) return

		return toast.negative({
			title: "Unable to control motor",
			description: data.error
		})
	}, [toast])
}

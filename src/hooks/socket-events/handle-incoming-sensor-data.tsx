"use client"

import { useCallback } from "react"
import { useGarageContext } from "../../contexts/garage-context"
import { IncomingSensorData } from "@bluedotrobots/common-ts"

export default function useHandleIncomingSensorData(): (data: IncomingSensorData) => void {
	const garageClass = useGarageContext()

	return useCallback((data: IncomingSensorData) =>  {
		garageClass.setSensorData(data)
		// if (data.success) return

		// return toast.negative({
		// 	title: "Unable to control motor",
		// 	description: data.error
		// })
	}, [garageClass])
}

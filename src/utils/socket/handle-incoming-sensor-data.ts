"use client"

import garageClass from "../../classes/garage-class"
import { IncomingSensorData } from "@bluedotrobots/common-ts"

export default function handleIncomingSensorData(data: IncomingSensorData) : void {
	garageClass.setSensorData(data)
}

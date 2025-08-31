import { SocketEventPayloadMap, SocketEvents } from "@bluedotrobots/common-ts"
import sandboxClass from "../../classes/sandbox-class"
import studentClass from "../../classes/student-class"
import workbenchClass from "../../classes/workbench-class"
import sensorDataClass from "../../classes/sensor-data-class"
import careerQuestClass from "../../classes/career-quest-class"
import handlePipStatusUpdate from "../socket/handle-pip-status-update"

type ListenerHandler<E> = (payload: E) => void

export const listenersMap: {
	[K in SocketEvents]: ListenerHandler<SocketEventPayloadMap[K]>
} = {
	"challenge-chatbot-stream-start": careerQuestClass.startChallengeStreaming,
	"challenge-chatbot-stream-chunk": careerQuestClass.addChallengeStreamingChunk,
	"challenge-chatbot-stream-complete": careerQuestClass.completeChallengeStreaming,
	"career-chatbot-stream-start": careerQuestClass.startCareerStreaming,
	"career-chatbot-stream-chunk": careerQuestClass.addCareerStreamingChunk,
	"career-chatbot-stream-complete": careerQuestClass.completeCareerStreaming,
	"sandbox-chatbot-stream-start": sandboxClass.startStreaming,
	"sandbox-chatbot-stream-chunk": sandboxClass.addStreamingChunk,
	"sandbox-chatbot-stream-complete": sandboxClass.completeStreaming,
	"pip-connection-status-update": handlePipStatusUpdate,
	"battery-monitor-data": workbenchClass.setBatteryData,
	"general-sensor-data": (payload) => {
		Object.entries(payload).forEach(([key, value]) => {
			if (key !== "irSensorData" && typeof value === "number" && key !== "distanceGrid") {
				sensorDataClass.addGeneralSensorData(
					key as keyof Omit<typeof payload.sensorPayload, "irSensorData" | "distanceGrid">,
					value
				)
			}
		})
		// Handle IR sensor data separately if it exists
		if (payload.sensorPayload.irSensorData) {
			sensorDataClass.addIrSensorData(payload.sensorPayload.irSensorData)
		}
		if (payload.sensorPayload.distanceGrid) {
			sensorDataClass.addMultizoneTofData(payload.sensorPayload.distanceGrid)
		}
	},
	"student-invite-join-class": studentClass.addPendingInvite,
} as const

import { SocketEventPayloadMap, SocketEvents } from "@bluedotrobots/common-ts/types/socket"
import getSandboxClass from "../../classes/sandbox-class"
import studentClass from "../../classes/student-class"
import workbenchClass from "../../classes/workbench-class"
import sensorDataClass from "../../classes/sensor-data-class"
import handlePipStatusUpdate from "../socket/handle-pip-status-update"
import gamesClass from "../../classes/games-class"
import teacherClass from "../../classes/teacher-class"
import getChatManagerClass from "../../classes/chat-manager-class"

type ListenerHandler<E> = (payload: E) => void

// Note: Class methods are wrapped in arrow functions to preserve 'this' context when called as callbacks
export const listenersMap: {
	[K in SocketEvents]: ListenerHandler<SocketEventPayloadMap[K]>
} = {
	"challenge-chatbot-stream-start": (payload): void => getChatManagerClass().startChallengeStreaming(payload),
	"challenge-chatbot-stream-chunk": (payload): void => getChatManagerClass().addChallengeStreamingChunk(payload),
	"challenge-chatbot-stream-complete": (payload): void => getChatManagerClass().completeChallengeStreaming(payload),
	"career-chatbot-stream-start": (payload): void => getChatManagerClass().startCareerStreaming(payload),
	"career-chatbot-stream-chunk": (payload): void => getChatManagerClass().addCareerStreamingChunk(payload),
	"career-chatbot-stream-complete": (payload): void => getChatManagerClass().completeCareerStreaming(payload),
	"sandbox-chatbot-stream-start": (payload): void => getSandboxClass().startStreaming(payload),
	"sandbox-chatbot-stream-chunk": (payload): void => getSandboxClass().addStreamingChunk(payload),
	"sandbox-chatbot-stream-complete": (payload): void => getSandboxClass().completeStreaming(payload),
	"pip-connection-status-update": handlePipStatusUpdate,
	"battery-monitor-data": (payload): void => workbenchClass.setBatteryData(payload),
	"general-sensor-data": (payload): void => sensorDataClass.addSensorData(payload),
	"general-sensor-data-mz": (payload): void => sensorDataClass.addMultizoneTofData(payload),
	"dino-score-update": (payload): void => gamesClass.addDinoScore(payload.score),
	"student-joined-classroom": (payload): void => teacherClass.addStudentToClassroom(payload),
	"new-hub": (payload): void => studentClass.addNewHub(payload),
	"updated-hub-slide-id": (payload): void => studentClass.updateHubSlideId(payload),
	"deleted-hub": (payload): void => studentClass.deleteHub(payload),
	"student-joined-hub": (payload): void => teacherClass.addStudentToHub(payload),
	"student-left-hub": (payload): void => teacherClass.removeStudentFromHub(payload),
	"dino-score-update-all-peers": (payload): void => gamesClass.addDinoScore(payload.score, payload.username)
} as const

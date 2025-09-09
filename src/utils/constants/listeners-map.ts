import { SocketEventPayloadMap, SocketEvents } from "@bluedotrobots/common-ts/types/socket"
import getSandboxClass from "../../classes/sandbox-class"
import getStudentClass from "../../classes/student-class"
import getWorkbenchClass from "../../classes/workbench-class"
import getSensorDataClass from "../../classes/sensor-data-class"
import handlePipStatusUpdate from "../socket/handle-pip-status-update"
import getGamesClass from "../../classes/games-class"
import getTeacherClass from "../../classes/teacher-class"
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
	"battery-monitor-data": (payload): void => getWorkbenchClass().setBatteryData(payload),
	"general-sensor-data": (payload): void => getSensorDataClass().addSensorData(payload),
	"general-sensor-data-mz": (payload): void => getSensorDataClass().addMultizoneTofData(payload),
	"dino-score-update": (payload): void => getGamesClass().addDinoScore(payload.score),
	"student-joined-classroom": (payload): void => getTeacherClass().addStudentToClassroom(payload),
	"new-hub": (payload): void => getStudentClass().addNewHub(payload),
	"updated-hub-slide-id": (payload): void => getStudentClass().updateHubSlideId(payload),
	"deleted-hub": (payload): void => getStudentClass().deleteHub(payload),
	"student-joined-hub": (payload): void => getTeacherClass().addStudentToHub(payload),
	"student-left-hub": (payload): void => getTeacherClass().removeStudentFromHub(payload),
	"dino-score-update-all-peers": (payload): void => getGamesClass().addDinoScore(payload.score, payload.username)
} as const

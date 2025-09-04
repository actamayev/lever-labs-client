import { SocketEventPayloadMap, SocketEvents } from "@bluedotrobots/common-ts"
import sandboxClass from "../../classes/sandbox-class"
import studentClass from "../../classes/student-class"
import workbenchClass from "../../classes/workbench-class"
import sensorDataClass from "../../classes/sensor-data-class"
import careerQuestClass from "../../classes/career-quest-class"
import handlePipStatusUpdate from "../socket/handle-pip-status-update"
import gamesClass from "../../classes/games-class"
import teacherClass from "../../classes/teacher-class"

type ListenerHandler<E> = (payload: E) => void

// Note: Class methods are wrapped in arrow functions to preserve 'this' context when called as callbacks
export const listenersMap: {
	[K in SocketEvents]: ListenerHandler<SocketEventPayloadMap[K]>
} = {
	"challenge-chatbot-stream-start": (payload): void => careerQuestClass.startChallengeStreaming(payload),
	"challenge-chatbot-stream-chunk": (payload): void => careerQuestClass.addChallengeStreamingChunk(payload),
	"challenge-chatbot-stream-complete": (payload): void => careerQuestClass.completeChallengeStreaming(payload),
	"career-chatbot-stream-start": (payload): void => careerQuestClass.startCareerStreaming(payload),
	"career-chatbot-stream-chunk": (payload): void => careerQuestClass.addCareerStreamingChunk(payload),
	"career-chatbot-stream-complete": (payload): void => careerQuestClass.completeCareerStreaming(payload),
	"sandbox-chatbot-stream-start": (payload): void => sandboxClass.startStreaming(payload),
	"sandbox-chatbot-stream-chunk": (payload): void => sandboxClass.addStreamingChunk(payload),
	"sandbox-chatbot-stream-complete": (payload): void => sandboxClass.completeStreaming(payload),
	"pip-connection-status-update": handlePipStatusUpdate,
	"battery-monitor-data": (payload): void => workbenchClass.setBatteryData(payload),
	"general-sensor-data": (payload): void => sensorDataClass.addSensorData(payload),
	"general-sensor-data-mz": (payload): void => sensorDataClass.addMultizoneTofData(payload),
	"student-invite-join-class": (payload): void => studentClass.addPendingInvite(payload),
	"dino-score-update": (payload): void => gamesClass.addDinoScore(payload),
	"student-joined-classroom": (payload): void => teacherClass.addStudentToClassroom(payload),
	"new-hub": (payload): void => studentClass.addNewHub(payload),
	"updated-hub-slide-id": (payload): void => studentClass.updateHubSlideId(payload),
	"deleted-hub": (payload): void => studentClass.deleteHub(payload),
	"student-joined-hub": (payload): void => teacherClass.addStudentToHub(payload),
	"student-left-hub": (payload): void => teacherClass.removeStudentFromHub(payload)
} as const

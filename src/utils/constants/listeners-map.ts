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
	"general-sensor-data": sensorDataClass.addSensorData,
	"general-sensor-data-mz": sensorDataClass.addMultizoneTofData,
	"student-invite-join-class": studentClass.addPendingInvite,
	"dino-score-update": gamesClass.addDinoScore,
	"student-joined-classroom": teacherClass.addStudentToClassroom,
	"new-hub": studentClass.addNewHub,
	"updated-hub-slide-id": studentClass.updateHubSlideId,
	"deleted-hub": studentClass.deleteHub,
	"student-joined-hub": teacherClass.addStudentToHub,
	"student-left-hub": teacherClass.removeStudentFromHub
} as const

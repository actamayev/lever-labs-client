"use client"

import { SocketEventPayloadMap, SocketEvents } from "@bluedotrobots/common-ts/types/socket"
import sandboxClass from "../../classes/sandbox-class"
import studentClass from "../../classes/student-class"
import workbenchClass from "../../classes/workbench-class"
import sensorDataClass from "../../classes/sensor-data-class"
import handlePipStatusUpdate from "../socket/handle-pip-status-update"
import gamesClass from "../../classes/games-class"
import teacherClass from "../../classes/teacher-class"
import chatManagerClass from "../../classes/chat-manager-class"
import garageClass from "../../classes/garage-class"

type ListenerHandler<E> = (payload: E) => void

// Note: Class methods are wrapped in arrow functions to preserve 'this' context when called as callbacks
export const listenersMap: {
	[K in SocketEvents]: ListenerHandler<SocketEventPayloadMap[K]>
} = {
	"challenge-chatbot-stream-start": (payload): void => chatManagerClass.startChallengeStreaming(payload),
	"challenge-chatbot-stream-chunk": (payload): void => chatManagerClass.addChallengeStreamingChunk(payload),
	"challenge-chatbot-stream-complete": (payload): void => chatManagerClass.completeChallengeStreaming(payload),
	"career-chatbot-stream-start": (payload): void => chatManagerClass.startCareerStreaming(payload),
	"career-chatbot-stream-chunk": (payload): void => chatManagerClass.addCareerStreamingChunk(payload),
	"career-chatbot-stream-complete": (payload): void => chatManagerClass.completeCareerStreaming(payload),
	"sandbox-chatbot-stream-start": (payload): void => sandboxClass.startStreaming(payload),
	"sandbox-chatbot-stream-chunk": (payload): void => sandboxClass.addStreamingChunk(payload),
	"sandbox-chatbot-stream-complete": (payload): void => sandboxClass.completeStreaming(payload),
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
	"dino-score-update-all-peers": (payload): void => gamesClass.addDinoScore(payload.score, payload.username),
	"garage-driving-status-update": (payload): void => garageClass.setGarageDrivingStatus(payload.garageDrivingStatus),
	"garage-sounds-status-update": (payload): void => garageClass.setGarageSoundsStatus(payload.garageSoundsStatus),
	"garage-lights-status-update": (payload): void => garageClass.setGarageLightsStatus(payload.garageLightsStatus),
	"garage-display-status-update": (payload): void => garageClass.setGarageDisplayStatus(payload.garageDisplayStatus)
} as const

"use client"

/* eslint-disable @typescript-eslint/naming-convention */

import MEET_PIP from "./meet-pip-right-content"
import OBSTACLE_AVOIDANCE_CAREER from "./obstacle-avoidance-right-content"
import DRIVING_SCHOOL_CAREER from "./driving-school-right-content"

export const CAREER_DEFINITIONS = {
	[MEET_PIP.careerUUID]: MEET_PIP,
	[DRIVING_SCHOOL_CAREER.careerUUID]: DRIVING_SCHOOL_CAREER,
	[OBSTACLE_AVOIDANCE_CAREER.careerUUID]: OBSTACLE_AVOIDANCE_CAREER
}

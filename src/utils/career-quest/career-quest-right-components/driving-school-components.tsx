"use client"

import { ReactNode } from "react"
import ViewOnlySandbox from "../../../components/sandbox/view-only-sandbox/view-only-sandbox"
import ChallengeSection from "../../../components/career/lesson-layout/challenge-section"
import {
	DRIVING_SCHOOL_CHALLENGE_S2_P4, DRIVING_SCHOOL_CHALLENGE_S3_P5, DRIVING_SCHOOL_CHALLENGE_S4_P5, DRIVING_SCHOOL_CHALLENGE_S5_P4,
	DRIVING_SCHOOL_VIEW_ONLY_S2_P1, DRIVING_SCHOOL_VIEW_ONLY_S2_P3, DRIVING_SCHOOL_VIEW_ONLY_S3_P2, DRIVING_SCHOOL_VIEW_ONLY_S3_P4,
	DRIVING_SCHOOL_VIEW_ONLY_S4_P3, DRIVING_SCHOOL_VIEW_ONLY_S4_P4, DRIVING_SCHOOL_VIEW_ONLY_S5_P2
} from "@bluedotrobots/common-ts/types/cq-challenge-data/driving-school-challenge-data"

// eslint-disable-next-line @typescript-eslint/naming-convention
const DRIVING_SCHOOL_COMPONENTS: Record<string, () => ReactNode> = {
	"driving-school-2-1-content": (): ReactNode => <ViewOnlySandbox blocklyJson={DRIVING_SCHOOL_VIEW_ONLY_S2_P1}/>,
	"driving-school-2-3-content": (): ReactNode => <ViewOnlySandbox blocklyJson={DRIVING_SCHOOL_VIEW_ONLY_S2_P3}/>,
	"driving-school-2-4-content": (): ReactNode => <ChallengeSection challengeData={DRIVING_SCHOOL_CHALLENGE_S2_P4}/>,
	"driving-school-3-2-content": (): ReactNode => <ViewOnlySandbox blocklyJson={DRIVING_SCHOOL_VIEW_ONLY_S3_P2}/>,
	"driving-school-3-4-content": (): ReactNode => <ViewOnlySandbox blocklyJson={DRIVING_SCHOOL_VIEW_ONLY_S3_P4}/>,
	"driving-school-3-5-content": (): ReactNode => <ChallengeSection challengeData={DRIVING_SCHOOL_CHALLENGE_S3_P5}/>,
	"driving-school-4-3-content": (): ReactNode => <ViewOnlySandbox blocklyJson={DRIVING_SCHOOL_VIEW_ONLY_S4_P3}/>,
	"driving-school-4-4-content": (): ReactNode => <ViewOnlySandbox blocklyJson={DRIVING_SCHOOL_VIEW_ONLY_S4_P4}/>,
	"driving-school-4-5-content": (): ReactNode => <ChallengeSection challengeData={DRIVING_SCHOOL_CHALLENGE_S4_P5}/>,
	"driving-school-5-2-content": (): ReactNode => <ViewOnlySandbox blocklyJson={DRIVING_SCHOOL_VIEW_ONLY_S5_P2}/>,
	"driving-school-5-4-content": (): ReactNode => <ChallengeSection challengeData={DRIVING_SCHOOL_CHALLENGE_S5_P4}/>,
}

export default DRIVING_SCHOOL_COMPONENTS

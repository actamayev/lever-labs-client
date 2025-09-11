"use client"

import { ReactNode } from "react"
import ViewOnlySandbox from "../../../components/sandbox/view-only-sandbox/view-only-sandbox"
import {
	DRIVING_SCHOOL_VIEW_ONLY_S2_P1, DRIVING_SCHOOL_VIEW_ONLY_S2_P3, DRIVING_SCHOOL_VIEW_ONLY_S3_P2, DRIVING_SCHOOL_VIEW_ONLY_S3_P4,
	DRIVING_SCHOOL_VIEW_ONLY_S4_P3, DRIVING_SCHOOL_VIEW_ONLY_S4_P4, DRIVING_SCHOOL_VIEW_ONLY_S5_P2
} from "@bluedotrobots/common-ts/types/cq-challenge-data/driving-school-challenge-data"

// eslint-disable-next-line @typescript-eslint/naming-convention
const DRIVING_SCHOOL_COMPONENTS: Record<string, () => ReactNode> = {
	"driving-school-2-1-content": (): ReactNode => <ViewOnlySandbox blocklyJson={DRIVING_SCHOOL_VIEW_ONLY_S2_P1}/>,
	"driving-school-2-3-content": (): ReactNode => <ViewOnlySandbox blocklyJson={DRIVING_SCHOOL_VIEW_ONLY_S2_P3}/>,
	"driving-school-3-2-content": (): ReactNode => <ViewOnlySandbox blocklyJson={DRIVING_SCHOOL_VIEW_ONLY_S3_P2}/>,
	"driving-school-3-4-content": (): ReactNode => <ViewOnlySandbox blocklyJson={DRIVING_SCHOOL_VIEW_ONLY_S3_P4}/>,
	"driving-school-4-3-content": (): ReactNode => <ViewOnlySandbox blocklyJson={DRIVING_SCHOOL_VIEW_ONLY_S4_P3}/>,
	"driving-school-4-4-content": (): ReactNode => <ViewOnlySandbox blocklyJson={DRIVING_SCHOOL_VIEW_ONLY_S4_P4}/>,
	"driving-school-5-2-content": (): ReactNode => <ViewOnlySandbox blocklyJson={DRIVING_SCHOOL_VIEW_ONLY_S5_P2}/>,
}

export default DRIVING_SCHOOL_COMPONENTS

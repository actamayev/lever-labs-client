"use client"

import retrievePipInfo from "../../utils/pip/retrieve-pip-info"
import retrievePersonalInfo from "../../utils/personal-info/retrieve-personal-info"

export default function retrieveDataAfterLogin (): void {
	try {
		void retrievePersonalInfo()
		void retrievePipInfo
	} catch (error: unknown) {
		console.error(error)
	}
}

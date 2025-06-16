"use client"

import retrievePipInfo from "../pip/retrieve-pip-info"
import retrievePersonalInfo from "../personal-info/retrieve-personal-info"

export default function retrieveDataAfterLogin(): void {
	try {
		void retrievePersonalInfo()
		void retrievePipInfo()
	} catch (error: unknown) {
		console.error(error)
	}
}

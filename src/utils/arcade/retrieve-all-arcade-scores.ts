"use client"

import isEqual from "lodash-es/isEqual"
import { isErrorResponse } from "../type-checks"
import authClass from "../../classes/auth-class"
import arcadeClass from "../../classes/arcade-class"
import leverLabsApiClient from "../../classes/lever-labs-api-client-class"

export default async function retrieveAllArcadeScores(): Promise<void> {
	try {
		if (
			authClass.isFinishedWithSignup === false ||
			arcadeClass.isRetrievingAllArcadeScores === true ||
			arcadeClass.hasRetrievedAllArcadeScores === true
		) return

		arcadeClass.setIsRetrievingAllArcadeScores(true)

		const arcadeScoresResponse = await leverLabsApiClient.arcadeDataService.retrieveAllArcadeScores()
		if (!isEqual(arcadeScoresResponse.status, 200) || isErrorResponse(arcadeScoresResponse.data)) {
			throw Error("Unable to retrieve arcade scores")
		}

		arcadeClass.setArcadeScores(arcadeScoresResponse.data.scores)
	} catch (error) {
		console.error(error)
		arcadeClass.setIsRetrievingAllArcadeScores(false)
	}
}

/**
 * Profanity filtering utility
 * Provides functions to check and filter profane content from text input
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
const PROFANITY_WORDS: string[] = [
	"fuck", "shit", "damn", "ass", "bitch", "bastard", "crap",
	"piss", "cock", "dick", "pussy", "whore", "slut", "fag", "nigger",
	"retard", "gay", "stupid", "idiot", "moron", "dumb"
]

/**
 * Checks if the new text contains profanity compared to the current text
 * @param newText - The new text to check
 * @param currentText - The current text for comparison
 * @returns true if the new text contains profanity, false otherwise
 */
const containsProfanity = (newText: string, currentText: string): boolean => {
	const lowerNewText = newText.toLowerCase()

	// If text is being shortened (backspace/delete), always allow it
	if (newText.length < currentText.length) {
		return false
	}

	// Check if the new text contains a complete profanity word
	return PROFANITY_WORDS.some((word: string): boolean => {
		return lowerNewText.includes(word)
	})
}

/**
 * Filters profanity from text input by preventing updates that contain profane words
 * @param newText - The new text to filter
 * @param currentText - The current text for comparison
 * @param updateFunction - Function to call if text is clean
 * @returns Promise that resolves when filtering is complete
 */
export const filterProfanity = async (
	newText: string,
	currentText: string,
	updateFunction: (text: string) => void | Promise<void>
): Promise<void> => {
	if (containsProfanity(newText, currentText)) {
		return // Don't update if profanity is detected
	}

	await updateFunction(newText)
}

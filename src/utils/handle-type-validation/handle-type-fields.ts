"use client"

export function handleTypeUsername(event: React.ChangeEvent<HTMLInputElement>) : string {
	try {
		const newValue = event.target.value
		// Regex to remove any  % / ? # [ ] @ ! $ & ' ( ) * + , ; = ^ characters
		// eslint-disable-next-line no-useless-escape
		return newValue.replace(/[\/\?%#@\[\]!$&'()*+,;=^]/g, "")
	} catch (error) {
		console.error(error)
		return ""
	}
}

export function handleTypeAge(event: React.ChangeEvent<HTMLInputElement>) : string {
	try {
		const newValue = event.target.value
		// Only allow numeric characters and limit to reasonable age range (1-3 digits)
		const numericOnly = newValue.replace(/[^0-9]/g, "")

		// Limit to 3 digits maximum (ages 1-999)
		const limitedLength = numericOnly.slice(0, 3)

		// Optional: Prevent leading zeros for multi-digit numbers
		if (limitedLength.length > 1 && limitedLength.startsWith("0")) {
			return limitedLength.slice(1)
		}

		return limitedLength
	} catch (error) {
		console.error(error)
		return ""
	}
}

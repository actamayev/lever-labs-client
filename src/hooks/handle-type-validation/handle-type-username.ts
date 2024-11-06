import { useCallback } from "react"

export default function useHandleTypeUsername(): (event: React.ChangeEvent<HTMLInputElement>) => string {
	return useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const newValue = event.target.value
			// Regex to remove any  % / ? # [ ] @ ! $ & ' ( ) * + , ; = ^ characters
			// eslint-disable-next-line no-useless-escape
			return newValue.replace(/[\/\?%#@\[\]!$&'()*+,;=^]/g, "")
		} catch (error) {
			console.error(error)
			return ""
		}
	}, [])
}

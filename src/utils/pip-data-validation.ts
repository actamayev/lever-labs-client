export default function validatePipData(pipData: PipData): boolean {
	const { pipName, pipUUID } = pipData

	const isNameValid = pipName.length >= 3 && pipName.length <= 20

	const isUUIDValid = /^[a-zA-Z0-9]{5}$/.test(pipUUID)

	return isNameValid && isUUIDValid
}

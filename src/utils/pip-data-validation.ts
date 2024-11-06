export default function validatePipData(pipData: IncompletePipData): boolean {
	const { pipName, pipUUID } = pipData

	const isNameValid = pipName.length >= 3 && pipName.length <= 20

	const isUUIDValid = /^[a-zA-Z0-9]{5}-\d+\.\d+\.\d+$/.test(pipUUID)

	return isNameValid && isUUIDValid
}

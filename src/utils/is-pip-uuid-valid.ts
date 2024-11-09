export default function isPipUUIDValid(pipUUID: PipUUID): boolean {
	const pipUUIDPattern = /^[a-zA-Z0-9]{5}$/
	return pipUUIDPattern.test(pipUUID)
}

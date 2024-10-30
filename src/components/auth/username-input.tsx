import FormGroup from "../form-group"
import useHandleTypeUsername from "../../hooks/handle-type-validation/handle-type-username"

interface Props {
	credentials: RegisterCredentials
	setCredentials: (newCredentials: RegisterCredentials) => void
}

export default function UsernameInput (props: Props) {
	const { credentials, setCredentials } = props
	const handleTypeUsername = useHandleTypeUsername()

	return (
		<FormGroup
			label="Username"
			type="text"
			placeholder="abc123"
			onChange={(event) => setCredentials({ ...credentials, username: handleTypeUsername(event) })}
			required
			value={credentials.username || ""}
			maxLength={100}
			className="mb-4"
		/>
	)
}

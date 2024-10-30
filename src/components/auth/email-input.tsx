import FormGroup from "../form-group"

interface Props {
	registerInformation: RegisterCredentials
	setRegisterInformation: React.Dispatch<React.SetStateAction<RegisterCredentials>>
}

export default function EmailInput (props: Props) {
	const { registerInformation, setRegisterInformation } = props

	return (
		<FormGroup
			label="Email"
			type="contact"
			placeholder="abc@123.com"
			onChange={(event) => setRegisterInformation({ ...registerInformation, email: event.target.value })}
			required
			value={registerInformation.email || ""}
			maxLength={100}
			className="mb-4"
		/>
	)
}

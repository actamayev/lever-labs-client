import FormGroup from "../form-group"

interface Props {
	loginInformation: LoginCredentials
	setLoginInformation: React.Dispatch<React.SetStateAction<LoginCredentials>>
}

export default function ContactInput (props: Props) {
	const { loginInformation, setLoginInformation } = props

	return (
		<FormGroup
			label="Username or Email"
			type="contact"
			placeholder="abc@123.com"
			onChange={(event) => setLoginInformation({ ...loginInformation, contact: event.target.value })}
			required
			value={loginInformation.contact || ""}
			maxLength={100}
			className="mb-4"
		/>
	)
}

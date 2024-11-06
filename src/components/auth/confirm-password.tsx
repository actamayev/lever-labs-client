import { useState } from "react"
import FormGroup from "../form-group"
import ShowOrHidePasswordButton from "./show-or-hide-password-button"

interface Props {
	credentials: RegisterCredentials
	setCredentials: (credentials: RegisterCredentials) => void
}

export default function ConfirmPassword (props: Props) {
	const { credentials, setCredentials } = props
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div className="relative">
			<FormGroup
				label="Password Confirmation"
				type = {showPassword ? "text" : "password"}
				placeholder="Confirm Password"
				onChange={(event) => setCredentials({ ...credentials, passwordConfirmation: event.target.value})}
				required
				value={credentials.passwordConfirmation || ""}
				maxLength={100}
				className="mb-4"
			/>
			<ShowOrHidePasswordButton
				showPassword={showPassword}
				setShowPassword={setShowPassword}
			/>
		</div>
	)
}

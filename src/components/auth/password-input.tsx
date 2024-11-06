import { useState } from "react"
import FormGroup from "../form-group"
import ShowOrHidePasswordButton from "./show-or-hide-password-button"

interface Props {
	credentials: LoginCredentials | RegisterCredentials
	setCredentials: (newCredentials: Partial<LoginCredentials | RegisterCredentials>) => void
}

export default function PasswordInput (props: Props) {
	const { credentials, setCredentials } = props
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div className="relative">
			<FormGroup
				label="Password"
				type={showPassword ? "text" : "password"}
				placeholder="Password"
				onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
				required
				value={credentials.password || ""}
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

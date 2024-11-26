import _ from "lodash"
import { useMemo, useState } from "react"
import FormGroup from "../../components/form-group"
import ErrorMessage from "../../components/error-message"
import { Button } from "../../components/shadcn/ui/button"
import PageHelmet from "../../components/helmet/page-helmet"
import AuthTemplate from "../../components/templates/auth-template"
import useUsernameSubmit from "../../hooks/auth/google/username-submit"
import useHandleTypeUsername from "../../hooks/handle-type-validation/handle-type-username"
import useRedirectUserWithUsername from "../../hooks/redirects/redirect-user-with-username"

export default function RegisterUsername() {
	useRedirectUserWithUsername()
	const [username, setUsername] = useState("")
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(false)
	const usernameSubmit = useUsernameSubmit(username, setError, setLoading)
	const handleTypeUsername = useHandleTypeUsername()

	const isDisabled = useMemo(() => {
		return username.length < 3
	}, [username.length])

	return (
		<>
			<PageHelmet pageTitle="/register-username" />
			<AuthTemplate title="Register Username">
				<form onSubmit={usernameSubmit} className="mb-3">
					<FormGroup
						label="Username"
						type="text"
						placeholder="abc123"
						onChange={(event) => setUsername(handleTypeUsername(event))}
						required
						value={username}
						maxLength={100}
						className="mb-4"
					/>

					<Button
						className="my-3 w-full font-semibold text-lg text-white dark:text-black"
						disabled={loading || isDisabled}
					>
						{_.isEmpty(username) ? "Register username" : `Register ${username}`}
					</Button>

					<ErrorMessage error={error} />
				</form>
			</AuthTemplate>
		</>
	)
}

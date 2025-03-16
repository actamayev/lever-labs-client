"use client"

import { observer } from "mobx-react"
import { useAuthContext } from "../contexts/auth-context"
import AddPipForm from "../components/add-pip-form/add-pip-form"
import ShowAuthToNullUser from "../components/auth/show-auth-to-null-user"

function AddPip() {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return <ShowAuthToNullUser whereToNavigate="/add-pip" />
	}

	return <AddPipForm />
}

export default observer(AddPip)

"use client"

import { observer } from "mobx-react"
import authClass from "@/classes/auth-class"
import ShowAuthToNullUser from "@/components/auth/show-auth-to-null-user"

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
	if (authClass.isLoggedIn === false) {
		return <ShowAuthToNullUser />
	}

	return (
		<div className="text-questionText">
			{children}
		</div>
	)
}

export default observer(AuthenticatedLayout)

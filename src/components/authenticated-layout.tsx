"use client"

import { observer } from "mobx-react"
import { useAuthContext } from "@/contexts/auth-context"
import ShowAuthToNullUser from "@/components/auth/show-auth-to-null-user"

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
	const authClass = useAuthContext()

	if (authClass.isLoggedIn === false) {
		return <ShowAuthToNullUser />
	}

	return (
		<div className="text-questionText text-3xl">
			{children}
		</div>
	)
}

export default observer(AuthenticatedLayout)

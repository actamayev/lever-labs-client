"use client"

import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { useAuthContext } from "@/contexts/auth-context"
import ShowAuthToNullUser from "@/components/auth/show-auth-to-null-user"

function LabLayout({ children }: { children: React.ReactNode }) { // Replace Outlet with children
	const authClass = useAuthContext()
	const pathname = usePathname()

	if (authClass.isLoggedIn === false) {
		return <ShowAuthToNullUser whereToNavigate={pathname as LabPages} />
	}

	return (
		<div className="text-questionText text-3xl">
			{children}
		</div>
	)
}

export default observer(LabLayout)

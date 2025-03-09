import { useState } from "react"
import { observer } from "mobx-react"
import { LogOut } from "lucide-react"
import { cn } from "../../../../../lib/shadcn/utils"
import { DropdownMenuItem } from "../../../ui/dropdown-menu"
import useHandleLogout from "../../../../../hooks/auth/handle-logout"

function LogoutButton() {
	const [logoutDisabled, setLogoutDisabled] = useState(false)
	const handleLogout = useHandleLogout(setLogoutDisabled)

	return (
		<DropdownMenuItem
			onClick={handleLogout}
			disabled={logoutDisabled}
			className={cn(
				"hover:cursor-pointer",
				logoutDisabled ? "cursor-not-allowed" : "cursor-pointer",
				"transition-none hover:!bg-sidebarButtonHover"
			)}
		>
			<LogOut className="mr-2 !h-[25px] !w-[25px] !min-w-[25px]" />
			<span className="text-base">Log out</span>
		</DropdownMenuItem>
	)
}

export default observer(LogoutButton)

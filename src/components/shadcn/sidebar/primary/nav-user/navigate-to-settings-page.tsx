"use client"

import { Settings } from "lucide-react"
import { DropdownMenuItem } from "../../../ui/dropdown-menu"
import useTypedNavigate from "../../../../../hooks/navigate/typed-navigate"

export default function NavigateToSettingsPage() {
	const navigate = useTypedNavigate()

	return (
		<DropdownMenuItem
			onSelect={() => navigate("/settings")}
			className="hover:cursor-pointer my-1.5"
		>
			<Settings className="mr-2 !h-[25px] !w-[25px] !min-w-[25px]" />
			<span className="text-base">Settings</span>
		</DropdownMenuItem>
	)
}

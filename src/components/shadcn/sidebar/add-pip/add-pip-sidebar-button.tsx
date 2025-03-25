"use client"

import { useEffect } from "react"
import { Bot } from "lucide-react"
import { observer } from "mobx-react"
import { usePathname } from "next/navigation"
import { SidebarMenu, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import { cn } from "../../../../lib/shadcn/utils"
import CustomSidebarButton from "../custom-sidebar-button"
import { usePipContext } from "../../../../contexts/pip-context"
import useTypedNavigate from "../../../../hooks/navigate/typed-navigate"

function AddPipSidebarButton() {
	const pathname = usePathname()
	const pipClass = usePipContext()
	const navigate = useTypedNavigate()

	useEffect(() => {
		pipClass.setSelectedPipToFirstPip()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pipClass.pipData.length])

	const isActive = pathname === "/add-pip"

	if (pipClass.selectedPip) return null

	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex justify-start">
				<CustomSidebarButton
					icon={(
						<div className="relative flex items-center justify-center w-full h-full">
							<Bot className="h-[35px] w-[35px] text-blue-600 dark:text-blue-300" />
						</div>
					)}
					text="ADD YOUR PIP"
					isActive={isActive}
					onClick={() => navigate("/add-pip")}
					customStyles={cn(
						isActive && "!border-selectedSidebarButtonBorder"
					)}
				/>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(AddPipSidebarButton)

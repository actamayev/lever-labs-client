"use client"

import { Bot } from "lucide-react"
import { observer } from "mobx-react"
import { SidebarMenu, SidebarMenuItem } from "@/components/shadcn/ui/sidebar"
import getPipClass from "../../../../classes/pip-class"
import CustomSidebarButton from "../custom-sidebar-button"
import useEffectSetSelectedPipFirstPip from "../../../../hooks/pip/use-effect-set-selected-pip-first-pip"

function AddPipSidebarButton(): React.ReactNode {
	useEffectSetSelectedPipFirstPip()

	if (getPipClass().selectedPip) return null

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
					goTo="/add-pip"
				/>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}

export default observer(AddPipSidebarButton)

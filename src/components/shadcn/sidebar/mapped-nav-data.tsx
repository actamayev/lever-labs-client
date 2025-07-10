"use client"

import { useCallback } from "react"
import { School } from "lucide-react"
import { observer } from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import toUpper from "lodash-es/toUpper"
import { usePathname } from "next/navigation"
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/shadcn/ui/sidebar"
import { cn } from "../../../lib/shadcn/utils"
import { CustomGarage } from "../../icons/custom-garage"
import CustomSidebarButton from "./custom-sidebar-button"
import studentClass from "../../../classes/student-class"
import { CustomSandbox } from "../../icons/custom-sandbox"
import { CustomBriefcase } from "../../icons/custom-briefcase"

const baseNavData: SidebarNavData[] = [
	{
		title: "Career Quest",
		url: "/career-quest",
		icon: CustomBriefcase,
		textColor: "text-careerQuestYellow"
	},
	{
		title: "Sandbox",
		url: "/sandbox",
		icon: CustomSandbox,
		textColor: "text-sandboxOrange"
	},
	{
		title: "Garage",
		url: "/garage",
		icon: CustomGarage,
		textColor: "text-humpback"
	},
]

const studentNavData: SidebarNavData = {
	title: "Student",
	url: "/student",
	icon: School,
	textColor: "text-beetle"
}

function MappedNavData() {
	const pathname = usePathname()

	const isActive = useCallback((itemUrl: PageNames) => {
		return pathname.startsWith(itemUrl)
	}, [pathname])

	// Conditionally include student page if user has classroom data
	const navData = isEmpty(studentClass.classroomData)
		? baseNavData
		: [...baseNavData, studentNavData]

	return (
		<SidebarGroup>
			<SidebarGroupContent className="px-1.5">
				<SidebarMenu>
					{navData.map((item) => {
						const active = isActive(item.url)
						// Create styled icon elements
						const iconElement = (
							<div className={cn(
								"w-full h-full flex items-center justify-center",
								item.textColor
							)}>
								<item.icon className="h-[35px] w-[35px]" />
							</div>
						)

						return (
							<SidebarMenuItem key={item.title} className="flex justify-center mb-1">
								<CustomSidebarButton
									icon={iconElement}
									text={toUpper(item.title)}
									isActive={active}
									goTo={item.url}
									customStyles={cn(
										active && "!border-selectedSidebarButtonBorder"
									)}
								/>
							</SidebarMenuItem>
						)
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}

export default observer(MappedNavData)

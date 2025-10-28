"use client"

import { Book, School } from "lucide-react"
import { observer } from "mobx-react"
import toUpper from "lodash-es/toUpper"
import { useCallback, useMemo } from "react"
import { usePathname } from "next/navigation"
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "../../lib/utils"
import { CustomGarage } from "../../icons/custom-garage"
import CustomSidebarButton from "./custom-sidebar-button"
import studentClass from "../../classes/student-class"
import { CustomSandbox } from "../../icons/custom-sandbox"
import teacherClass from "../../classes/teacher-class"

const baseNavData: SidebarNavData[] = [
	{
		title: "Learn",
		url: "/learn",
		icon: Book,
		textColor: "text-fox"
	},
	// {
	// 	title: "Career Quest",
	// 	url: "/career-quest",
	// 	icon: CustomBriefcase,
	// 	textColor: "text-career-quest-yellow"
	// },
	{
		title: "Sandbox",
		url: "/sandbox",
		icon: CustomSandbox,
		textColor: "text-sandbox-orange"
	},
	{
		title: "Garage",
		url: "/garage",
		icon: CustomGarage,
		textColor: "text-humpback"
	}
]

function MappedNavData(): React.ReactNode {
	const pathname = usePathname()

	const isActive = useCallback((itemUrl: PageNames): boolean => {
		return pathname.startsWith(itemUrl)
	}, [pathname])

	const hasActiveClasses = useMemo((): boolean => {
		return studentClass.classroomData.length > 0
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [studentClass.classroomData.length])

	// Check if user is approved teacher
	const isApprovedTeacher = teacherClass.teacherData?.isApproved === true

	const studentNavData: SidebarNavData = {
		title: "Whiteboard",
		url: "/whiteboard",
		icon: School,
		textColor: "text-beetle"
	}

	const teacherNavData: SidebarNavData = {
		title: "Class Manager",
		url: "/class-manager",
		icon: School,
		textColor: "text-fox"
	}

	// Build navData conditionally
	const navData = [...baseNavData]

	// Add student nav if user has active classes
	if (hasActiveClasses) {
		navData.push(studentNavData)
	}

	// Add teacher nav if user is approved teacher
	if (isApprovedTeacher) {
		navData.push(teacherNavData)
	}

	return (
		<SidebarGroup>
			<SidebarGroupContent className="px-1.5">
				<SidebarMenu>
					{navData.map((item): React.ReactNode => {
						const active = isActive(item.url)

						// Create styled icon elements
						const iconElement = (
							<div className={cn(
								"w-full h-full flex items-center justify-center relative",
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
										active && "border-selected-sidebar-button-border!"
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

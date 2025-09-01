"use client"

import { School } from "lucide-react"
import { observer } from "mobx-react"
import toUpper from "lodash-es/toUpper"
import { useCallback, useMemo } from "react"
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
import teacherClass from "../../../classes/teacher-class"

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

function MappedNavData(): React.ReactNode {
	const pathname = usePathname()

	const isActive = useCallback((itemUrl: PageNames) => {
		return pathname.startsWith(itemUrl)
	}, [pathname])

	const { hasActiveClasses, hasPendingInvites } = useMemo(() => {
		const activeClasses = studentClass.classroomData.filter(
			classroom => classroom.invitationStatus === "PENDING" || classroom.invitationStatus === "ACCEPTED"
		)
		const pendingInvites = studentClass.classroomData.some(
			classroom => classroom.invitationStatus === "PENDING"
		)

		return {
			hasActiveClasses: activeClasses.length > 0,
			hasPendingInvites: pendingInvites
		}
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
					{navData.map((item) => {
						const active = isActive(item.url)
						const isWhiteboardItem = item.url === "/whiteboard"

						// Create styled icon elements
						const iconElement = (
							<div className={cn(
								"w-full h-full flex items-center justify-center relative",
								item.textColor
							)}>
								<item.icon className="h-[35px] w-[35px]" />
								{/* Notification circle for pending invites */}
								{isWhiteboardItem && hasPendingInvites && (
									<div className="absolute -top-1 -right-1 w-3 h-3 bg-cardinal border-2 border-white rounded-full" />
								)}
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

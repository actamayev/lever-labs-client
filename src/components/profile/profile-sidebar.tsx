"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import { Card, CardDescription, CardTitle } from "../shadcn/ui/card"
import { BlackWhiteTactileButton } from "../buttons/tactile-buttons"
import useHandleLogout from "../../hooks/auth/handle-logout"

interface SidebarSectionProps {
  title: string
  children: React.ReactNode
}

const SidebarSection = ({ title, children }: SidebarSectionProps) => {
	return (
		<Card className="mb-8 pb-6">
			<CardTitle className="text-wolf text-xl mb-5 pt-6 pl-10">
				{title}
			</CardTitle>
			<CardDescription className="space-y-4 text-eel">
				{children}
			</CardDescription>
		</Card>
	)
}

interface SidebarLinkProps {
	href: string
	children: React.ReactNode
}

const SidebarLink = ({ href, children }: SidebarLinkProps) => {
	return (
		<Link
			href={href}
			className="block text-lg hover:bg-swan rounded-lg py-1 px-6 mx-4 font-semibold text-eel"
		>
			{children}
		</Link>
	)
}

export default function ProfileSidebar() {
	const logout = useHandleLogout()

	return (
		<div className="fixed right-0 top-0 w-[350px] mr-36 mt-6 rounded-lg h-full flex flex-col">
			<div >
				<SidebarSection title="Account">
					<SidebarLink href="/profile">Profile</SidebarLink>
				</SidebarSection>

				{/* <SidebarSection title="Support">
					<SidebarLink href="/help">Help Center</SidebarLink>
				</SidebarSection> */}

				<SidebarSection title="Blue Dot Robots">
					<SidebarLink href="/mission">Mission</SidebarLink>
					<SidebarLink href="/contact">Contact Us</SidebarLink>
				</SidebarSection>
			</div>

			<BlackWhiteTactileButton
				onClick={logout}
				className="w-full mt-4 py-3 flex justify-center items-center font-medium rounded-lg h-10 hover:!bg-swan"
			>
				<LogOut className="mr-2 h-4 w-4" />
				LOG OUT
			</BlackWhiteTactileButton>
		</div>
	)
}

"use client"

import Link from "next/link"
import { useCallback } from "react"
import { LogOut } from "lucide-react"
import logout from "../../utils/auth/logout"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import { BlackWhiteTactileButton } from "../buttons/tactile-buttons"
import { Card, CardDescription, CardTitle } from "../shadcn/ui/card"
import blueDotApiClientClass from "../../classes/blue-dot-api-client-class"

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
	const navigate = useTypedNavigate()

	const completeLogout = useCallback(async () => {
		await blueDotApiClientClass.authDataService.logout()
		await logout()
		navigate("/")
	}, [navigate])

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
				onClick={completeLogout}
				className="w-full py-3 flex justify-center items-center font-medium rounded-lg h-10 border-2"
			>
				<LogOut className="mr-2 h-4 w-4" />
				LOG OUT
			</BlackWhiteTactileButton>
		</div>
	)
}
